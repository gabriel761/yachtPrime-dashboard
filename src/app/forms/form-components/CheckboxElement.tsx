import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { Controller } from "react-hook-form";

const CheckBoxElement = ({ control }: { control: any }) => {
    return (
        <Controller
            name="oportunidade"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <CheckboxTwo value={field.value} changeValue={(value) => field.onChange(value)} checkBoxText="Barco seminovo é oportunidade para o cliente? (Oferta ou Promoção)" />
            )}
        />
    );
}

export default CheckBoxElement;