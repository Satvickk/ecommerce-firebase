import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
const isDev = import.meta.env.DEV;
const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey && !isDev) {
  throw new Error("Missing VITE_API_KEY environment variable in production build.");
}
if (!apiKey && isDev) {
  console.warn(
    "\u26A0\uFE0F Running in LOCAL DEVELOPMENT mode without VITE_API_KEY. Using mock fallback configuration for local dev."
  );
}
const firebaseConfig = {
  apiKey: apiKey || "AIzaSyDemoApiKeyForLocalDevMode12345",
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
  projectId: import.meta.env.VITE_PROJECT_ID || "demo-app",
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "demo-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || import.meta.env.VITE_MESSAGIN_SENDER_ID || "123456789000",
  appId: import.meta.env.VITE_APP_ID || import.meta.env.VITE_API_ID || "1:123456789000:web:1234567890123456"
};
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const Firestore = getFirestore(app);
export const Storage = getStorage(app);
export const CloudFunction = getFunctions(app);
