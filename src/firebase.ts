// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-ecom-2024-25101.firebaseapp.com",
  projectId: "mern-ecom-2024-25101",
  storageBucket: "mern-ecom-2024-25101.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSGAE_SENDER_ID,
  appId: "1:472933581828:web:3d90c9f778378921f9a151",
  measurementId: "G-TJMC0BLZY8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app)