import { Package } from "@/types/package";
import InputElement from "../../../../components/InputElement";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { ItemCharter } from "@/types/applicationTypes/charter/ItemCharter";
import { IoCloseSharp } from "react-icons/io5";


type props = {
    itensCharter: ItemCharter[],
    handleQuantityUpdate: Function, 
    handleDeleteItem: Function,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ id: number; item: string; quantidade: number; }>> | undefined)[]> | undefined,
    controlValue: ItemCharter[],
    syncControlerValueWithState: Function
}

const ItemTable = ({ itensCharter, handleQuantityUpdate, handleDeleteItem, errorMessage, controlValue, syncControlerValueWithState}:props) => {

   useEffect(()=> {
    syncControlerValueWithState()
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [controlValue])
    return (
        <div className={`rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1  `}>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Item
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Quantidade
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itensCharter.map((item, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-regular dark:text-white">
                                        {item.item}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <input
                                        type="number"
                                        id={`${item.id}`}
                                        onChange={({target}) =>{handleQuantityUpdate(target)} }
                                        value={item.quantidade}
                                        className={`w-[80px] rounded border-[1.5px]  bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${!!errorMessage?.[index]?.quantidade?.message ? "border-red dark:border-red" : "border-stroke" }`}
                                    />
                                    <p className="text-red">{errorMessage?.[index]?.quantidade?.message}</p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={(event) => handleDeleteItem(event,item.id)} className="hover:text-primary">
                                            <IoCloseSharp size={25}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemTable;
