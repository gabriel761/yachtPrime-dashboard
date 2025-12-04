// context/ModalContext.tsx
import { createContext, useContext, useState, useRef, ReactNode, MouseEventHandler } from "react";

const buttonTypeSwitch = {
    primary: "bg-primary",
    danger: "bg-danger",
    warning: "bg-warning",
    success: "bg-success"
};

interface ModalContextProps {
    isOpenModal: boolean;
    isClosable: boolean;
    modalContent: ModalContent | null
    openModal: (title?: string, body?: ReactNode, buttons?: ModalButton[]) => void;
    closeModal: () => void;
}

type ModalButton = {
    text: string,
    type: "bg-primary" | "bg-danger" | "bg-warning" | "bg-success",
    onClick?: Function
}

type ModalContent = {
    title: string,
    body:  ReactNode,
    buttons: ModalButton[]
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const isClosableRef = useRef(false)
    const modalContentRef = useRef<ModalContent | null>(null);

    const openModal = (title: string = "",body:  ReactNode  = "", buttons: ModalButton[] = []) => {
        const modalContent = { title, body, buttons };
        isClosableRef.current = buttons.length == 0 
        modalContentRef.current = modalContent;
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
