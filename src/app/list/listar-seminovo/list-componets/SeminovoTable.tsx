'use client'
import { useModal } from "@/context/ModalContext";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { BarcoSeminovoList } from "@/types/applicationTypes/BarcoSeminovo";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";



const SeminovoTable = () => {
    const [seminovoData, setSeminovoData] = useState<BarcoSeminovoList[] | null>(null)
    const { openModal } = useModal()

    const getSeminovos = async () => {
        const result = await httpClient.get(`${baseUrl}/barco/seminovo`)
        setSeminovoData(result)
    }

    const deleteSeminovo = async (id: number) => {
        try{
        await httpClient.delete(`${baseUrl}/barco/seminovo`, { id })
        getSeminovos()
        }catch(error:any){
            openModal("clientError", error.message)
            console.error(error)
        }
    }

    useEffect(() => {
        getSeminovos()
    }, [])
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Seminovos
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Modelo</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex justify-start">
                    <p className="font-medium">Nome </p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Tamanho</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Ano</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Preço</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Ações</p>
                </div>
            </div>

            {seminovoData && seminovoData.map((seminovo, index) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={index}
                >
                    <div className="col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="w-[32%] rounded-md">
                                <img
                                    className="h-full w-full"
                                    src={seminovo.imagem}
                                    alt={seminovo.modelo + "image"}
                                />
                            </div>
                            <p className="text-sm text-black dark:text-white">
                                {seminovo.modelo}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {seminovo.nome}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {seminovo.tamanho} pés
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{seminovo.ano}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-meta-3">{seminovo.moeda + seminovo.valor}</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-around">
                        <div className="cursor-pointer" onClick={() => deleteSeminovo(seminovo.id)}>
                            <BsTrash scale={20} color="#1a222c" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SeminovoTable;