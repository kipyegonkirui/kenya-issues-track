// server/firebaseAdmin.js
// Trusted server-side Firestore access. Requires a service account key:
//   1. Firebase Console → Project Settings → Service Accounts → Generate new private key
//   2. Save the downloaded JSON somewhere OUTSIDE the repo (or gitignore it)
//   3. Set GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/key.json in server/.env
//
// This bypasses Firestore security rules entirely, which is why it only ever
// runs on the trusted server, never sent to the client.
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";

function loadServiceAccount() {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!keyPath) {
        throw new Error(
            "GOOGLE_APPLICATION_CREDENTIALS is not set in server/.env — the escalation job " +
            "needs a Firebase service account key to read/write Firestore. See the comment " +
            "at the top of firebaseAdmin.js for how to get one."
        );
    }
    return JSON.parse(fs.readFileSync(keyPath, "utf8"));
}

if (!getApps().length) {
    initializeApp({
        credential: cert(loadServiceAccount()),
    });
}

export const db = getFirestore();
