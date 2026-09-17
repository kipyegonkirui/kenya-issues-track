// src/lib/user.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export async function createUserProfile(uid: string, data: { displayName?: string; email?: string }) {
    const userRef = doc(db, "users", uid);
    await setDoc(
        userRef,
        {
            displayName: data.displayName || null,
            email: data.email || null,
            createdAt: serverTimestamp(),
        },
        { merge: true }
    );
}
