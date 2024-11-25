import React, { useState } from "react";

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"]; // MIME types

const FileUpload = ({ label, controlValue, errorMessage }: { label: string, controlValue: Function, errorMessage: string | undefined}) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const validFiles: File[] = [];
        for (const file of Array.from(files)) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                alert(`O arquivo "${file.name}" excede o limite de tamanho ${MAX_FILE_SIZE_MB}MB.`);
                continue;
            }
            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
                alert(`O arquivo "${file.name}" não é um formato suportado (apenas PNG e JPG).`);
                continue;
            }
            validFiles.push(file);
        }
        const urls = validFiles.map((file) => URL.createObjectURL(file));
        const newImageUrls = [...imageUrls, ...urls]
        controlValue(newImageUrls)
        setImageUrls(newImageUrls);
    };

    const handleRemoveImage = (index: number) => {
        setImageUrls((prev) => prev.filter((_, i) => i !== index));
    };

   

    return (
        <>
            <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label}
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpeg document/pdf"
                    multiple
                    onChange={handleFileChange}
                    className={`w-full cursor-pointer rounded-lg border-[1.5px]  bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary ${!!errorMessage ? "border-red dark:border-red" : "border-stroke" }`}
                />
                <p className="text-red ">{errorMessage}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-white text-black group-hover:flex"
                            title="Remover imagem"
                        >
                            X
                        </button>
                        <div className="aspect-[16/9] overflow-hidden rounded">
                            <img
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    );
};

export default FileUpload;
