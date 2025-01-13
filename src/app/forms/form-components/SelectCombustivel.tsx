import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";

export type Combustivel = {
    opcao: string,
    id: number
}



const SelectCombustivel = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [combustivel, setcombustivel] = useState<Combustivel[] | null>(null)

    const getCombustivel = async () => {
        const token = await auth.currentUser?.getIdToken()
        const combustivel = await httpClient.get(`${baseUrl}/resources/seminovo/combustivel`, token)
        setcombustivel(combustivel)
    }

    useEffect(() => {
        getCombustivel()
    }, [])
    return (
        <>
        <Controller
            name="combustivel"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Combustível" placeholder="Tipo de Combustível">
                    {
                        !combustivel ? null : combustivel.map((item) => (
                            <option key={item.id} value={JSON.stringify(item)}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
           
        </>
    );
}

export default SelectCombustivel;