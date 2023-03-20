import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBGmpfPzD6sfz8snRcmstxDl1Ht1q1ze24",
  authDomain: "sample-5b49b.firebaseapp.com",
  projectId: "sample-5b49b",
  storageBucket: "sample-5b49b.appspot.com",
  messagingSenderId: "370625413125",
  appId: "1:370625413125:web:7fafd01f667ba1c0d79c6c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
