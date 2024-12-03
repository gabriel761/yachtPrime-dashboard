// context/ModalContext.tsx
import { createContext, useContext, useState, useRef, ReactNode } from "react";

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

interface ModalContextProps {
    isOpenModal: boolean;
    isClosable: boolean;
    modalContent: typeof modalContentSwitch.success;
    openModal: (modalSwitch: string, body?: string, title?: string, isClosable?: boolean) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isClosableRef = useRef(false);
    const modalContentRef = useRef(modalContentSwitch.success);

    const openModal = (modalSwitch: string, body: string = "", title?: string, isClosable: boolean = false) => {
        console.log("modal open")
        const modalContent = { ...modalContentSwitch[modalSwitch as keyof typeof modalContentSwitch] };
        modalContent.body += body;
        modalContent.title += title || "";
        modalContentRef.current = modalContent;
        isClosableRef.current = isClosable;
        setIsOpenModal(true);
    };

    const closeModal = () => setIsOpenModal(false);

    return (
        <ModalContext.Provider
            value={{
                isOpenModal,
                isClosable: isClosableRef.current,
                modalContent: modalContentRef.current,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
