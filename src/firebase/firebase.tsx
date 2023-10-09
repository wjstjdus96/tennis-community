// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9aLg8dgi33Q3zLnXlTtk9T6AjjFY250M",
  authDomain: "tennis-project-ce502.firebaseapp.com",
  projectId: "tennis-project-ce502",
  storageBucket: "tennis-project-ce502.appspot.com",
  messagingSenderId: "63827663163",
  appId: "1:63827663163:web:c7306d7bd002e65a07bf1e",
  measurementId: "G-H1946QNGZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
