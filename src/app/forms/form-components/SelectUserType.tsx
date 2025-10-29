import SelectInput from "@/components/SelectGroup/SelectInput";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

type Cidade = {
    id: number;
    opcao: string
}



const SelectUserType = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [userType, setUserType] = useState<Cidade[] | null>(null)



    const getCidade = async () => {
        const token = await auth.currentUser?.getIdToken()
        const userTypeBackEnd = await httpClient.get(`${baseUrl}/user/user-types`, token)
        setUserType(userTypeBackEnd)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getCidade();
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Controller
            name="userType"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Tipo de usuário" placeholder="Tipo de usuário">
                    {
                        !userType ? null : userType.map((item) => (
                            <option key={item.id} value={item.opcao}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectUserType;