import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Firebase configuration (YOUR REAL KEYS – OK TO EXPOSE)
const firebaseConfig = {
  apiKey: "AIzaSyCNgchDbt5cGmfI6LZePNsxBn43qBRmfqM",
  authDomain: "carsell-1da4b.firebaseapp.com",
  projectId: "carsell-1da4b",
  storageBucket: "carsell-1da4b.appspot.com",
  messagingSenderId: "144647072465",
  appId: "1:144647072465:web:341945f87c793cc76333f0",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE (VERY IMPORTANT)
export const auth = getAuth(app);
export const db = getFirestore(app);
