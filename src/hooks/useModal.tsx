// hooks/useModal.tsx
import { useState, useRef } from "react";

const modalContentSwitch = {
    success: {
        title: "Sucesso!",
        body: "",
        buttonText: "Ok",
        buttonColor: "bg-primary",
    },
    clientError: {
        title: "Erro",
        body: "Erro de cliente: ",
        buttonText: "Ok",
        buttonColor: "bg-danger",
    },
    serverError: {
        title: "Erro",
        body: "Erro de servidor: ",
        buttonText: "Ok",
        buttonColor: "bg-danger",
    },
};

export const useModal = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isClosableRef = useRef(false)
    const modalContentRef = useRef(modalContentSwitch.success);

    const openModal = (modalSwitch: string, body: string = "", title?: string, isClosable: boolean = false) => {
        const modalContent = { ...modalContentSwitch[modalSwitch as keyof typeof modalContentSwitch] };
        modalContent.body += body;
        modalContent.title += title
        modalContentRef.current = modalContent;
        isClosableRef.current = isClosable 
        setIsOpenModal(true);
    };

    const closeModal = () => setIsOpenModal(false);

    return {
        isClosable: isClosableRef.current,
        isOpenModal,
        modalContent: modalContentRef.current,
        openModal,
        closeModal,
    };
};
