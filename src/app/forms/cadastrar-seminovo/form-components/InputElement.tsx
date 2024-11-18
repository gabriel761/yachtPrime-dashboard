import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";


const InputElement = ({ label, placeholder, type, register, registerName,  errorMessage, maxLength }: { label: string, placeholder?: string, type?: HTMLInputTypeAttribute, register:Function, registerName: string, errorMessage?: any, maxLength?:number }) => {

    
    
    return ( 
        <>
            <label  className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>
            <input 
                {...register(registerName)}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${!!errorMessage && "border-red"}`}
            />
            <p className="text-red ">{errorMessage}</p>
        </>
     );
}
 
export default InputElement;