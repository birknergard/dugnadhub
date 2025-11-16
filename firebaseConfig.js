import { Platform } from "react-native";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseEnv";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getReactNativePersistence, browserLocalPersistence, initializeAuth, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication, if i dont do it this way android wont work :)
export const auth = (Platform.OS === 'android') ? initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}) : getAuth(app);

// Persistent storage
if (Platform.OS === 'web') {
  auth.setPersistence(browserLocalPersistence);
}
// Database
export const db = getFirestore(app);

// File storage
const storage = getStorage(app);
export const getStorageReference = (path) => ref(storage, path);
