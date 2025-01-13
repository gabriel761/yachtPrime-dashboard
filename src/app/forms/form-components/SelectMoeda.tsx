import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";

type Moeda = {
    id: number;
    nome: string;
    simbolo: string;
    codigoBancario: string
}



const SelectMoeda = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [moedas, setMoedas] = useState<Moeda[] | null>(null)

    const getMoedas = async () => {
        const token = await auth.currentUser?.getIdToken()
        const moedas = await httpClient.get(`${baseUrl}/resources/moeda`, token)
        setMoedas(moedas)
    }

    useEffect(() => {
        getMoedas()
    }, [])
    return (
        <Controller
            name="moeda"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Moeda" placeholder="Selecione a moeda do preço">
                    {
                        !moedas ? null : moedas.map((item) => (
                            <option key={item.id} value={item.simbolo}>{item.nome}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectMoeda;