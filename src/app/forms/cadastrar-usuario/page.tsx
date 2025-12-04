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
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectUserType from "../form-components/SelectUserType";
import { UserForm, userSchema } from "@/util/userSchema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import verifyFirebaseErrorCode from "@/util/firebaseErrorCode";
import Proprietarios from "../form-components/ProprietariosForUsers/Proprietarios";

const CadastrarUsuario = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [output, setOutput] = useState(null)
    const { openModal } = useModal()

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<UserForm>({
        resolver: zodResolver(userSchema)
    })



    const submit = async (data: any) => {
        setIsLoading(true)
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.post(`${baseUrl}/user/user`, data, token || "")

            openModal("Sucesso!", "Usuário cadastrado com sucesso!", [{ type: "bg-primary", text: "Ok" }])
            reset()
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

                        <FormCard title="Informações">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" xl:w-1/3 w-full ">
                                    <SelectUserType control={control} errorMessage={errors.userType?.message} />
                                </div>
                                <div className=" xl:w-1/3 w-full ">
                                    <InputElement register={register} registerName="nome" label="Nome" placeholder="Nome" errorMessage={errors.nome?.message} />
                                </div>
                                <div className=" xl:w-1/3 w-full ">
                                    <InputElement register={register} registerName="email" label="E-mail" placeholder="E-mail" errorMessage={errors.email?.message} />
                                </div>
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" xl:w-1/2 w-full ">
                                    <InputElement register={register} registerName="senha" label="Senha" placeholder="Senha" errorMessage={errors.senha?.message} type="password" />
                                </div>
                                <div className=" xl:w-1/2 w-full ">
                                    <InputElement register={register} registerName="confirmarSenha" label="Confirmar senha" placeholder="Confirmar senha" errorMessage={errors.confirmarSenha?.message} type="password" />
                                </div>
                            </div>
                            {/* <div className="mt-10 ">
                <pre>{JSON.stringify(output)}</pre>
              </div> */}
                        </FormCard>
                        <FormCard title="Usuários relacionados">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className=" w-full">
                                    <Proprietarios control={control} errorMessage={errors.email} />
                                </div>
                            </div>
                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Cadastar usuário
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
