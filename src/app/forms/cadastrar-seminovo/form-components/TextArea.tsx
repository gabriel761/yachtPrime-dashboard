const TextArea = ({ placeholder, label, rows = 6 }: { placeholder?: string, label:string, rows?: number }) => {
    return (
        <>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                {label}
            </label>

            <textarea
                rows={rows}
                placeholder={placeholder}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
        </>
    );
}

export default TextArea;