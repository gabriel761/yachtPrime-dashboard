import SelectInput from "@/components/SelectGroup/SelectInput";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

type TipoPasseio = {
    id: number,
    opcao: string
}



const SelectTipoPasseio = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
   const [tipoPasseio, setTipoPasseio] = useState<TipoPasseio[] | null>(null)
   


    const getTipoPasseio = async () => {
        const token = await auth.currentUser?.getIdToken()
        const tipoPasseio = await httpClient.get(`${baseUrl}/resources/charter/tipo-passeio`, token)
        setTipoPasseio(tipoPasseio)
    }

     useEffect(() => {
            const unsubscribe = onIdTokenChanged(auth, async (user) => {
                if (user) {
                    await getTipoPasseio(); // Só chama o método quando o token é garantido
                } else {
                    console.warn("Usuário não autenticado.");
                }
            });
    
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
        }, []);

    return (
        <Controller
            name="tipoPasseio"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Tipo de Passeio" placeholder="Tipo de Passeio">
                    {
                        !tipoPasseio ? null : tipoPasseio.map((item) => (
                            <option key={item.id} value={JSON.stringify(item)}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectTipoPasseio;