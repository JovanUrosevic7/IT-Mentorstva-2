import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi3CxVHngZbCvUT6mmqUGyXoTxWwAa_Oc",
  authDomain: "zdravstveni-karton.firebaseapp.com",
  projectId: "zdravstveni-karton",
  storageBucket: "zdravstveni-karton.firebasestorage.app",
  messagingSenderId: "176499100250",
  appId: "1:176499100250:web:1c65927ad05e9d04b8a663"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);