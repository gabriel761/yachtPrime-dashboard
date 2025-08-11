import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (blobUrl: string, filename: string, pasta: string) => {
    try {
        const blob = await fetchBlobFromUrl(blobUrl)
        const storageRef = ref(storage, pasta + "/" + filename)
        const metadata = await uploadBytes(storageRef, blob)
        const url = await getDownloadURL(metadata.ref)
        return url
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const deleteImage = async (filename: string, pasta: string) => {
    try {
        const storageRef = ref(storage, pasta + "/" + filename)
        await deleteObject(storageRef)
    } catch (error) {
        throw error
    }
}


const fetchBlobFromUrl = async (blobUrl: string) => {
    const response = await fetch(blobUrl); // Fazer o fetch para obter o conteúdo binário
    const blob = await response.blob(); // Converter a resposta para Blob
    return blob;
};

