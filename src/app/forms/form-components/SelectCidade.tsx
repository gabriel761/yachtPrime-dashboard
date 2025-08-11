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



const SelectCidade = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [cidade, setCidade] = useState<Cidade[] | null>(null)



    const getCidade = async () => {
        const token = await auth.currentUser?.getIdToken()
        const tipoCidade = await httpClient.get(`${baseUrl}/resources/charter/cidades`, token)
        setCidade(tipoCidade)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getCidade(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, []);

    return (
        <Controller
            name="cidade"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Cidade" placeholder="Cidade">
                    {
                        !cidade ? null : cidade.map((item) => (
                            <option key={item.id} value={item.opcao}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectCidade;