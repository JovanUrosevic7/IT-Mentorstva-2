// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1jbUa86-iv-rXE4HgjoKt-SGbG9-gVFM",
  authDomain: "itmenstorstva-react-nextjs.firebaseapp.com",
  projectId: "itmenstorstva-react-nextjs",
  storageBucket: "itmenstorstva-react-nextjs.firebasestorage.app",
  messagingSenderId: "621836671160",
  appId: "1:621836671160:web:0a7337180d789d14f17c4d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app