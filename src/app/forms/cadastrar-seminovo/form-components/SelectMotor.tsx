
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";

type Motor = {
    id: number,
    modelo: string,
    marca: string
}



const SelectMotor = ({register, registerName}: {register:any, registerName:string}) => {
    const [selectItems, setSelectItems] = useState<Motor[] | null>(null)
    
    const getMotores = async () => {
        const motores = await httpClient.get(`${baseUrl}/resources/seminovo/motor`)
        setSelectItems(motores)
    }

    useEffect(() => {
        getMotores()
    }, [])

    return (
        <SelectInput register={register} name={registerName} label="Motor" placeholder="Selecione o motor">
            {
                !selectItems ? null : selectItems?.map((item) => (
                    <option key={item.id} value={item.modelo}>{item.modelo}</option>
                ))
            }
        </SelectInput>
    );
}

export default SelectMotor;