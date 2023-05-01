import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDniwOP-yyDPNz5GpHl0x3Q68X4AF9iDGg",
  authDomain: "webapp-f406f.firebaseapp.com",
  projectId: "webapp-f406f",
  storageBucket: "webapp-f406f.appspot.com",
  messagingSenderId: "498404921616",
  appId: "1:498404921616:web:9f0ef66c4df1ad92b91595"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
