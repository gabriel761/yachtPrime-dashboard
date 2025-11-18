import InputElement from "@/components/InputElement";
import SearchRecommendations from "./SearchRecommendations";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import ControlledInputElement from "@/components/ControlledInputElement";
import { ChangeEvent, useState } from "react";
import httpClient from "@/infra/httpClient";
import baseUrl from "@/infra/back-end-connection";
import { Proprietario } from "@/types/applicationTypes/Proprietario";

const SearchProprietario = ({ token, control, errorMessage, name, label, placeholder, setValueHookForm }: { token: string, control: any, errorMessage: string | undefined, name: string, label: string, placeholder: string, setValueHookForm: any }) => {
    const inputName = name ? name : ""
    const [dataRecommendations, setDataRecommendations] = useState<Proprietario[]>([])

    const getRecommendations = async (search: string) => {
        const result = await httpClient.get(`${baseUrl}/resources/search-proprietario/${search}`, token)
        return result
    }

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FieldValues, string>) => {
        const value = e.target.value;
        field.onChange(value);
        if (value.trim() === "") {
            setDataRecommendations([]);
            return;
        }
       const result = await getRecommendations(e.target.value)
       setDataRecommendations(result)
    }

    const handleRecommendationClick = (proprietario: Proprietario) => {
        setValueHookForm("proprietarioId", proprietario.id)
        setValueHookForm("proprietarioNome", proprietario.nome)
        setValueHookForm("proprietarioEmail", proprietario.email)
        setValueHookForm("proprietarioTelefone", proprietario.telefone)
    }

    return (
        <Controller
            name={inputName}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <div className="relative">
                    <ControlledInputElement value={field.value} onChange={(e) => handleInputChange(e, field)} label={label} placeholder={placeholder} errorMessage={errorMessage} />
                    <SearchRecommendations data={dataRecommendations} onClick={handleRecommendationClick} />
                </div>
            )} />
    );
}

export default SearchProprietario;