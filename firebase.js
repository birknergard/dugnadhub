// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMNUgBFliIS3La1KFsYvI3txmd3au8PzU",
  authDomain: "cross-df1fa.firebaseapp.com",
  projectId: "cross-df1fa",
  storageBucket: "cross-df1fa.firebasestorage.app",
  messagingSenderId: "980671944241",
  appId: "1:980671944241:web:3d04620ab9454682406710"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setting up services
export const auth = getAuth(app);
export const db = getFirestore(app);
