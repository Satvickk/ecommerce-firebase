import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// If the Project is created using Vite
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGIN_SENDER_ID,
    appId: import.meta.env.VITE_API_ID
};

const app = initializeApp(firebaseConfig);

// firebase authentication
export const Auth = getAuth(app)

// firebase database
export const Firestore = getFirestore(app)

// firebase storage bucket
export const Storage = getStorage(app)