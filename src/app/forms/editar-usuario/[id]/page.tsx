'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormCard from "../../form-components/FormCard";
import InputElement from "@/components/InputElement";
import Spinner from "@/components/common/Spinner";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { CustomError } from "@/infra/CustomError";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/context/ModalContext";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectUserType from "../../form-components/SelectUserType";
import { User, UserWithProprietarios } from '@/types/applicationTypes/User'
import { UserFormUpdate, userSchemaUpdate } from "@/util/userSchemaUpdate";
import { useRouter } from "next/navigation";
import Proprietarios from "../../form-components/ProprietariosForUsers/Proprietarios";
import { onAuthStateChanged } from "firebase/auth";
import { get } from "http";


type Params = Promise<{ id: string }>
const CadastrarUsuario = (props: { params: Params }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [pageIsLoading, setPageIsLoading] = useState(false)
    const [token, setToken] = useState("")
    const { openModal } = useModal()
    const router = useRouter()

    const params = use(props.params)
    const idUser = params.id ? parseInt(params.id) : 0
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<UserFormUpdate>({
        resolver: zodResolver(userSchemaUpdate)
    })

    const getUsuarioData = async () => {
        try {
            const user: UserWithProprietarios = await httpClient.get(`${baseUrl}/user/user-dashboard/${idUser}`, token)
            console.log(user)
            reset({
                email: user.email,
                nome: user.nome,
                userType: user.userType,
                proprietarios: user.proprietarios
            })
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
    }

    const handleRedirectPassword = (e: any) => {
        e.preventDefault()
        router.replace(`/forms/editar-usuario-senha/${idUser}`)
    }

    const submit = async (data: any) => {
        setIsLoading(true)
        try {
            const userOutput: UserWithProprietarios = {
                id: idUser,
                nome: data.nome,
                email: data.email,
                userType: data.userType,
                proprietarios : data.proprietarios
            }
            const token = await auth.currentUser?.getIdToken()
            await httpClient.put(`${baseUrl}/user/user`, userOutput, token || "")

            openModal("Sucesso!", "Usuário atualizado com sucesso!", [{ type: "bg-primary", text: "Ok" }])
            router.replace("/list/listar-usuario")
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

    useEffect(() => {
        let unsub: any;
        const load = async () => {
            const authPromise = new Promise<void>((resolve) => {
                unsub = onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const token = await user.getIdToken()
                        setToken(token)
                    }
                    resolve()  // <-- só marca completo
                })
            })
            const seminovoPromise = getUsuarioData()
            await Promise.all([authPromise, seminovoPromise])
            setPageIsLoading(false)
        }
        load()
        return () => unsub && unsub()
    }, [])

    if (pageIsLoading) {
        return (
            <div className="w-full flex justify-center mt-20">
                <Spinner size={40} />
            </div>
        )
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Editar usuário" />
            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}

                        <FormCard title="Informações">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="nome" label="Nome" placeholder="Nome" errorMessage={errors.nome?.message} />
                                </div>
                                <div className=" xl:w-1/3 w-full ">
                                    <SelectUserType control={control} errorMessage={errors.userType?.message} />
                                </div>
                                <div className=" xl:w-1/3 w-full ">
                                    <InputElement register={register} registerName="email" label="E-mail" placeholder="E-mail" errorMessage={errors.email?.message} />
                                </div>

                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                    <button onClick={(e) => handleRedirectPassword(e)} className="flex w-full justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90">
                                        Alterar senha
                                    </button>
                                </div>
                            </div>
                            {/* <div className="mt-10 ">
                <pre>{JSON.stringify(output)}</pre>
              </div> */}
                        </FormCard>
                        <FormCard title="Proprietários relacionados">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Proprietarios control={control} errorMessage={errors.email} />
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Atualizar usário
                                        </button>
                                    )
                                }

                            </div>
                        </FormCard>
                    </div>
                </form>
            </div >

        </DefaultLayout >
    );
};

export default CadastrarUsuario;
