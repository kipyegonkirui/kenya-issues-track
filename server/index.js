// server/index.js
// "dotenv/config" must be the FIRST import: ES module imports resolve
// before any other code in this file runs, and aiRoutes.js reads
// process.env.OPENAI_API_KEY while it's being imported (to build the
// OpenAI client) — so the env vars have to be loaded before that
// import happens, not after it via a later dotenv.config() call.
import "dotenv/config";
import express from "express";
import cors from "cors";
import cron from "node-cron";
import aiRoutes from "./routes/aiRoutes.js";
import { runEscalationCheck } from "./jobs/escalation.js";

const app = express();
app.use(cors());
app.use(express.json());

// mount the AI routes
app.use("/api", aiRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AI server listening on port ${port}`));

// Automatic accountability escalation: check every hour for issues that have
// gone past their SLA deadline. Runs in-process here rather than as a separate
// Cloud Function so it works with the existing Node hosting instead of
// requiring Firebase's paid Blaze plan for Cloud Scheduler.
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    cron.schedule("0 * * * *", () => {
        runEscalationCheck().catch((err) =>
            console.error("[escalation] Run failed:", err)
        );
    });
    // Also run once at startup so overdue issues aren't waiting up to an hour
    // after a deploy/restart before the first check happens.
    runEscalationCheck().catch((err) => console.error("[escalation] Startup run failed:", err));
    console.log("[escalation] Scheduled job registered (hourly).");
} else {
    console.warn(
        "[escalation] GOOGLE_APPLICATION_CREDENTIALS not set — automatic escalation is disabled. " +
        "See server/firebaseAdmin.js for setup instructions."
    );
}
