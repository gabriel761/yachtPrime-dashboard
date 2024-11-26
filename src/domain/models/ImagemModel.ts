import { ImageObject } from "@/components/FileUpload/FileUpload"
import { uploadImage } from "@/lib/firebase/firebaseMethods"
import { Imagem } from "@/types/applicationTypes/Imagem"

export class ImagemModel {
    async uploadImageList(imageObjectList: ImageObject[]): Promise<Imagem[]> {
        const imageLinks = await Promise.all(
            imageObjectList.map(async (imageObject): Promise<Imagem> => {
                const imageLink = await uploadImage(imageObject.path, imageObject.filename)
                return { link: imageLink }
            })
        );
        return imageLinks
    }
}