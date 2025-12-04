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
import { Proprietario } from "@/types/applicationTypes/Proprietario";
import CharterTable from "../../listar-charter/list-components/CharterTable";
import BarcosTable from "./BarcosTable";



const ProprietarioTable = () => {
    const [proprietarioData, setProprietarioData] = useState<Proprietario[] | null>(null)
    const { openModal, closeModal } = useModal()
    const router = useRouter();

    const getProprietarios = useCallback( async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const result = await httpClient.get(`${baseUrl}/resources/proprietario-dashboard-list`, token)
            setProprietarioData(result)
        } catch (error: any) {
            openModal("clientError", error.message)
            console.error(error)
        }
    },[openModal]);

    const deleteProprietario = async (id: number) => {
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.delete(`${baseUrl}/resources/proprietario/`, { id }, token || "")
            getProprietarios()
        } catch (error: any) {
            openModal("Server Error", error.message, [{ text: "Ok", type: "bg-danger" }])
            console.error(error)
        }
    }
    const handleDeleteModal = (idProprietario?: number) => {
        if(!idProprietario){
            openModal("Erro", "id de proprietario indefinido")
            return
        }
        openModal("Atenção!", <BarcosTable idProprietario={idProprietario} closeMainModal={closeModal}/>, [
            {
                type: "bg-danger",
                text: "Deletar",
                onClick: () => deleteProprietario(idProprietario)
            },
            {
                type: "bg-primary",
                text: "Cancelar",
            }
        ])
    }

    const handleEditProprietario = (idProprietario?: number) => {
        if (!idProprietario) {
            openModal("Erro", "id de proprietario indefinido")
            return
        }
        router.replace(`/forms/editar-proprietario/${idProprietario}`)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getProprietarios(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [getProprietarios]);



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Proprietários
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Nome</p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex justify-start">
                    <p className="font-medium">E-mail </p>
                </div>
                <div className="col-span-2 flex items-center">
                    <p className="font-medium">Telefone</p>
                </div>
                <div>
                    <p>Ações</p>
                </div>
            </div>

            {proprietarioData && proprietarioData.map((proprietario, index) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={index}
                >
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {proprietario.nome}
                        </p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {proprietario.email}
                        </p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {proprietario.telefone} 
                        </p>
                    </div>
                   
                    <div className="col-span-1 flex items-center justify-start gap-6">
                        <button onClick={() => handleDeleteModal(proprietario.id)} className="hover:text-primary">
                            <Bin width={20} height={20} />
                        </button>
                        <button onClick={() => handleEditProprietario(proprietario.id)} className="hover:text-primary">
                            <Pencil width={25} height={25} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProprietarioTable;