import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";

type Moeda = {
    id: number;
    nome: string;
    simbolo: string;
    codigoBancario: string
}



const SelectMoeda = ({ control, errorMessage, name }: { control: any, errorMessage: string | undefined, name?:string }) => {
    const [moedas, setMoedas] = useState<Moeda[] | null>(null)
    const inputName = name ? name : "moeda"

    const getMoedas = async () => {
        const token = await auth.currentUser?.getIdToken()
        const moedas = await httpClient.get(`${baseUrl}/resources/moeda`, token)
        setMoedas(moedas)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getMoedas(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, []);
    
    return (

        <Controller
            name={inputName}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Moeda" placeholder="Selecione a moeda do preço">
                    {
                        !moedas ? null : moedas.map((item) =>{ 
                            return (
                            <option key={item.id} value={item.simbolo}>{item.nome}</option>
                        )})
                    }
                </SelectInput>
            )} />
    );
}

export default SelectMoeda;