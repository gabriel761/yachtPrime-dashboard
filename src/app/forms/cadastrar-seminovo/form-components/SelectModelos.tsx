
import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";

type Modelos = Array<{
    marca: string,
    modelos: Array<{ nome: string }>
}>



const SelectModelos = ( ) => {
    const [selectItems, setSelectItems] = useState<Modelos | null>(null)

    const getModelos = async () => {
        const res = await fetch(`${baseUrl}/resources/seminovo/modelo`)
        const modelos = await res.json()
        
        setSelectItems(modelos)
    }

    useEffect(() => {
        getModelos()
    }, [])
   
    return ( 
        <SelectInput label="Modelo" placeholder="Selecione o modelo">
            {
                !selectItems ? null : selectItems.map((item) => (
                    <optgroup key={item.marca} label={item.marca}>
                        {
                            item.modelos.map((modelo) => (
                                <option key={modelo.nome} value={modelo.nome}>{modelo.nome}</option>
                            ))
                        }
                    </optgroup>
                ))
            }
        </SelectInput>
     );
}
 
export default SelectModelos;