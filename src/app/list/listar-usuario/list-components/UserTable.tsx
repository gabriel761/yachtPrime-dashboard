'use client'
import { useModal } from "@/context/ModalContext";
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebaseConfig";
import { onIdTokenChanged } from "firebase/auth";
import { User } from "@/types/applicationTypes/User";
import Pencil from "@/../public/images/svg/pencil.svg"
import Bin from "@/../public/images/svg/bin.svg" 
import { get } from "http";

const UserTable = () => {
    const [userData, setUserData] = useState<User[] | null>(null)
    const { openModal } = useModal()
    const router = useRouter();

    const getUsers = useCallback( async () => {
        try {
            const token = await auth.currentUser?.getIdToken()
            const result = await httpClient.get(`${baseUrl}/user/all-users`, token)
            setUserData(result)
        } catch (error: any) {
            openModal("clientError", error.message)
            console.error(error)
        }
    },[openModal]);

    const deleteUser = async (id: number) => {
        try {
            const token = await auth.currentUser?.getIdToken()
            await httpClient.delete(`${baseUrl}/user/user`, { id }, token || "")
            getUsers()
        } catch (error: any) {
            openModal("Server Error", error.message, [{ text: "Ok", type: "bg-danger" }])
            console.error(error)
        }
    }

    const handleDeleteModal = (idUser: number) => {
        openModal("Atenção!", "Deseja realmente deletar permanentemente este item do banco de dados?", [
            {
                type: "bg-danger",
                text: "Deletar",
                onClick: () => deleteUser(idUser)
            },
            {
                type: "bg-primary",
                text: "Cancelar",
            }
        ])
    }

    const handleEditUser = (idUser: number) => {
        router.push(`/forms/editar-usuario/${idUser}`)
    }

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                await getUsers(); // Só chama o método quando o token é garantido
            } else {
                console.warn("Usuário não autenticado.");
            }
        });

        return () => unsubscribe(); // Remove o listener ao desmontar o componente
    }, [getUsers]);



    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-4 py-6 md:px-6 xl:px-7.5">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Seminovos
                </h4>
            </div>

            <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-3 flex items-center">
                    <p className="font-medium">Email/Login</p>
                </div>
                <div className="col-span-3 hidden items-center sm:flex justify-start">
                    <p className="font-medium">Tipo de usuário </p>
                </div>
                <div className="col-span-2 hidden items-center sm:flex justify-start">
                    <p className="font-medium">Ações </p>
                </div>
            </div>

            {userData && userData.map((user, index) => (
                <div
                    className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    key={index}
                >

                    <div className="col-span-3 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                            {user.email}
                        </p>
                    </div>
                    <div className="col-span-3 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                            {user.userType}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center justify-start gap-6">
                        <button onClick={() => handleDeleteModal(user.id)} className="hover:text-primary">
                            <Bin width={20} height={20}/>
                        </button>
                        <button onClick={() => handleEditUser(user.id)} className="hover:text-primary">
                            <Pencil width={25} height={25}/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserTable;