import { useEffect, useState } from "react";
import baseUrl from "@/infra/back-end-connection"
import SelectInput from "@/components/SelectGroup/SelectInput";
import { Controller } from "react-hook-form";

type Quantidades = Array<number>



const SelectQuantidade = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const quantidades: Quantidades = [1, 2, 3, 4]
    return (
        <Controller
            name="quantidadeMotor"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(parseInt(value))} label="Quantidade" placeholder="Quantidade de motores">
                    {
                        !quantidades ? null : quantidades.map((quantidade) => (
                            <option key={quantidade} value={quantidade}>{quantidade}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectQuantidade;