import SelectInput from "@/components/SelectGroup/SelectInput";
import SelectWithSearch from "@/components/SelectGroup/SelectWithSearch";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";




const ItemSelect = ({addItemToTable, errorMessage}: {addItemToTable:Function, errorMessage: string | undefined}) => {
    const [selectItems, setSelectItems] = useState<ItemSeminovo[] | null>(null)

    const getItensSeminovo = async () => {
        const token = await auth.currentUser?.getIdToken()
        const itens = await httpClient.get(`${baseUrl}/resources/charter/itens-charter`, token)
        setSelectItems(itens)
    }

    useEffect(() => {
            const unsubscribe = onIdTokenChanged(auth, async (user) => {
                if (user) {
                    await getItensSeminovo(); // Só chama o método quando o token é garantido
                } else {
                    console.warn("Usuário não autenticado.");
                }
            });
    
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
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