import { Platform } from "react-native";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseEnv";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getReactNativePersistence, browserLocalPersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Persistent storage
if (Platform.OS === 'web') {
  auth.setPersistence(browserLocalPersistence);
}
// Database
export const db = getFirestore(app);

// File storage
const storage = getStorage(app);
export const getStorageReference = (path) => ref(storage, path);
