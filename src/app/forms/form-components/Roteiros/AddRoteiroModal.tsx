import InputElement from "@/components/InputElement";
import PopUp from "@/components/PopUp";
import TextArea from "../TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roteiroCharterSchema, RoteiroCharterSchema } from "@/util/roteiroCharterSchema";
import { RoteiroCharterForm } from "@/types/applicationTypes/charter/RoteiroCharter";
import SelectMoeda from "../SelectMoeda";
import { MutableRefObject, useEffect } from "react";

type props = {
    isOpenModal: boolean,
    setIsOpenModal: (value: boolean) => void,
    addRoteiroToTable: (roteiroCharter: RoteiroCharterForm) => boolean ,
     roteiroForEditRef: MutableRefObject<RoteiroCharterForm | null>,
    editItemOnTable: (roteiroCharter: RoteiroCharterForm) => boolean
}

const AddRoteiroModal = ({ setIsOpenModal, isOpenModal, addRoteiroToTable, roteiroForEditRef, editItemOnTable}: props) => {

    const { register, handleSubmit, control, resetField, reset, formState: { errors } } = useForm<RoteiroCharterSchema>({
        resolver: zodResolver(roteiroCharterSchema),
    })

    useEffect(() => {
        if (isOpenModal && roteiroForEditRef.current) {
            reset({
                nome: roteiroForEditRef.current.nome,
                descricao: roteiroForEditRef.current.descricao,
                moeda: roteiroForEditRef.current.moeda,
                preco: roteiroForEditRef.current.preco,
                detalhesPagamento: roteiroForEditRef.current.detalhesPagamento,
            });
        } else {
            reset({
                nome: "",
                descricao: "",
                moeda: "",
                preco: "",
                detalhesPagamento: "",
            });
        }
    }, [isOpenModal, reset, roteiroForEditRef]);


    const handleCancel = () => {
        roteiroForEditRef.current = null
        setIsOpenModal(false)
    }

    const submit = (data: RoteiroCharterForm) => {
        let completed
        if(roteiroForEditRef.current){
            const roteiro = {...data, id: roteiroForEditRef.current.id}
            completed = editItemOnTable(roteiro)
            //roteiroForEditRef.current = null
        }else{
            completed = addRoteiroToTable(data)
        }
         
        if(completed){
            resetField("nome")
            resetField("descricao")
            resetField("moeda")
            resetField("preco")
            resetField("detalhesPagamento")
            setIsOpenModal(false)
        }
        
    }



    return (
        <PopUp title="Adicionar roteiro" buttons={[{ onClick: () => handleSubmit(submit)(), type: "bg-primary", text: roteiroForEditRef.current ? "Atualizar" : "Adicionar" }, { onClick: () => handleCancel(), type: "bg-danger", text: "Cancelar" }]} isOpen={isOpenModal} setIsOpen={setIsOpenModal} >
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
                    <SelectMoeda control={control} name="moeda" errorMessage={errors.moeda?.message} />
                </div>
                <div className="xl:w-1/2 w-full">
                    <InputElement register={register} registerName="preco" label="Preço" placeholder="0,00" errorMessage={errors.preco?.message} />
                </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                    <InputElement register={register} registerName="detalhesPagamento" label="Detalhes pagamento" placeholder="ou 5x de R$2.000" errorMessage={errors.detalhesPagamento?.message} />
                </div>
            </div>
        </PopUp>
    );
}

export default AddRoteiroModal;