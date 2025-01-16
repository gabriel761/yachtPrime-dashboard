
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";
import httpClient from "@/infra/httpClient";
import { onIdTokenChanged } from "firebase/auth";

export type Modelo = {
    id: number,
    marca?: string,
    modelo: string
}



const SelectModelos = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [selectItems, setSelectItems] = useState<Modelo[] | null>(null)

    const getModelos = async () => {
        const token = await auth.currentUser?.getIdToken()
        const res = await httpClient.get(`${baseUrl}/resources/seminovo/modelo`, token)
        const modelos = res

        setSelectItems(modelos)
    }

    useEffect(() => {
            const unsubscribe = onIdTokenChanged(auth, async (user) => {
                if (user) {
                    await getModelos(); // Só chama o método quando o token é garantido
                } else {
                    console.warn("Usuário não autenticado.");
                }
            });
    
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
        }, []);

    return (
        <>
        <Controller
            name="modelo"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Modelo" placeholder="Selecione o modelo">
                    {
                        !selectItems ? null : selectItems.map((modelo) => (
                            <option key={modelo.id} value={JSON.stringify(modelo)}>{modelo.modelo}</option>
                        ))
                    }
                </SelectInput>
            )} />
            
        </>
    );
}

export default SelectModelos;