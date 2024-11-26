import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";

export type Combustivel = {
    opcao: string,
    id: number
}



const SelectCombustivel = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [combustivel, setcombustivel] = useState<Combustivel[] | null>(null)

    const getCombustivel = async () => {
        const combustivel = await httpClient.get(`${baseUrl}/resources/seminovo/combustivel`)
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
                <SelectInput errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Combustível" placeholder="Tipo de Combustível">
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