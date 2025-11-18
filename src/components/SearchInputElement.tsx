import { formatPhone, formatPrice } from "@/util/stringMetoods";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";


const SearchInputElement = ({ label, placeholder, type, register, registerName, errorMessage, maxLength, handleRecommendations }: { label?: string, placeholder?: string, type?: HTMLInputTypeAttribute, register: Function, registerName: string, errorMessage: string | undefined, maxLength?: number, handleRecommendations: (v: string) => void }) => {



    return (
        <>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>
            <div className={`w-full rounded border-[1.5px] bg-transparent text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary  ${!!errorMessage ? "border-red dark:border-red" : "border-stroke"}`}>
                <input
                    {...register(registerName,
                        {
                            setValueAs: (v: string) => {
                                handleRecommendations(v)
                            }
                        }
                    )}
                    defaultValue=""
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`w-full bg-transparent px-5 py-3 text-black outline-none disabled:cursor-default dark:border-form-strokedark dark:bg-form-input dark:text-white`}
                />
                <div>
                    <IoSearchCircleOutline/>
                </div>
            </div>
            <p className="text-red ">{errorMessage}</p>
        </>
    );
}

export default SearchInputElement;