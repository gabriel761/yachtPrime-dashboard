'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormCard from "../form-components/FormCard";
import InputElement from "@/components/InputElement";
import Spinner from "@/components/common/Spinner";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { CustomError } from "@/infra/CustomError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectUserType from "../form-components/SelectUserType";
import { UserForm, userSchema } from "@/util/userSchema";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import verifyFirebaseErrorCode from "@/util/firebaseErrorCode";
import Proprietarios from "../form-components/ProprietariosForUsers/Proprietarios";
import Condicoes from "../form-components/Condicoes/Condicoes";
import { condicaoCharterUpdateSchema, CondicaoCharterUpdateSchema } from "@/util/condicaoCharterUpdateSchema";

const EditarCondicoesPadrao = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const [token, setToken] = useState('')
    const { openModal } = useModal()

    const { handleSubmit, control, reset, formState: { errors } } = useForm<CondicaoCharterUpdateSchema>({
        resolver: zodResolver(condicaoCharterUpdateSchema)
    })


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken()
                const result = await httpClient.get(`${baseUrl}/resources/charter/condicoes-padrao`, token)
                reset({
                    condicoes: result
                })
                setToken(token)

            }

            setPageIsLoading(false) // <-- sempre sai do loading
        })

        return () => unsub()
    }, [])

    const submit = async (data: any) => {
        setIsLoading(true)
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.patch(`${baseUrl}/resources/charter/condicoes-padrao`, data, token || "")
            const result = await httpClient.get(`${baseUrl}/resources/charter/condicoes-padrao`, token)
            reset({
                condicoes: result
            })
            openModal("Sucesso!", "Usuário cadastrado com sucesso!", [{ type: "bg-primary", text: "Ok" }])

        } catch (error: any) {
            let errorMessage
            if (error instanceof CustomError) {
                errorMessage = `Status ${error.statusCode}: ${error.message}`
            } else {
                errorMessage = error.message
            }
            openModal("Erro de servidor", error.message, [{ type: "bg-danger", text: "Ok" }])
            
            console.error(error)
        }
        setIsLoading(false)
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cadastrar novo usuário" />

            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}

                        <FormCard title="Editar lista de condições padrão">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Condicoes control={control}  errorMessage={errors.condicoes}/>
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Atualizar condições padrão
                                        </button>
                                    )
                                }

                            </div>
                        </FormCard>
                    </div>
                </form>
            </div>

        </DefaultLayout >
    );
};

export default EditarCondicoesPadrao;
