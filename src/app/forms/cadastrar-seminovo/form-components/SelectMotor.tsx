
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";

type Motor = {
    motor: {nome:string}[],
    marca: string
}



const SelectMotor = ( ) => {
    const [selectItems, setSelectItems] = useState<Motor[]|null>(null)

    const getMotores = async () => {
        const motores = await httpClient.get(`${baseUrl}/resources/seminovo/motor`)
        setSelectItems(motores)
    }

   

    useEffect(() => {
        getMotores()
    }, [])
   
    return ( 
        <SelectInput label="Motor" placeholder="Selecione o motor">
            {
                !selectItems ? null : selectItems?.map((item) => (
                    <optgroup key={item.marca} label={item.marca}>
                        {
                            item.motor.map((motor) => (
                                <option key={motor.nome} value={motor.nome}>{motor.nome}</option>
                            ))
                        }
                    </optgroup>
                ))
            }
        </SelectInput>
     );
}
 
export default SelectMotor;