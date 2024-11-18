import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";

export type Combustivel = {
    opcao: string,
    id: number
}



const SelectCombustivel = () => {
    const [combustivel, setcombustivel] = useState<Combustivel[] | null>(null)

    const getCombustivel = async () => {
        const combustivel = await httpClient.get(`${baseUrl}/resources/seminovo/combustivel`)
        setcombustivel(combustivel)
    }

    useEffect(() => {
        getCombustivel()
    }, [])
    return (
        <SelectInput label="Combustível" placeholder="Tipo de Combustível">
            {
                !combustivel ? null : combustivel.map((item) => (
                    <option key={item.id} value={item.opcao}>{item.opcao}</option>
                ))
            }
        </SelectInput>
    );
}

export default SelectCombustivel;