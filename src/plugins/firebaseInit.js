// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyD_7x1EtBNggglsaM8Om5WAO-qfZrfbnc4",
  authDomain: "labfirebase-6ee92.firebaseapp.com",
  projectId: "labfirebase-6ee92",
  storageBucket: "labfirebase-6ee92.appspot.com",
  messagingSenderId: "623853113039",
  appId: "1:623853113039:web:602f80ba2120bc37daf1ba",
  measurementId: "G-0WR63DJG29",
});

const db = getFirestore(firebaseApp);
export  {db};
