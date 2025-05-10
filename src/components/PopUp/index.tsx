import { useModal } from "@/context/ModalContext";
import { ReactNode, useState } from "react";

type Props = {
    title: string
    children: ReactNode;
    buttons: {
        onClick: Function,
        type: "bg-primary" | "bg-danger" | "bg-warning" | "bg-success",
        text: string
    }[],
    isOpen: boolean,
    setIsOpen: (value:boolean) => void
}

const PopUp = ({ title, children, buttons, isOpen, setIsOpen }: Props) => {
    

    const closeModal = () => {
        setIsOpen(!isOpen)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-[600px] w-[90%] px-8 py-8 rounded-lg shadow-card relative">

                <button
                    onClick={() => closeModal()}
                    className="text-black text-3xl hover:text-red absolute top-1 right-4"
                >
                    &times;
                </button>


                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-title-md font-bold text-black">{title}</h2>
                </div>
                <div className="">
                    <div>
                        <>
                            {children}
                        </>
                        <div className="w-full flex justify-end gap-4">
                            {
                                buttons.map((button, index) => (
                                    <button key={index} onClick={() => { button.onClick && button.onClick()}} className={`flex w-[150px] justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 mt-8 ${button.type}`}>{button.text}</button>
                                ))
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopUp;
