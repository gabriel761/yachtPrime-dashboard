'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import FormCard from "../../form-components/FormCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputElement from "@/components/InputElement";
import { ProprietarioForm, proprietarioSchema } from "@/util/proprietarioScema";
import { use, useEffect, useState } from "react";
import httpClient from "@/infra/httpClient";
import { Proprietario, ProprietarioForEdit } from "@/types/applicationTypes/Proprietario";
import baseUrl from "@/infra/back-end-connection";
import { useRouter } from "next/navigation";
import { CustomError } from "@/infra/CustomError";
import { useModal } from "@/context/ModalContext";
import Spinner from "@/components/common/Spinner";
import { auth } from "@/lib/firebase/firebaseConfig";
import Users from "../../form-components/UsersForProprietario/Users";
import { User } from "@/types/applicationTypes/User";


type Params = Promise<{ id: string }>

const EditarProprietario = (props: { params: Params }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { openModal } = useModal()
    const router = useRouter()

    const params = use(props.params)
    const idProprietario = params.id ? parseInt(params.id) : 0

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProprietarioForm>({
        resolver: zodResolver(proprietarioSchema)

    })

    const getProprietarioData = async () => {
        try {
            const proprietario: ProprietarioForEdit = await httpClient.get(`${baseUrl}/resources/proprietario-dashboard/${idProprietario}`)
           
            reset({
                nome: proprietario.nome,
                email: proprietario.email,
                telefone: proprietario.telefone,
                id: proprietario.id,
                usuarios: proprietario.usuarios

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


    const submit = async (data: any) => {
        setIsLoading(true)
        console.log(data)
        // try {
        //     const token = await auth.currentUser?.getIdToken()
        //     await httpClient.patch(`${baseUrl}/resources/proprietario/`, data, token || "")

        //     openModal("Sucesso!", "Proprietário atualizado com sucesso!", [{ type: "bg-primary", text: "Ok" }])
        //     router.replace("/list/listar-proprietario")
        // } catch (error: any) {
        //     let errorMessage
        //     if (error instanceof CustomError) {
        //         errorMessage = `Status ${error.statusCode}: ${error.message}`
        //     } else {
        //         errorMessage = error.message
        //     }
        //     openModal("Erro de servidor", error.message, [{ type: "bg-danger", text: "Ok" }])
        //     console.error(error)
        // }
        setIsLoading(false)
    }

    useEffect(() => {
        getProprietarioData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Editar proprietário" />

            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}
                        <FormCard title="Dados do proprietário">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="nome" label="Nome" placeholder="Nome" errorMessage={errors.nome?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="email" label="E-mal" placeholder="E-mail" errorMessage={errors.email?.message} />
                                </div>
                                <div className="xl:w-1/3 w-full">
                                    <InputElement register={register} registerName="telefone" label="Telefone" placeholder="Telefone" errorMessage={errors.telefone?.message} />
                                </div>
                            </div>

                        </FormCard>
                        <FormCard title="Usuários relacionados">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Users control={control} errorMessage={errors.email} />
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Atualizar Proprietário
                                        </button>
                                    )
                                }

                            </div>
                        </FormCard>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default EditarProprietario;