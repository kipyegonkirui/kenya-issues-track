// src/lib/issues.ts
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { getCategoryConfig } from "@/lib/departments";

export interface NewIssueInput {
    title: string;
    description: string;
    category: string;
    county: string;      // display name, for public UI
    countyId: string;    // stable id, used for county officer/leader scoping
    constituency: string;
    constituencyId: string; // stable id, used to route to the MP
    ward: string;        // display name
    wardId: string;      // stable id, used for ward officer/leader scoping
    location?: string;
    reportedBy: string;  // display name shown publicly on the issue
    reporterEmail: string;
    userId: string;
    // Department the UI already resolved and showed the citizen (verified
    // against the live Firestore departments list). If omitted, falls back
    // to the static category config — but callers that already did the live
    // check (like ReportIssue.tsx) should pass it through so what's stored
    // always matches what the citizen was told.
    department?: string | null;
}

export interface StatusHistoryEntry {
    status: string;
    note: string;
    actorUid: string;
    actorName: string;
    actorRole: string;
    at: Timestamp;
}

export async function addIssue(data: NewIssueInput) {
    const { department: configuredDepartment, slaDays } = getCategoryConfig(data.category);
    const department = data.department || configuredDepartment;
    // Firestore's serverTimestamp() sentinel only resolves at the top level of
    // a document — inside an array element (like statusHistory below) it
    // silently stores null instead. Use a client Timestamp there instead.
    const now = Timestamp.now();
    const slaDeadline = Timestamp.fromMillis(now.toMillis() + slaDays * 24 * 60 * 60 * 1000);

    const initialHistory: StatusHistoryEntry = {
        status: "pending",
        note: "Issue reported by citizen.",
        actorUid: data.userId,
        actorName: data.reportedBy,
        actorRole: "citizen",
        at: now,
    };

    const coll = collection(db, "issues");
    const docRef = await addDoc(coll, {
        ...data,
        department,
        status: "pending",
        assignedTo: null,
        escalationLevel: 0,
        slaDeadline,
        statusHistory: [initialHistory],
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
