import { ImageObject } from "@/components/FileUpload/FileUpload"
import { uploadImage } from "@/lib/firebase/firebaseMethods"
import { Imagem } from "@/types/applicationTypes/Imagem"
import { generateDateString } from "@/util/stringMetoods";

export class ImagemModel {
    async uploadImageList(imageObjectList: ImageObject[]): Promise<Imagem[]> {
        const imageLinks = await Promise.all(
            imageObjectList.map(async (imageObject): Promise<Imagem> => {
                const date = generateDateString()
                const imageLink = await uploadImage(imageObject.path, imageObject.filename + date)
                const bucketFileName = imageObject.filename + date
                return { link: imageLink, fileName: bucketFileName }
            })
        );
        return imageLinks
    }
}