import InputElement from "@/components/InputElement";
import PopUp from "@/components/PopUp";
import TextArea from "../TextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { condicaoCharterSchema, CondicaoCharterSchema } from "@/util/condicaoCharterSchema";
import { Condicao } from "@/types/applicationTypes/charter/Condicoes";
import SelectMoeda from "../SelectMoeda";
import { MutableRefObject, useEffect } from "react";

type props = {
    isOpenModal: boolean,
    setIsOpenModal: (value: boolean) => void,
    addCondicaoToTable: (CondicaoCharter: Condicao) => boolean ,
     condicaoForEditRef: MutableRefObject<Condicao | null>,
    editItemOnTable: (CondicaoCharter: Condicao) => boolean
}

const AddCondicaoModal = ({ setIsOpenModal, isOpenModal, addCondicaoToTable, condicaoForEditRef, editItemOnTable}: props) => {

    const { register, handleSubmit, control, resetField, reset, formState: { errors } } = useForm<CondicaoCharterSchema>({
        resolver: zodResolver(condicaoCharterSchema),
    })

    useEffect(() => {
        if (isOpenModal && condicaoForEditRef.current) {
            reset({
                opcao: condicaoForEditRef.current.opcao
            });
        } else {
            reset({
                opcao: "",        
            });
        }
    }, [isOpenModal, reset, condicaoForEditRef]);


    const handleCancel = () => {
        condicaoForEditRef.current = null
        setIsOpenModal(false)
    }

    const submit = (data: Condicao) => {
        let completed
        if(condicaoForEditRef.current){
            const Condicao = {...data, id: condicaoForEditRef.current.id}
            completed = editItemOnTable(Condicao)
            //condicaoForEditRef.current = null
        }else{
            completed = addCondicaoToTable(data)
        }
         
        if(completed){
            resetField("opcao")
            setIsOpenModal(false)
        }
        
    }



    return (
        <PopUp title="Adicionar Condicao" buttons={[{ onClick: () => handleSubmit(submit)(), type: "bg-primary", text: condicaoForEditRef.current ? "Atualizar" : "Adicionar" }, { onClick: () => handleCancel(), type: "bg-danger", text: "Cancelar" }]} isOpen={isOpenModal} setIsOpen={setIsOpenModal} >
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className=" w-full">
                    <InputElement register={register} registerName="opcao" label="Nova regra ou condição" placeholder="Condição" errorMessage={errors.opcao?.message} />
                </div>
            </div>
        </PopUp>
    );
}

export default AddCondicaoModal;