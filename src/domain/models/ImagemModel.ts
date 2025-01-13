import { ImageObject } from "@/components/FileUpload/FileUpload"
import baseUrl from "@/infra/back-end-connection";
import httpClient from "@/infra/httpClient";
import { auth } from "@/lib/firebase/firebaseConfig";
import { deleteImage, uploadImage } from "@/lib/firebase/firebaseMethods"
import { Imagem } from "@/types/applicationTypes/Imagem"
import { generateDateString } from "@/util/stringMetoods";
import { error } from "console";

export class ImagemModel {
    async prepareForUploadImageList(imageObjectList: ImageObject[]): Promise<Imagem[]> {
        const promises = imageObjectList.map((imageObject, index) =>{
            if (!imageObject.link.includes("firebase")) {
              return  uploadImageList(imageObject, index)
            }else{
                return {...imageObject, index}
            }
        }
        );
        const results = await Promise.all(promises);
        return results.sort((a, b) => a.index - b.index).map(({ index, ...image }) => image);
    }

    async getImagesFromDbByIdSeminovo(idSeminovo: number): Promise<Imagem[]> {
        const token = await auth.currentUser?.getIdToken()
        const images = await httpClient.get(`${baseUrl}/resources/seminovo/imagens-seminovo/${idSeminovo}`, token )
        return images
    }

    extractImagesToDeleteFromFirebase(imagensForm: Imagem[], imagensDb: Imagem[]) {
        const imagesToDelete = imagensDb.filter(
            (imagemDb) =>
                !imagensForm.some((imagemForm) => imagemForm.fileName === imagemDb.fileName)
        );
        return imagesToDelete
    }

    async deleteImageList(imageList: Imagem[]) {
        Promise.all(
            imageList.map((imagem) => {
                if(imagem.link.includes("firebase")){
                    deleteImage(imagem.fileName)
                }
            })
        )
    }
}

const uploadImageList = async (imageObject: ImageObject, index: number): Promise<{ index: number; link: string; fileName: string }> => {
    const date = generateDateString();
    const imageLink = await uploadImage(imageObject.link, imageObject.fileName + date);
    const bucketFileName = imageObject.fileName + date;
    return { index, link: imageLink, fileName: bucketFileName };

}

