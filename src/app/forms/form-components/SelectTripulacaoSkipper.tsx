import SelectInput from "@/components/SelectGroup/SelectInput";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

type TripulacaoSkipper = {
    id: number,
    opcao: string
}



const SelectTripulacaoSkipper = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const [tripulacaoSkipper, setTripulacaoSkipper] = useState<TripulacaoSkipper[] | null>(null)



    const getTripulacaoSkipper = async () => {
        const token = await auth.currentUser?.getIdToken()
        const tripulacaoSkipper = await httpClient.get(`${baseUrl}/resources/charter/tripulacao-skipper`, token)
        setTripulacaoSkipper(tripulacaoSkipper)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getTripulacaoSkipper(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, []);

    return (
        <Controller
            name="tripulacaoSkipper"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(parseInt(value))} label="Tripulação ou Skipper" placeholder="Tripulação ou Skipper">
                    {
                        !tripulacaoSkipper ? null : tripulacaoSkipper.map((item) => (
                            <option key={item.id} value={JSON.stringify(item)}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectTripulacaoSkipper;