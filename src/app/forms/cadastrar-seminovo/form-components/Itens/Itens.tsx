import { useState } from "react";
import ItemSelect from "./itemSelect";
import ItemTable from "./ItemTable";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ id: number; item: string; quantidade: number; }>> | undefined)[]> | undefined
}


const Itens = ({ control, errorMessage }: props) => {
    const [itensSeminovo, setItensSeminovo] = useState<ItemSeminovo[]>([])

    const syncControlerValueWithState = (value: ItemSeminovo[]) =>{
        setItensSeminovo(value)
    }

    const addItemToTable = (itemSeminovo: string, updateControllerValue: Function) => {
        const tableItem: ItemSeminovo = JSON.parse(itemSeminovo)
        const checkRepeatedItem = itensSeminovo.find((item) => {
            return item.id == tableItem.id
        })
        if (checkRepeatedItem) {
            return
        }
        tableItem.quantidade = 1
        const newItensSeminovo = [...itensSeminovo, tableItem]
        updateControllerValue(newItensSeminovo)
        setItensSeminovo(newItensSeminovo)
    }

    const handleDeleteItem = (id: number, updateControllerValue: Function) => {
        const newItensSeminovo = itensSeminovo.filter((item) => item.id != id)
        updateControllerValue(newItensSeminovo)
        setItensSeminovo(newItensSeminovo)
    }

    const handleQuantityUpdate = (target: HTMLInputElement, updateControllerValue: Function) => {
        const itemId = parseInt(target.id)
        const value = parseInt(target.value)
        const newItensSeminovo = itensSeminovo.map((item) =>
            item.id === itemId ? { ...item, quantidade: value } : item
        )
        updateControllerValue(newItensSeminovo)
        setItensSeminovo(newItensSeminovo);

    }

    return (
        <Controller
            name="equipadoCom"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <ItemSelect
                        errorMessage={errorMessage?.message}
                        addItemToTable={(value: string) => addItemToTable(value, field.onChange)}
                    />
                    <ItemTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={errorMessage}
                        itensSeminovo={itensSeminovo}
                        handleDeleteItem={(id: number) => handleDeleteItem(id, field.onChange)}
                        handleQuantityUpdate={(target: EventTarget & HTMLInputElement) => handleQuantityUpdate(target, field.onChange)}
                    />

                </div>
            )}
        />
    );
}

export default Itens;