import SliderCarousel from "../../info-page-components/SliderCarousel";
import { Imagem } from "@/types/applicationTypes/Imagem";

const ImageSlider = ({imagens}:{imagens:Imagem[]}) => {
   

    const renderItems = () => {
        const components = imagens.map((item, index) => (
            <img
                className="object-cover h-[500px] md:h-[500px] w-full"
                src={item.link}
                alt={`Slide ${index}`}
                key={index}
            />
        ))
        return components
    }

    const itemsData = renderItems()
    return (
        <div className="mb-6">
            <SliderCarousel itemsPerStep={1} autoplayInterval={5000} gap={0} itemsData={itemsData} />
        </div>
    );
}

export default ImageSlider;