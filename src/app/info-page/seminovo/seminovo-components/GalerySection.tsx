import { Imagem } from "@/types/applicationTypes/Imagem";
import Lightbox from "./LightboxGalery";

type props = {
    className: string,
    images?: Imagem[]
}
const GalerySection = ({className, images}: props) => {
    if(!images) return null
    const imageList = images.map((image) => {
        return image.link
    })
    return ( 
        <Lightbox className={`${className}`} images={imageList}/>
     );
}
 
export default GalerySection;