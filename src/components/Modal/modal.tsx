import React, { MouseEventHandler, ReactNode } from "react";

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose?: MouseEventHandler<HTMLButtonElement>, title: string, children: ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-[600px] w-[90%] px-8 py-8 rounded-lg shadow-card relative">
                {
                    !!onClose ? (
                        <button
                            onClick={onClose}
                            className="text-black text-3xl hover:text-red absolute top-1 right-4"
                        >
                            &times;
                        </button>
                    ): null
                }
                
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-title-md font-bold text-black">{title}</h2>
                </div>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
