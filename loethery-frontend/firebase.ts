import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "loethery-rickyvadala.firebaseapp.com",
    projectId: "loethery-rickyvadala",
    storageBucket: "loethery-rickyvadala.appspot.com",
    messagingSenderId: "238461342531",
    appId: "1:238461342531:web:de00324ffe04959dedd5f6",
    measurementId: "G-Z4H0GPDMNM"
};

initializeApp(firebaseConfig);
export const db = getFirestore();
