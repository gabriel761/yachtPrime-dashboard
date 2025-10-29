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
import CheckBoxElement from "../form-components/CheckboxElement";
import { itemSeminovoSchema } from "@/util/itemSeminovoSchema";
import { ItemCharterForm } from "@/util/itemCharterSchema";


const CadastrarItemSeminovo = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [output, setOutput] = useState(null)
    const { openModal } = useModal()

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ItemCharterForm>({
        resolver: zodResolver(itemSeminovoSchema)
    })



    const submit = async (data: any) => {
        setIsLoading(true)
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.post(`${baseUrl}/resources/seminovo/item-seminovo`, data, token || "")

            openModal("Sucesso!", "Item de barco seminovo cadastrado com sucesso!", [{ type: "bg-primary", text: "Ok" }])
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
            <Breadcrumb pageName="Cadastrar item para barco seminovo" />

            <div className="grid grid-cols-1 gap-9 xxl:grid-cols-2">
                <form onSubmit={handleSubmit(submit)}>
                    <div className="flex flex-col gap-9">
                        {/* <!-- Contact Form --> */}

                        <FormCard title="Informações">
                            <div className="mb-4.5 flex flex-col gap-6">
                                <div className="  w-full ">
                                    <InputElement register={register} registerName="item" label="Item" placeholder="Nome do item" errorMessage={errors.item?.message} />
                                </div>
                            </div>


                            <div className=" w-[300px] mt-10 xl:justify-self-start justify-self-center">
                                {
                                    isLoading ? <Spinner size={40} /> : (
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                            Cadastrar Item
                                        </button>
                                    )
                                }

                            </div>
                            {/* <div className="mt-10 ">
                <pre>{JSON.stringify(output)}</pre>
              </div> */}
                        </FormCard>
                    </div>
                </form>
            </div>

        </DefaultLayout >
    );
};

export default CadastrarItemSeminovo;
