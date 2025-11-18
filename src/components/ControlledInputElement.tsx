import { formatPhone, formatPrice } from "@/util/stringMetoods";
import { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type Props = {
    label?: string,
    placeholder?: string,
    type?: HTMLInputTypeAttribute,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>, ...args: any[]) => void,
    errorMessage: string | undefined,
    maxLength?: number
}

const ControlledInputElement = ({ label, placeholder, type, value, onChange, errorMessage, maxLength }: Props) => {



    return (
        <>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>
            <input

                onChange={(e) => onChange(e)}
                type={type}
                value={value}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full rounded border-[1.5px]  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${!!errorMessage ? "border-red dark:border-red" : "border-stroke"}`}
            />
            <p className="text-red ">{errorMessage}</p>
        </>
    );
}

export default ControlledInputElement;