import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9aLg8dgi33Q3zLnXlTtk9T6AjjFY250M",
  authDomain: "tennis-project-ce502.firebaseapp.com",
  projectId: "tennis-project-ce502",
  storageBucket: "tennis-project-ce502.appspot.com",
  messagingSenderId: "63827663163",
  appId: "1:63827663163:web:c7306d7bd002e65a07bf1e",
  measurementId: "G-H1946QNGZV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
