import SelectInput from "@/components/SelectGroup/SelectInput";
import SelectWithSearch from "@/components/SelectGroup/SelectWithSearch";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { useEffect, useState } from "react";




const ItemSelect = ({addItemToTable, errorMessage}: {addItemToTable:Function, errorMessage: string | undefined}) => {
    const [selectItems, setSelectItems] = useState<ItemSeminovo[] | null>(null)

    const getItensSeminovo = async () => {
        const itens = await httpClient.get(`${baseUrl}/resources/seminovo/item-seminovo`)
        setSelectItems(itens)
    }

    useEffect(() => {
        getItensSeminovo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   
    return (
        <SelectInput placeholder="Adicione um item" label="Itens" errorMessage={errorMessage} handleChange={addItemToTable}>
            {
                !selectItems ? null : selectItems.map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>{item.item}</option>
                ))
            }
        </SelectInput>
    );
}

export default ItemSelect;