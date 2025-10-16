// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCH_aqzjmK_TqS4ktvJVeQhD65Bp-bJPY",
  authDomain: "issue-reporting-f2476.firebaseapp.com",
  projectId: "issue-reporting-f2476",
  storageBucket: "issue-reporting-f2476.firebasestorage.app",
  messagingSenderId: "841278652289",
  appId: "1:841278652289:web:8d8042882b4ef17248f280",
  measurementId: "G-TW2QG68GRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
