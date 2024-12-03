import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (blobUrl:string, filename:string) => {
    const blob = await fetchBlobFromUrl(blobUrl)
    const storageRef = ref(storage, "seminovos/" + filename)
    const metadata = await uploadBytes(storageRef, blob)
    const url = await getDownloadURL(metadata.ref)
    return url
}


const fetchBlobFromUrl = async (blobUrl:string) => {
    const response = await fetch(blobUrl); // Fazer o fetch para obter o conteúdo binário
    const blob = await response.blob(); // Converter a resposta para Blob
    return blob;
};