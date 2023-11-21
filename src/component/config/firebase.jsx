// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAMUfywAkyiEBLfLPIcYlaW02D_J1rozII",
  authDomain: "fir-test-b925d.firebaseapp.com",
  projectId: "fir-test-b925d",
  storageBucket: "fir-test-b925d.appspot.com",
  messagingSenderId: "1025962826485",
  appId: "1:1025962826485:web:dbbcd72923b4e5c410c3bc",
  measurementId: "G-PGLJDMLCL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);