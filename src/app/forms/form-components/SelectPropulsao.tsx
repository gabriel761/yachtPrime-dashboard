import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";

export type Propulsao = {
    opcao: string,
    id: number
}



const SelectPropulsao = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [propulsao, setPropulsao] = useState<Propulsao[] | null>(null)

    const getpropulsao = async () => {
        const token = await auth.currentUser?.getIdToken()
        const propulsao = await httpClient.get(`${baseUrl}/resources/seminovo/propulsao`, token)
        setPropulsao(propulsao)
    }

    useEffect(() => {
        getpropulsao()
    }, [])
    return (
        <Controller
            name="propulsao"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value:string) => field.onChange(value)} label="Propulsão" placeholder="Tipo de propulsão">
                    {
                        !propulsao ? null : propulsao.map((item) => (
                            <option key={item.id} value={JSON.stringify(item)}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectPropulsao;