import { HTMLInputTypeAttribute } from "react";


const InputElement = ({ label, placeholder, type }: { label: string, placeholder?: string, type?: HTMLInputTypeAttribute }) => {

    
    
    return ( 
        <>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
        </>
     );
}
 
export default InputElement;