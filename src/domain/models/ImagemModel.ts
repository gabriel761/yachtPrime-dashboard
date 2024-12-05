import { ImageObject } from "@/components/FileUpload/FileUpload"
import { uploadImage } from "@/lib/firebase/firebaseMethods"
import { Imagem } from "@/types/applicationTypes/Imagem"
import { generateDateString } from "@/util/stringMetoods";

export class ImagemModel {
    async uploadImageList(imageObjectList: ImageObject[]): Promise<Imagem[]> {
        
        const promises = imageObjectList.map((imageObject, index) =>
            this.processImage(imageObject, index)
        );


        const results = await Promise.all(promises);
        return results.sort((a, b) => a.index - b.index).map(({ index, ...image }) => image);
    }

    private async processImage(imageObject: ImageObject, index: number): Promise<{ index: number; link: string; fileName: string }> {
        const date = generateDateString();
        const imageLink = await uploadImage(imageObject.path, imageObject.filename + date);
        const bucketFileName = imageObject.filename + date;
        return { index, link: imageLink, fileName: bucketFileName };
    }
}
