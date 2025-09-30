// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAaBJVK3jUmK57uAwGe_W6rJaeP9Ej3fVw",
  authDomain: "nombres-dev.firebaseapp.com",
  projectId: "nombres-dev",
  storageBucket: "nombres-dev.firebasestorage.app",
  messagingSenderId: "134708088125",
  appId: "1:134708088125:web:19dd1e0295d89613184954"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);