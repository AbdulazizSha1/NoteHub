import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getApps, getApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDbPlj4TaR_eyVP9hjyUfsrELpE2twhlz0",
  authDomain: "notehub-586df.firebaseapp.com",
  projectId: "notehub-586df",
  storageBucket: "notehub-586df.appspot.com",
  messagingSenderId: "346595911250",
  appId: "1:346595911250:web:27fbd9a7043a4fc476218b"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); 
