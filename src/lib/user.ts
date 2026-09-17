import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Saves user profile data to Firestore under users/{uid}.
 */
export async function createUserProfile(
    uid: string,
    data: { displayName?: string; email?: string }
) {
    const userRef = doc(db, "users", uid);
    await setDoc(
        userRef,
        {
            ...data,
            createdAt: serverTimestamp(),
        },
        { merge: true }
    );
}
