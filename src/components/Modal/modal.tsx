import { useModal } from "@/context/ModalContext";

const Modal = () => {

    const {
        isClosable,
        isOpenModal,
        modalContent,
        closeModal,
    } = useModal()

    if (!isOpenModal) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-[600px] w-[90%] px-8 py-8 rounded-lg shadow-card relative">
                {
                    !!isClosable ? (
                        <button
                            onClick={() => closeModal()}
                            className="text-black text-3xl hover:text-red absolute top-1 right-4"
                        >
                            &times;
                        </button>
                    ): null
                }
                
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-title-md font-bold text-black">{modalContent.title}</h2>
                </div>
                <div className="">
                    <div>
                        <p className="text-body">
                            {modalContent.body}
                        </p>
                        <div className="w-full flex justify-end">
                            <button onClick={() => closeModal()} className={`flex w-[200px] justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 mt-8 ${modalContent.buttonColor}`}>{modalContent.buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
