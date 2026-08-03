import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALkwCITr5K_hGx3n8nIKsOGAarZN5sIp8",
  authDomain: "achat-9852c.firebaseapp.com",
  projectId: "achat-9852c",
  storageBucket: "achat-9852c.firebasestorage.app",
  messagingSenderId: "1077125372896",
  appId: "1:1077125372896:web:7ba6549aa9b942754da985",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);