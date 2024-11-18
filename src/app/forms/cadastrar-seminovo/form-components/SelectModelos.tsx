
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";

export type Modelo = {
    id: number,
    marca?: string,
    modelo: string
}



const SelectModelos = () => {
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
        <SelectInput label="Modelo" placeholder="Selecione o modelo">
            {
                !selectItems ? null : selectItems.map((modelo) => (
                    <option key={modelo.id} value={modelo.modelo}>{modelo.modelo}</option>
                ))
            }
        </SelectInput>
    );
}

export default SelectModelos;