import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { Controller } from "react-hook-form";

const CheckBoxElement = ({ control, registerName, errorMessage, label }: { control: any, registerName: string, errorMessage?: string, label: string }) => {
    return (
        <Controller
            name={registerName}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <>
                    <CheckboxTwo value={field.value} changeValue={(value) => field.onChange(value)} checkBoxText={label} />
                    <p className="text-red">{errorMessage}</p>
                </>
            )}
        />
    );
}

export default CheckBoxElement;