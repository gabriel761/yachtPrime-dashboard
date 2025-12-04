import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { Controller } from "react-hook-form";

const CheckBoxElement = ({ control, registerName, errorMessage, label }: { control: any, registerName: string, errorMessage?: string, label: string }) => {
    return (
        <Controller
            name={registerName}
            control={control}
            render={({ field }) => (
                <>
                    <CheckboxTwo value={field.value} changeValue={(value) => field.onChange(value)} checkBoxText={label} registerName={registerName}/>
                    <p className="text-red">{errorMessage}</p>
                </>
            )}
        />
    );
}

export default CheckBoxElement;