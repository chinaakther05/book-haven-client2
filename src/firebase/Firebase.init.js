// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOO-VgCmQ1lIgctA0_4_4f6Qc4u5YmQe4",
  authDomain: "book-haven-1a9da.firebaseapp.com",
  projectId: "book-haven-1a9da",
  storageBucket: "book-haven-1a9da.firebasestorage.app",
  messagingSenderId: "285184611059",
  appId: "1:285184611059:web:8ae249fbd1e5084e6b1d86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);