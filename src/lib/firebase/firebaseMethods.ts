import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (blob:any, filename:string) => {
    const storageRef = ref(storage, "perfilFornecedor/" + filename)
    const metadata = await uploadBytes(storageRef, blob)
    const url = await getDownloadURL(metadata.ref)
    return url
}