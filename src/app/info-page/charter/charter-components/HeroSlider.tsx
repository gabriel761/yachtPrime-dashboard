
import { Imagem } from "@/types/applicationTypes/Imagem";
import SliderCarousel from "../../info-page-components/SliderCarousel";

const HeroSlider = ({imagens}:{imagens:Imagem[]}) => {
 

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
        <SliderCarousel itemsData={itemsData} autoplayInterval={500000} gap={0} itemsPerStep={1}/>
     );
}
 
export default HeroSlider;