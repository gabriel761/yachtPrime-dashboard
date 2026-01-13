import { MouseEvent, useRef, useState } from "react";
import ItemTable from "./CondicoesTable";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import AddCondicaoModal from "./AddCondicaoModal";
import { Condicao } from "@/types/applicationTypes/charter/Condicoes";
import { useModal } from "@/context/ModalContext";
import CondicoesTable from "./CondicoesTable";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined | {message: string}
}


const Condicoes = ({ control, errorMessage }: props) => {
    const [CondicoesCharter, setCondicoesCharter] = useState<Condicao[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const { openModal } = useModal()
    const condicaoForEditRef = useRef<Condicao | null>(null)

    const syncControlerValueWithState = (value: Condicao[]) => {
        setCondicoesCharter(value)
    }

    const addItemToTable = (CondicaoCharter: Condicao, updateControllerValue: Function) => {
        const tableCondicao = { ...CondicaoCharter, id: crypto.randomUUID() }
        const checkRepeatedItem = CondicoesCharter.find((Condicao) => {
            return Condicao.opcao == tableCondicao.opcao
        })
        if (checkRepeatedItem) {
            openModal("Erro", "Já existe um Condicao com este nome adicionado", [{ type: "bg-danger", text: "Ok" }])
            return false
        }
        const newCondicoes = [...CondicoesCharter, tableCondicao]
        updateControllerValue(newCondicoes)
        setCondicoesCharter(newCondicoes)
        return true
    }

    const editItemOnTable = (CondicaoCharter: Condicao, updateControllerValue: Function) => {
        const tableCondicao = CondicaoCharter
        const checkRepeatedItem = CondicoesCharter.find((Condicao) => {
            let repeatedName = Condicao.opcao == tableCondicao.opcao && Condicao.id != tableCondicao.id
            return repeatedName
        })
        if (checkRepeatedItem) {
            openModal("Erro", "Já existe um Condicao com este nome adicionado", [{ type: "bg-danger", text: "Ok" }])
            return false
        }
        const newItensSeminovo = CondicoesCharter.map((Condicao) => {
            if(Condicao.id == CondicaoCharter.id){
                Condicao = CondicaoCharter
            }
            return Condicao
        })
        updateControllerValue(newItensSeminovo)
        setCondicoesCharter(newItensSeminovo)
        return true
    }

    const handleEditButton = (event: MouseEvent<HTMLButtonElement, MouseEvent>, Condicao: Condicao, updateControllerValue: Function  ) => {
        event.preventDefault()
        condicaoForEditRef.current = Condicao
        setIsOpen(true)
    }

    const handleDeleteItem = (event: MouseEvent<HTMLButtonElement, MouseEvent>, id: string, updateControllerValue: Function) => {
        event.preventDefault()
        console.log(id)
        const newItensSeminovo = CondicoesCharter.filter((item) => item.id != id)
        updateControllerValue(newItensSeminovo)
        setCondicoesCharter(newItensSeminovo)
    }


    return (
        <Controller
            name="condicoes"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <button type="button" onClick={() => {condicaoForEditRef.current = null ,setIsOpen(true)}} className={`flex w-[200px] justify-center rounded  p-3 mb-5 font-medium text-gray hover:bg-opacity-90 bg-primary`}>Adicionar Condicao</button>
                    <AddCondicaoModal isOpenModal={isOpen} setIsOpenModal={setIsOpen} addCondicaoToTable={(value: Condicao) => addItemToTable(value, field.onChange)} condicaoForEditRef={condicaoForEditRef} editItemOnTable={(value: Condicao) => editItemOnTable(value, field.onChange)}/>
                    <CondicoesTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={typeof errorMessage != "string"? errorMessage : {}}
                        CondicoesCharter={CondicoesCharter}
                        handleDeleteCondicao={(event: MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => handleDeleteItem(event, id, field.onChange)}
                        handleEditButton={(event: MouseEvent<HTMLButtonElement, MouseEvent>, Condicao: Condicao) => handleEditButton(event, Condicao, field.onChange)}
                    />
                    <p className="text-danger">{errorMessage?.message}</p>
                </div>
            )}
        />
    );
}

export default Condicoes;