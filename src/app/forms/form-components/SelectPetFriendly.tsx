import SelectInput from "@/components/SelectGroup/SelectInput";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";



const SelectPetFriendly = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {

    const [selectItems, setSelectItems] = useState<PetFriendly[] | null>(null)

    const getPetFriendly = async () => {
        const token = await auth.currentUser?.getIdToken()
        const petFriendly = await httpClient.get(`${baseUrl}/resources/charter/pet-friendly`, token)
        setSelectItems(petFriendly)
    }
    
    useEffect(() => {
            const unsubscribe = onIdTokenChanged(auth, async (user) => {
                if (user) {
                    await getPetFriendly(); // Só chama o método quando o token é garantido
                } else {
                    console.warn("Usuário não autenticado.");
                }
            });
    
            return () => unsubscribe(); // Remove o listener ao desmontar o componente
        }, []);

    return (
        <Controller
            name="petFriendly"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(value)} label="Pet friendly" placeholder="Pet friendly">
                    {
                        !selectItems ? null : selectItems.map((item) => (
                            <option key={item.id} value={JSON.stringify(item)}>{item.opcao}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectPetFriendly;