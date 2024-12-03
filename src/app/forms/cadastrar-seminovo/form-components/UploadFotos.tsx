import FileUpload from "@/components/FileUpload/FileUpload";
import { Controller } from "react-hook-form";
const UploadFotos = ({ control, errorMessage }: { control: any, errorMessage: string | undefined}) => {
    return (
        <Controller
            name="imagens"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
                <FileUpload errorMessage={errorMessage} controlValue={field.value} changeControlValue={(value: string[]) => field.onChange(value)} label="Adicionar imagens" />
            )}
        />
    );
}

export default UploadFotos;