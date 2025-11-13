// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { firebaseConfig } from "firebaseEnv";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

// Persistent storage
if (Platform.OS === 'web') {
  auth.setPersistence(browserLocalPersistence); // Web persistence
} else {
  auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage)); // Mobile persistence
}

// Database
export const db = getFirestore(app);

// File storage
const storage = getStorage(app);
export const getStorageReference = (path) => ref(storage, path);
