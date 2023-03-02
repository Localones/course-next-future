// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_API_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage();

export {app, db, storage}