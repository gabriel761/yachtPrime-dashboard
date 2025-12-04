import { MouseEvent, useState } from "react";
import { Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import proprietariosTable from "./ProprietarioTable";
import proprietarioselect from "./ProprietarioSelect";
import ProprietarioTable from "@/app/list/listar-proprietario/list-components/ProprietarioTable";
import ProprietariosTable from "./ProprietarioTable";
import ProprietarioSelect from "./ProprietarioSelect";
import { Proprietario } from "@/types/applicationTypes/Proprietario";


type props = {
    control: any,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined | { message: string }
}


const Proprietarios = ({ control, errorMessage }: props) => {
    const [proprietarios, setproprietarios] = useState<Proprietario[]>([])


    const syncControlerValueWithState = (value: Proprietario[]) => {
        console.log("controller field value:", value)
        setproprietarios(value)
    }

    const addProprietarioToTable = (proprietarioFromTableJSON: string, updateControllerValue: Function) => {
        const proprietarioFromTable = JSON.parse(proprietarioFromTableJSON)
        const checkRepeatedProprietario = proprietarios.find((proprietario) => {
            return proprietario.id == proprietarioFromTable.id
        })
        if (checkRepeatedProprietario) {
            return
        }
        const newproprietariosTable = [...proprietarios, proprietarioFromTable]
        updateControllerValue(newproprietariosTable)
        setproprietarios(newproprietariosTable)
        return true
    }

    const handleDeleteProprietario = (event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number, updateControllerValue: Function) => {
        event.preventDefault()
        const newproprietariosTable = proprietarios.filter((proprietario) => proprietario.id != id)
        updateControllerValue(newproprietariosTable)
        setproprietarios(newproprietariosTable)
    }



    return (
        <Controller
            name="proprietarios"
            defaultValue={[]}
            control={control}
            render={({ field }) => (
                <div className="border-red">
                    <div className="mb-5">
                        <ProprietarioSelect
                            errorMessage={errorMessage?.message}
                            addItemToTable={(value: string) => addProprietarioToTable(value, field.onChange)}
                        />
                    </div>
                    <ProprietariosTable
                        controlValue={field.value}
                        syncControlerValueWithState={() => syncControlerValueWithState(field.value)}
                        errorMessage={typeof errorMessage != "string" ? errorMessage : {}}
                        proprietarios={proprietarios}
                        handleDeleteRoteiro={(event: MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => handleDeleteProprietario(event, id, field.onChange)}
                    />
                    <p className="text-danger">{errorMessage?.message}</p>
                </div>
            )}
        />
    );
}

export default Proprietarios;