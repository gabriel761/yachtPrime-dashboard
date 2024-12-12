const TextArea = ({ placeholder, label, rows = 6, register, registerName, errorMessage, maxLength }: { placeholder?: string, label: string, rows?: number, register: Function, registerName: string, errorMessage:string| undefined, maxLength?: number }) => {
    return (
        <>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>

            <textarea
                {...register(registerName)}
                maxLength={maxLength}
                rows={rows}
                placeholder={placeholder}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
            <p className="text-red ">{errorMessage}</p>
        </>
    );
}

export default TextArea;