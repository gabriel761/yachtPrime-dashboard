import SelectInput from "@/components/SelectGroup/SelectInput";
import { Controller } from "react-hook-form";

type PetFriendly = Array<string>



const SelectPetFriendly = ({ control, errorMessage }: { control: any, errorMessage: string | undefined }) => {
    const petFriendly: PetFriendly = ["Sim", "Não"]
    return (
        <Controller
            name="petFriendly"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <SelectInput value={field.value} errorMessage={errorMessage} handleChange={(value: string) => field.onChange(parseInt(value))} label="Pet friendly" placeholder="Pet friendly">
                    {
                        !petFriendly ? null : petFriendly.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
                </SelectInput>
            )} />
    );
}

export default SelectPetFriendly;