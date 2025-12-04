import { MutableRefObject, useEffect } from "react";
import { ItemSeminovo } from "@/types/applicationTypes/ItemSeminovo";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { RoteiroCharterForm } from "@/types/applicationTypes/charter/RoteiroCharter";
import { IoCloseSharp } from "react-icons/io5";
import { User } from "@/types/applicationTypes/User";


type props = {
    users: User[], 
    handleDeleteRoteiro: Function,
    errorMessage: Merge<FieldError, (Merge<FieldError, FieldErrorsImpl<{ nome: string; moeda: string; preco: string; descricao: string; detalhesPagamento: string; }>> | undefined)[]> | undefined,
    controlValue: ItemSeminovo[],
    syncControlerValueWithState: Function
}

const UsersTable = ({ users, handleDeleteRoteiro, controlValue, syncControlerValueWithState}:props) => {

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
                            <th className="min-w-[160px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                E-mail
                            </th>
                            <th className="max-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                                Tipo de usuário
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                    <p className="font-regular dark:text-white">
                                        {user.email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="font-regular dark:text-white">
                                        {user.userType}
                                    </p>
                                </td>
                                
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={(event) => handleDeleteRoteiro(event,user.id)} className="hover:text-primary">
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

export default UsersTable;
