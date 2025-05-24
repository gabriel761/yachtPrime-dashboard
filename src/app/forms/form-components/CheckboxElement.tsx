import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { Controller } from "react-hook-form";

const CheckBoxElement = ({ control }: { control: any }) => {
    return (
        <Controller
            name="oportunidade"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <CheckboxTwo value={field.value} changeValue={(value) => field.onChange(value)} checkBoxText="Teste de redeploy" />
            )}
        />
    );
}

export default CheckBoxElement;