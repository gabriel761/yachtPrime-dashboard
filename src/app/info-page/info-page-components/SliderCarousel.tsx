'use client'
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { GoDot, GoDotFill } from "react-icons/go";
import React, { useState, useEffect, useRef, useCallback, ReactNode } from "react";

type ItemData = {
    url: string;
    title: string;
};

type Props<T> = {
    itemsPerStep: number;
    gap?: number;
    autoplayInterval?: number;
    itemsData: JSX.Element[];
};

export default function SliderCarousel<T>({
    itemsPerStep = 3,
    gap = 20,
    autoplayInterval = 5000,
    itemsData,
    
}: Props<T>) {

    const [sliderIndex, setSliderIndex] = useState(0);
    const itemWidthPercentage = (100 / itemsPerStep).toFixed(3);
    const widthObj = { width: `calc(${itemWidthPercentage}% - ${gap}px)` };
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderSteps = Math.ceil(itemsData.length / itemsPerStep);

    const nextSlide = useCallback(() => {
        setSliderIndex((prev) => (prev + 1) % sliderSteps);
    }, [sliderSteps]);

    const prevSlide = useCallback(() => {
        setSliderIndex((prev) => (prev - 1 + sliderSteps) % sliderSteps);
    }, [sliderSteps]);

    const scrollToSlide = (index: number) => {
        setSliderIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, autoplayInterval);

        return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, [nextSlide]);

    useEffect(() => {
        const newScrollPosition = sliderIndex * (sliderRef.current?.getBoundingClientRect().width || 0) - gap / 2;
        sliderRef.current?.scrollTo({
            left: newScrollPosition,
            behavior: "smooth"
        });
    }, [sliderIndex]);

    const dotsArray = Array(sliderSteps).fill(null).map((_, i) => (
        <div key={i} onClick={() => scrollToSlide(i)} className="cursor-pointer">
            {sliderIndex === i ? <GoDotFill color="#3C50E0" /> : <GoDotFill />}
        </div>
    ));

    return (
        <>
            <div className="relative px-[0%] pb-[10%] md:px-[5%] md:pb-[5%] ">
                <div className="absolute top-[50%] left-[0] transform translate-y-[-50%] cursor-pointer z-10" onClick={prevSlide}>
                    <IoMdArrowDropleft color="#3C50E0" size={60} />
                </div>
                <div ref={sliderRef} style={{ gap: gap }} className="flex overflow-hidden z-0">
                    {itemsData.map((item, index) => (
                        <div key={index} style={widthObj} className="flex-none">
                           {itemsData[index]}
                        </div>
                    ))}
                </div>
                <div className="absolute top-[50%] right-[0] transform translate-y-[-50%] cursor-pointer" onClick={nextSlide}>
                    <IoMdArrowDropright color="#3C50E0" size={60} />
                </div>
                <div className="absolute bottom-[20px] left-[50%] transform translate-x-[-50%] flex gap-2">
                    {dotsArray}
                </div>
            </div>
        </>
    );
}