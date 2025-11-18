import { formatPhone, formatPrice } from "@/util/stringMetoods";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";


const InputElement = ({ label, placeholder, type, register, registerName,  errorMessage, maxLength }: { label?: string, placeholder?: string, type?: HTMLInputTypeAttribute, register:Function, registerName: string, errorMessage: string | undefined, maxLength?:number }) => {

    
    
    return ( 
        <>
            <label  className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>
            <input 
                {...register(registerName,
                    { 
                        setValueAs: (v:string) => {
                            if(type === "number"){
                            return v === "" ? "" : Number(v)
                            }else{
                                return v === "" ? "" : v
                            }
                        } 
                    }
                )}
                onChange={(e) => {
                    if(placeholder === "0,00"){
                        e.target.value = formatPrice(e.target.value)
                    } else if (placeholder === "Telefone") {
                        e.target.value = formatPhone(e.target.value);
                    }
                }}
                defaultValue=""
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full rounded border-[1.5px]  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${!!errorMessage ? "border-red dark:border-red" : "border-stroke" }`}
            />
            <p className="text-red ">{errorMessage}</p>
        </>
     );
}
 
export default InputElement;