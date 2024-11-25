
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";

type Motor = {
    id: number,
    modelo: string,
    marca: string
}



const SelectMotor = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [selectItems, setSelectItems] = useState<Motor[] | null>(null)

    const getMotores = async () => {
        const motores = await httpClient.get(`${baseUrl}/resources/seminovo/motor`)
        setSelectItems(motores)
    }

    useEffect(() => {
        getMotores()
    }, [])

    return (
        <Controller
        name="modeloMotor"
        control={control}
        defaultValue=""
        render={({field })=>{ 
             return(
            <SelectInput  errorMessage={errorMessage} handleChange={(value:string)=>field.onChange(value) }  label="Motor" placeholder="Selecione o motor">
                {
                    !selectItems ? null : selectItems?.map((item) => (
                        <option key={item.id} value={item.modelo}>{item.modelo}</option>
                    ))
                }
            </SelectInput>
        )}}
       />
            
       
    );
}

export default SelectMotor;