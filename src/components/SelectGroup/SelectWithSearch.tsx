import { ChangeEventHandler } from "react";

const SelectWithSearch = ({ label, handleChange, errorMessage }: { label: string, handleChange?: ChangeEventHandler<HTMLInputElement>, errorMessage?:string}) => {
    return ( 
        <div className="relative">
            <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label}
                </label>
                <input
                    type="text"
                    accept="image/png, image/jpeg document/pdf"
                    placeholder="Selecione um item"
                    onChange={handleChange}
                    className={`w-full rounded border-[1.5px]  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${!!errorMessage ? "border-red dark:border-red" : "border-stroke"}`}
                />
                <p className="text-red ">{errorMessage}</p>
            </div>
            <div>
                <ul className={`custom-select absolute bg-white z-20 w-full text-black appearance-none rounded-lg border border-stroke transition shadow-default  dark:border-form-strokedark dark:bg-form-input absolute`}>
                    <li>Forno Microondas</li>
                    <li>Caixa de som Blue-Tooth</li>
                    <li>Caixa térmica para bebida</li>
                    <li>Forno Microondas</li>
                    <li>Caixa de som Blue-Tooth</li>
                    <li>Caixa térmica para bebida</li>
                    <li>Forno Microondas</li>
                    <li>Caixa de som Blue-Tooth</li>
                    <li>Caixa térmica para bebida</li>
                </ul>
            </div>
        </div>
     );
}
 
export default SelectWithSearch;