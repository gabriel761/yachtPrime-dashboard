'use client'
import { useModal } from "@/context/ModalContext";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import placeholder from "@/../../public/images/placeholder/360_F_671923740_x0zOL3OIuUAnSF6sr7PuznCI5bQFKhI0.jpg"
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import Pencil from "@/../public/images/svg/pencil.svg"
import Bin from "@/../public/images/svg/bin.svg"
import { Barco } from "@/types/applicationTypes/Barco";
import { get } from "http";





const BarcosTable = ({ idProprietario,  closeMainModal}: { idProprietario: number, closeMainModal: () => void }) => {
    const [barcoData, setBarcoData] = useState<Barco[] | null>(null)
    const { openModal } = useModal()
    const router = useRouter();

    const getBarcos = useCallback( async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const result = await httpClient.get(`${baseUrl}/resources/proprietario/boats/${idProprietario}`, token)
            setBarcoData(result)
        } catch (error: any) {
            openModal("clientError", error.message)
            console.error(error)
        }
    },[idProprietario, openModal]);

    const deleteBarco = async (barco: Barco) => {
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.delete(`${baseUrl}/barco/${barco.tipo}/`, {id: barco.codigo }, token || "")
            getBarcos()
        } catch (error: any) {
            openModal("Server Error", error.message, [{ text: "Ok", type: "bg-danger" }])
            console.error(error)
        }
    }

    // const handleDeleteModal = (barco: Barco) => {
    //     closeMainModal()
    //     openModal("Atenção!", "Deseja realmente deletar permanentemente este item do banco de dados?", [
    //         {
    //             type: "bg-danger",
    //             text: "Deletar",
    //             onClick: () => deleteBarco(barco)
    //         },
    //         {
    //             type: "bg-primary",
    //             text: "Cancelar",
    //         }
    //     ])
    // }

    const handleEditBarco = (barco: Barco) => {
        closeMainModal()
        router.push(`/forms/editar-${barco.tipo}/${barco.codigo}`)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getBarcos(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [getBarcos]);



    return (
        <div>
            <p>Os barcos listados abaixo estão diretamente relacionados ao proprietário que você está tentando deletar. Tem certeza que deseja deletar <b>TODOS</b> os dados de todos os barcos listados? <b>Não há nenhuma forma de reverter esta ação.</b></p>
            <br/>
            <p><b>Sugestão:</b> Para manter os barcos listados, você pode clicar no ícone de edição e trocar os proprietários de cada barco.</p>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-y-auto max-h-[600px] mt-4">
                <div className="px-4 py-6 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Barcos
                    </h4>
                </div>

                <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
                    <div className="col-span-5 flex items-center">
                        <p className="font-medium">Modelo</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Ações</p>
                    </div>
                </div>

                {barcoData && barcoData.map((barco, index) => (
                    <div
                        className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5"
                        key={index}
                    >
                        <div className="col-span-5 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <div className="w-[32%] rounded-md">
                                    <Image
                                        style={{ objectFit: "cover" }}

                                        width={110}
                                        height={80}
                                        src={barco.imagem}
                                        alt={barco.modelo + "image"}
                                        placeholder="blur"
                                        blurDataURL={placeholder.src}
                                        priority
                                    />
                                </div>
                                <p className="text-sm text-black dark:text-white">
                                    {barco.modelo}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-start gap-6">
                            {/* <button onClick={() => handleDeleteModal(barco)} className="hover:text-primary">
                                <Bin width={20} height={20} />
                            </button> */}
                            <button onClick={() => handleEditBarco(barco)} className="hover:text-primary">
                                <Pencil width={25} height={25} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarcosTable;