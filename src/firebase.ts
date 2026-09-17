// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCH_aqzjmK_TqS4ktvJVeQhD65Bp-bJPY",
    authDomain: "issue-reporting-f2476.firebaseapp.com",
    projectId: "issue-reporting-f2476",
    storageBucket: "issue-reporting-f2476.firebasestorage.app",
    messagingSenderId: "841278652289",
    appId: "1:841278652289:web:8d8042882b4ef17248f280",
    measurementId: "G-TW2QG68GRM"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics only if supported (avoids SSR / dev errors)
isSupported().then((yes) => {
    if (yes) getAnalytics(app);
});

const auth = getAuth(app);
const db = getFirestore(app);
export { app, db, auth };
