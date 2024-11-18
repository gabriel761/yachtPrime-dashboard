import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";

export type Propulsao = {
    opcao: string,
    id: number
}



const SelectPropulsao = () => {
    const [propulsao, setPropulsao] = useState<Propulsao[] | null>(null)

    const getpropulsao = async () => {
        const propulsao = await httpClient.get(`${baseUrl}/resources/seminovo/propulsao`)
        setPropulsao(propulsao)
    }

    useEffect(() => {
        getpropulsao()
    }, [])
    return (
        <SelectInput label="Propulsão" placeholder="Tipo de propulsão">
            {
                !propulsao ? null : propulsao.map((item) => (
                    <option key={item.id} value={item.opcao}>{item.opcao}</option>
                ))
            }
        </SelectInput>
    );
}

export default SelectPropulsao;