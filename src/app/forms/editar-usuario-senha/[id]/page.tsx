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
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UserFormUpdateSenha, userSchemaUpdateSenha } from "@/util/userSchemaUpdateSenha";
import { UserUpdatePasswordOnly } from "@/types/applicationTypes/User";


type Params = Promise<{ id: string }>
const CadastrarUsuario = (props: { params: Params }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { openModal } = useModal()
    const router = useRouter()

    const params = use(props.params)
    const idUser = params.id ? parseInt(params.id) : 0
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<UserFormUpdateSenha>({
        resolver: zodResolver(userSchemaUpdateSenha)
    })

    const submit = async (data: any) => {
        setIsLoading(true)
        try {
            const userOutput: UserUpdatePasswordOnly = {
                id:idUser,
                senha:data.senha
            }
            const token = await auth.currentUser?.getIdToken()
            await httpClient.put(`${baseUrl}/user/user-password`, userOutput, token || "")

            openModal("Sucesso!", "Senha de usuário alterada com sucesso!", [{ type: "bg-primary", text: "Ok" }])
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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Alterar senha de usuário" />
            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}

                        <FormCard title="Informações">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" xl:w-1/2 w-full ">
                                    <InputElement register={register} type="password" registerName="senha" label="Senha nova" placeholder="Senha nova" errorMessage={errors.senha?.message} />
                                </div>
                                <div className=" xl:w-1/2 w-full ">
                                    <InputElement register={register} type="password" registerName="confirmarSenha" label="Confirmar senha nova" placeholder="Confirmar senha nova" errorMessage={errors.confirmarSenha?.message} />
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Atualizar senha de Usuário
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

export default CadastrarUsuario;
