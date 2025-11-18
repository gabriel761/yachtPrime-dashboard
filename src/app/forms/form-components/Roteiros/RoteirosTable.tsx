import { MutableRefObject, useEffect } from "react";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { RoteiroCharterForm } from "@/types/applicationTypes/charter/RoteiroCharter";
import { IoCloseSharp } from "react-icons/io5";


type props = {
    roteirosCharter: RoteiroCharterForm[], 
    handleDeleteRoteiro: Function,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined,
    controlValue: ItemSeminovo[],
    syncControlerValueWithState: Function
    handleEditButton: Function
}

const RoteirosTable = ({ roteirosCharter, handleDeleteRoteiro, controlValue, syncControlerValueWithState, handleEditButton}:props) => {

   useEffect(()=> {
    syncControlerValueWithState()
       // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [controlValue])

   console.log("roteiros charter:", roteirosCharter)


    return (
        <div className={`rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1  `}>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[160px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Roteiro
                            </th>
                            <th className="max-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                Descrição
                            </th>
                            <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                                Preço
                            </th>
                            <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                                Detalhes de Pagamento
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {roteirosCharter.map((item, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-regular dark:text-white">
                                        {item.nome}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="font-regular dark:text-white">
                                        {item.descricao}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="font-regular dark:text-white">
                                      {item.moeda} {item.preco}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="font-regular dark:text-white">
                                        {item.detalhesPagamento}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={(event) => handleDeleteRoteiro(event,item.nome)} className="hover:text-primary">
                                            <IoCloseSharp size={25}/>
                                        </button>
                                        <button onClick={(event) => {handleEditButton(event,item)}} className="hover:text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>

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

export default RoteirosTable;
