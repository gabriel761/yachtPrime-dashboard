import React, { useState } from "react";

type Props = {
    images: string[],
    className?: string
};

const Lightbox = ({ images, className }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const showNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const showPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={`${className}`}>
            {/* Galeria de Imagens */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="cursor-pointer"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-[150px] h-[120px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </div>

            {/* Modal Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                    onClick={closeLightbox}
                >
                    {/* Botão para a foto anterior */}
                    {images.length > 1 && (
                        <button
                            className="absolute left-0 text-white text-4xl px-4 py-2 focus:outline-none z-20"
                            onClick={showPrev}
                        >
                            &#10094;
                        </button>
                    )}

                    <div className="relative flex items-center z-10">
                        <img
                            src={images[currentIndex]}
                            alt="Lightbox"
                            className="max-w-full max-h-screen object-contain"
                        />
                    </div>

                    {/* Botão para a próxima foto */}
                    {images.length > 1 && (
                        <button
                            className="absolute right-0 text-white text-4xl px-4 py-2 focus:outline-none z-20"
                            onClick={showNext}
                        >
                            &#10095;
                        </button>
                    )}

                    {/* Botão de fechar */}
                    <button
                        className="absolute top-4 right-4 text-white text-3xl font-bold z-20"
                        onClick={closeLightbox}
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lightbox;
