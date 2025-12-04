'use client'
import { useModal } from "@/context/ModalContext";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { BarcoCharterList } from "@/types/applicationTypes/charter/BarcoCharter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import placeholder from "@/../../public/images/placeholder/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import Pencil from "@/../public/images/svg/pencil.svg"
import Bin from "@/../public/images/svg/bin.svg" 
import { get } from "http";




const CharterTable = () => {
    const [charterData, setCharterData] = useState<BarcoCharterList[] | null>(null)
    const { openModal } = useModal()
    const router = useRouter();

    const getCharters = useCallback( async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const result = await httpClient.get(`${baseUrl}/barco/charter/list/dashboard`, token)
            setCharterData(result)
        } catch (error: any) {
            openModal("clientError", error.message)
            console.error(error)
        }
    },[openModal]);

    const deleteCharter = async (id: number) => {
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.delete(`${baseUrl}/barco/charter/`, { id }, token || "")
            getCharters()
        } catch (error: any) {
            openModal("Server Error", error.message, [{ text: "Ok", type: "bg-danger" }])
            console.error(error)
        }
    }

    const handleDeleteModal = (idCharter: number) => {
        openModal("Atenção!", "Deseja realmente deletar permanentemente este item do banco de dados?", [
            {
                type: "bg-danger",
                text: "Deletar",
                onClick: () => deleteCharter(idCharter)
            },
            {
                type: "bg-primary",
                text: "Cancelar",
            }
        ])
    }

    const handleEditCharter = (idCharter: number) => {
        router.push(`/forms/editar-charter/${idCharter}`)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getCharters(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [getCharters]);



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Charters
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Modelo</p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex justify-start">
                    <p className="font-medium">Status </p>
                </div>
                <div className="col-span-1 hidden items-center sm:flex justify-start">
                    <p className="font-medium">Nome </p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Tamanho</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Capacidade</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Preço</p>
                </div>
                <div className="col-span-1 flex items-center">
                    <p className="font-medium">Ações</p>
                </div>
            </div>

            {charterData && charterData.map((charter, index) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={index}
                >
                    <div className="col-span-2 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="w-[32%] rounded-md">
                                <Image
                                    style={{ objectFit: "cover" }}

                                    width={110}
                                    height={80}
                                    src={charter.imagem}
                                    alt={charter.modelo + "image"}
                                    placeholder="blur"
                                    blurDataURL={placeholder.src}
                                    priority
                                />
                            </div>
                            <p className="text-sm text-black dark:text-white">
                                {charter.modelo}
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p
                            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium
                            ${charter.ativo ? "bg-success/15 text-success" : "bg-danger/15 text-danger"}`}
                        >
                            {charter.ativo ? "Ativo" : "Desativado"}
                        </p>
                    </div>
                    <div className="col-span-1 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {charter.nome}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {charter.tamanho} pés
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{charter.passageiros} Pessoas</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-meta-3">{charter.preco.moeda + charter.preco.valor}</p>
                    </div>
                    <div className="col-span-1 flex items-center justify-start gap-6">
                        <button onClick={() => handleDeleteModal(charter.id)} className="hover:text-primary">
                            <Bin width={20} height={20}/>
                        </button>
                        <button onClick={() => handleEditCharter(charter.id)} className="hover:text-primary">
                            <Pencil width={25} height={25} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharterTable;