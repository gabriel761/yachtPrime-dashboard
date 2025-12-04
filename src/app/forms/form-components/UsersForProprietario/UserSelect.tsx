import SelectInput from "@/components/SelectGroup/SelectInput";
import SelectWithSearch from "@/components/SelectGroup/SelectWithSearch";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { User } from "@/types/applicationTypes/User";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";




const UserSelect = ({ addItemToTable, errorMessage }: { addItemToTable: Function, errorMessage: string | undefined }) => {
    const [selectItems, setSelectItems] = useState<User[] | null>(null)

    const getItensSeminovo = async () => {
        const token = await auth.currentUser?.getIdToken()
        const itens = await httpClient.get(`${baseUrl}/user/all-users`, token)
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
        <SelectInput placeholder="Adicione um usuário" label="Usuários" errorMessage={errorMessage} handleChange={addItemToTable}>
            {
                !selectItems ? null : selectItems.map((user) => (
                    <option key={user.id} value={JSON.stringify(user)}>{user.email}</option>
                ))
            }
        </SelectInput>
    );
}

export default UserSelect;