import { MouseEvent, useRef, useState } from "react";
import ItemTable from "./RoteirosTable";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import AddRoteiroModal from "./AddRoteiroModal";
import { RoteiroCharterForm } from "@/types/applicationTypes/charter/RoteiroCharter";
import { useModal } from "@/context/ModalContext";
import RoteirosTable from "./RoteirosTable";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined | {message: string}
}


const Roteiros = ({ control, errorMessage }: props) => {
    const [roteirosCharter, setRoteirosCharter] = useState<RoteiroCharterForm[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const { openModal } = useModal()
    const roteiroForEditRef = useRef<RoteiroCharterForm | null>(null)

    const syncControlerValueWithState = (value: RoteiroCharterForm[]) => {
        setRoteirosCharter(value)
    }

    const addItemToTable = (roteiroCharter: RoteiroCharterForm, updateControllerValue: Function) => {
        const tableRoteiro = { ...roteiroCharter, id: crypto.randomUUID() }
        const checkRepeatedItem = roteirosCharter.find((roteiro) => {
            return roteiro.nome == tableRoteiro.nome
        })
        if (checkRepeatedItem) {
            openModal("Erro", "Já existe um roteiro com este nome adicionado", [{ type: "bg-danger", text: "Ok" }])
            return false
        }
        const newItensSeminovo = [...roteirosCharter, tableRoteiro]
        updateControllerValue(newItensSeminovo)
        setRoteirosCharter(newItensSeminovo)
        return true
    }

    const editItemOnTable = (roteiroCharter: RoteiroCharterForm, updateControllerValue: Function) => {
        const tableRoteiro = roteiroCharter
        const checkRepeatedItem = roteirosCharter.find((roteiro) => {
            let repeatedName = roteiro.nome == tableRoteiro.nome && roteiro.id != tableRoteiro.id
            return repeatedName
        })
        if (checkRepeatedItem) {
            openModal("Erro", "Já existe um roteiro com este nome adicionado", [{ type: "bg-danger", text: "Ok" }])
            return false
        }
        const newItensSeminovo = roteirosCharter.map((roteiro) => {
            if(roteiro.id == roteiroCharter.id){
                roteiro = roteiroCharter
            }
            return roteiro
        })
        updateControllerValue(newItensSeminovo)
        setRoteirosCharter(newItensSeminovo)
        return true
    }

    const handleEditButton = (event: MouseEvent<HTMLButtonElement, MouseEvent>, roteiro: RoteiroCharterForm, updateControllerValue: Function  ) => {
        event.preventDefault()
        roteiroForEditRef.current = roteiro
        setIsOpen(true)
    }

    const handleDeleteItem = (event: MouseEvent<HTMLButtonElement, MouseEvent>, nome: string, updateControllerValue: Function) => {
        event.preventDefault()
        const newItensSeminovo = roteirosCharter.filter((item) => item.nome != nome)
        updateControllerValue(newItensSeminovo)
        setRoteirosCharter(newItensSeminovo)
    }


    return (
        <Controller
            name="roteiros"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <button type="button" onClick={() => {roteiroForEditRef.current = null ,setIsOpen(true)}} className={`flex w-[150px] justify-center rounded  p-3 mb-5 font-medium text-gray hover:bg-opacity-90 mt-8 bg-primary`}>Adicionar roteiro</button>
                    <AddRoteiroModal isOpenModal={isOpen} setIsOpenModal={setIsOpen} addRoteiroToTable={(value: RoteiroCharterForm) => addItemToTable(value, field.onChange)} roteiroForEditRef={roteiroForEditRef} editItemOnTable={(value: RoteiroCharterForm) => editItemOnTable(value, field.onChange)}/>
                    <RoteirosTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={typeof errorMessage != "string"? errorMessage : {}}
                        roteirosCharter={roteirosCharter}
                        handleDeleteRoteiro={(event: MouseEvent<HTMLButtonElement, MouseEvent>, nome: string) => handleDeleteItem(event, nome, field.onChange)}
                        handleEditButton={(event: MouseEvent<HTMLButtonElement, MouseEvent>, roteiro: RoteiroCharterForm) => handleEditButton(event, roteiro, field.onChange)}
                    />
                    <p className="text-danger">{errorMessage?.message}</p>
                </div>
            )}
        />
    );
}

export default Roteiros;