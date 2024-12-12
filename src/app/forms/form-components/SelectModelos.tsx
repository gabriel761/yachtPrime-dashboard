
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import { Controller } from "react-hook-form";

export type Modelo = {
    id: number,
    marca?: string,
    modelo: string
}



const SelectModelos = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [selectItems, setSelectItems] = useState<Modelo[] | null>(null)

    const getModelos = async () => {
        const res = await fetch(`${baseUrl}/resources/seminovo/modelo`)
        const modelos = await res.json()

        setSelectItems(modelos)
    }

    useEffect(() => {
        getModelos()
    }, [])

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