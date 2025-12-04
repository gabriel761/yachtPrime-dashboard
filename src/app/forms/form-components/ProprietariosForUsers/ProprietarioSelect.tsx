import SelectInput from "@/components/SelectGroup/SelectInput";
import SelectWithSearch from "@/components/SelectGroup/SelectWithSearch";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { Proprietario } from "@/types/applicationTypes/Proprietario";

import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";




const ProprietarioSelect = ({ addItemToTable, errorMessage }: { addItemToTable: Function, errorMessage: string | undefined }) => {
    const [selectProprietarios, setSelectProprietarios] = useState<Proprietario[] | null>(null)

    const getItensSeminovo = async () => {
        const token = await auth.currentUser?.getIdToken()
        const itens = await httpClient.get(`${baseUrl}/resources/proprietario-dashboard-list`, token)
        setSelectProprietarios(itens)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (proprietario) => {
            if (proprietario) {
                await getItensSeminovo(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <SelectInput placeholder="Adicione um Proprietário" label="Proprietários" errorMessage={errorMessage} handleChange={addItemToTable}>
            {
                !selectProprietarios ? null : selectProprietarios.map((proprietario) => (
                    <option key={proprietario.id} value={JSON.stringify(proprietario)}>{proprietario.nome}</option>
                ))
            }
        </SelectInput>
    );
}

export default ProprietarioSelect;