import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";

type Quantidades = Array<number>



const SelectQuantidade = () => {
    const quantidades: Quantidades = [1, 2, 3, 4]
    return (
        <SelectInput  label="Quantidade" placeholder="Selecione a quantidade de motores">
            {
                !quantidades ? null : quantidades.map((quantidade) => (
                        <option key={quantidade} value={quantidade}>{quantidade}</option>
                    ))
            }
        </SelectInput>
    );
}

export default SelectQuantidade;