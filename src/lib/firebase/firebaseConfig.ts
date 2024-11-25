// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBr39aUYHqKuO3IoRcMc8GTaXyXyAX8xlM",
    authDomain: "yachtprime-bd970.firebaseapp.com",
    projectId: "yachtprime-bd970",
    storageBucket: "yachtprime-bd970.firebasestorage.app",
    messagingSenderId: "617316904060",
    appId: "1:617316904060:web:1c246e414357d23f3fadf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);