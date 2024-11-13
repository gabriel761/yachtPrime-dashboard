import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";

type Moeda = Array<string>



const SelectMoeda = () => {
    const moeda: Moeda = ["Real", "Dólar"]
    return (
        <SelectInput label="Moeda" placeholder="Selecione a moeda do preço">
            {
                !moeda ? null : moeda.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))
            }
        </SelectInput>
    );
}

export default SelectMoeda;