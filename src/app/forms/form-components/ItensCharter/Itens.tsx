import { MouseEvent, useState } from "react";
import ItemSelect from "./itemSelect";
import ItemTable from "./ItemTable";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ id: number; item: string; quantidade: number; }>> | undefined)[]> | undefined
}


const Itens = ({ control, errorMessage }: props) => {
    const [itensCharter, setItensCharter] = useState<ItemCharter[]>([])

    const syncControlerValueWithState = (value: ItemCharter[]) => {
        setItensCharter(value)
    }

    const addItemToTable = (itemCharter: string, updateControllerValue: Function) => {
        const tableItem: ItemCharter = JSON.parse(itemCharter)
        const checkRepeatedItem = itensCharter.find((item) => {
            return item.id == tableItem.id
        })
        if (checkRepeatedItem) {
            return
        }
        tableItem.quantidade = 1
        const newItensCharter = [...itensCharter, tableItem]
        updateControllerValue(newItensCharter)
        setItensCharter(newItensCharter)
    }

    const handleDeleteItem = (event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number, updateControllerValue: Function) => {
        event.preventDefault()
        const newItensCharter = itensCharter.filter((item) => item.id != id)
        updateControllerValue(newItensCharter)
        setItensCharter(newItensCharter)
    }

    const handleQuantityUpdate = (target: HTMLInputElement, updateControllerValue: Function) => {
        const itemId = parseInt(target.id)
        const value = parseInt(target.value)
        const newItensCharter = itensCharter.map((item) =>
            item.id === itemId ? { ...item, quantidade: value } : item
        )
        updateControllerValue(newItensCharter)
        setItensCharter(newItensCharter);

    }

    return (
        <Controller
            name="itensDisponiveis"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <div className="mb-5">
                        <ItemSelect
                            errorMessage={errorMessage?.message}
                            addItemToTable={(value: string) => addItemToTable(value, field.onChange)}
                        />
                    </div>
                    <ItemTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={errorMessage}
                        itensCharter={itensCharter}
                        handleDeleteItem={(event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => handleDeleteItem(event, id, field.onChange)}
                        handleQuantityUpdate={(target: EventTarget & HTMLInputElement) => handleQuantityUpdate(target, field.onChange)}
                    />

                </div>
            )}
        />
    );
}

export default Itens;