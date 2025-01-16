
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import httpClient from "@/infra/httpClient";
import { Controller } from "react-hook-form";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";

type Motor = {
    id: number,
    modelo: string,
    marca: string
}



const SelectMotor = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [selectItems, setSelectItems] = useState<Motor[] | null>(null)

    const getMotores = async () => {
        const token = await auth.currentUser?.getIdToken()
        const motores = await httpClient.get(`${baseUrl}/resources/seminovo/motor`, token)
        setSelectItems(motores)
    }


    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getMotores(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, []);
    
    return (
        <Controller
            name="modeloMotor"
            control={control}
            defaultValue=""
            render={({ field }) => {
                return (
                    <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Motor" placeholder="Selecione o motor">
                        {
                            !selectItems ? null : selectItems?.map((item) => (
                                <option key={item.id} value={item.modelo}>{item.modelo}</option>
                            ))
                        }
                    </SelectInput>
                )
            }}
        />


    );
}

export default SelectMotor;