'use client'
import { useModal } from "@/context/ModalContext";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { BarcoSeminovoList } from "@/types/applicationTypes/seminovo/BarcoSeminovo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import placeholder from "@/../../public/images/placeholder/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";




const SeminovoTable = () => {
    const [seminovoData, setSeminovoData] = useState<BarcoSeminovoList[] | null>(null)
    const { openModal } = useModal()
    const router = useRouter();

    const getSeminovos = async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const result = await httpClient.get(`${baseUrl}/barco/seminovo/list/dashboard`, token)
            setSeminovoData(result)
        } catch (error: any) {
            openModal("clientError", error.message)
            console.error(error)
        }
    }

    const deleteSeminovo = async (id: number) => {
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.delete(`${baseUrl}/barco/seminovo/`, { id }, token || "")
            getSeminovos()
        } catch (error: any) {
            openModal("Server Error", error.message, [{text: "Ok", type:"bg-danger"}])
            console.error(error)
        }
    }

    const handleDeleteModal = (idSeminovo: number) => {
        openModal("Atenção!", "Deseja realmente deletar permanentemente este item do banco de dados?", [
            {
                type: "bg-danger",
                text: "Deletar",
                onClick: () => deleteSeminovo(idSeminovo)   
            },
            {
                type: "bg-primary",
                text: "Cancelar",
            }
        ])
    }

    const handleEditSeminovo = (idSeminovo: number) => {
        router.push(`/forms/editar-seminovo/${idSeminovo}`)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getSeminovos(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, []);
        
    
    
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
                                <Image
                                    style={{objectFit: "cover"}}
                                    
                                    width={110}
                                    height={80}
                                    src={seminovo.imagem}
                                    alt={seminovo.modelo + "image"}
                                    placeholder="blur"
                                    blurDataURL={placeholder.src}
                                    priority
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
                    <div className="col-span-1 flex items-center justify-start gap-6">
                        <button onClick={() => handleDeleteModal(seminovo.id)} className="hover:text-primary">
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                    fill=""
                                />
                                <path
                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                    fill=""
                                />
                                <path
                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                    fill=""
                                />
                                <path
                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                    fill=""
                                />
                            </svg>
                        </button>
                        <button onClick={() => handleEditSeminovo(seminovo.id)} className="hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="18" height="18">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>

                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SeminovoTable;