import InputElement from "@/components/InputElement";
import PopUp from "@/components/PopUp";
import TextArea from "../TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roteiroCharterSchema, RoteiroCharterSchema } from "@/util/roteiroCharterSchema";
import { FormEvent, useCallback } from "react";
import { RoteiroCharter } from "@/types/applicationTypes/charter/RoteiroCharter";

type props = {
    isOpenModal: boolean,
    setIsOpenModal: (value: boolean) => void,
    addRoteiroToTable: (roteiroCharter: RoteiroCharter) => boolean ,
}

const AddRoteiroModal = ({ setIsOpenModal, isOpenModal, addRoteiroToTable}: props) => {

    const { register, handleSubmit, control, resetField, formState: { errors } } = useForm<RoteiroCharterSchema>({
        resolver: zodResolver(roteiroCharterSchema)
    })

    const submit = (data: RoteiroCharter) => {
        const completed = addRoteiroToTable(data)
        if(completed){
            resetField("nome")
            resetField("descricao")
            resetField("preco")
            resetField("detalhesPagamento")
            setIsOpenModal(false)
        }
        
    }




    return (
        <PopUp title="Adicionar roteiro" buttons={[{ onClick: () => handleSubmit(submit)(), type: "bg-primary", text: "Adicionar" }, { onClick: () => setIsOpenModal(false), type: "bg-danger", text: "Cancelar" }]} isOpen={isOpenModal} setIsOpen={setIsOpenModal} >
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" w-full">
                    <InputElement register={register} registerName="nome" label="Nome do roteiro" placeholder="Nome" errorMessage={errors.nome?.message} />
                </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" w-full">
                    <TextArea register={register} registerName="descricao" label="Detalhes do roteiro" placeholder="Descrição" errorMessage={errors.descricao?.message} />
                </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="xl:w-1/2 w-full">
                    <InputElement register={register} registerName="preco" label="Preço" placeholder="0,00" errorMessage={errors.preco?.message} />
                </div>
                <div className="xl:w-1/2 w-full">
                    <InputElement register={register} registerName="detalhesPagamento" label="Detalhes pagamento" placeholder="ou 5x de R$2.000" errorMessage={errors.detalhesPagamento?.message} />
                </div>
            </div>
        </PopUp>
    );
}

export default AddRoteiroModal;