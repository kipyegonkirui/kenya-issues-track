// server/jobs/escalation.js
//
// Runs on a schedule (see index.js). For every issue that's still open past
// its slaDeadline, this bumps escalationLevel:
//   level 1 ("Overdue")   — deadline has passed
//   level 2 ("Escalated") — deadline passed by MORE than the original
//                           response window again (i.e. ~2x the SLA, ignored
//                           through a second full window, not just late once)
//
// It only ever increases escalationLevel here — bringing it back to 0 happens
// when a ward officer actually acts on the issue (see WardDashboard.tsx),
// which is the whole point: escalation only clears via a real response, not
// by silently timing out.
import { db } from "../firebaseAdmin.js";
import { Timestamp, FieldValue } from "firebase-admin/firestore";

async function findRecipients({ wardId, department, countyId }) {
    const recipients = [];

    const wardOfficers = await db
        .collection("users")
        .where("role", "==", "ward_officer")
        .where("ward", "==", wardId)
        .where("department", "==", department)
        .get();
    wardOfficers.forEach((d) => d.data().email && recipients.push(d.data().email));

    const countyAdmins = await db
        .collection("users")
        .where("role", "==", "county_admin")
        .where("county", "==", countyId)
        .get();
    countyAdmins.forEach((d) => {
        const data = d.data();
        // A county_admin with no department set oversees the whole county.
        if (!data.department || data.department === department) {
            if (data.email) recipients.push(data.email);
        }
    });

    return recipients;
}

async function notify(userEmail, issueId, level, title) {
    const notifRef = db.collection("notifications").doc(`${issueId}-escalation-${level}`);
    await notifRef.set(
        {
            userId: userEmail,
            issueId,
            title: level >= 2 ? "Issue Escalated" : "Issue Overdue",
            message:
                level >= 2
                    ? `🔴 "${title}" has gone unaddressed well past its deadline and has been escalated.`
                    : `🟠 "${title}" has passed its response deadline and needs attention.`,
            read: false,
            timestamp: FieldValue.serverTimestamp(),
        },
        { merge: true }
    );
}

export async function runEscalationCheck() {
    const now = Timestamp.now();
    console.log(`[escalation] Checking for overdue issues at ${now.toDate().toISOString()}`);

    const snapshot = await db
        .collection("issues")
        .where("status", "in", ["pending", "in-progress"])
        .where("slaDeadline", "<=", now)
        .get();

    if (snapshot.empty) {
        console.log("[escalation] Nothing overdue.");
        return;
    }

    let escalatedCount = 0;

    for (const docSnap of snapshot.docs) {
        const issue = docSnap.data();
        const currentLevel = issue.escalationLevel || 0;

        const createdAtMs = issue.createdAt?.toMillis?.() ?? now.toMillis();
        const deadlineMs = issue.slaDeadline.toMillis();
        const originalWindowMs = Math.max(deadlineMs - createdAtMs, 1);
        const overdueMs = now.toMillis() - deadlineMs;

        const targetLevel = overdueMs >= originalWindowMs ? 2 : 1;

        if (targetLevel <= currentLevel) continue; // never de-escalate here

        await docSnap.ref.update({ escalationLevel: targetLevel });
        escalatedCount += 1;

        try {
            const recipients = await findRecipients({
                wardId: issue.wardId,
                department: issue.department,
                countyId: issue.countyId,
            });
            await Promise.all(recipients.map((email) => notify(email, docSnap.id, targetLevel, issue.title)));
        } catch (err) {
            console.error(`[escalation] Failed to notify for issue ${docSnap.id}:`, err.message);
        }

        console.log(`[escalation] Issue ${docSnap.id} ("${issue.title}") escalated to level ${targetLevel}`);
    }

    console.log(`[escalation] Done. ${escalatedCount} issue(s) escalated this run.`);
}
