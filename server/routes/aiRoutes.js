// server/routes/aiRoutes.js
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple helper to sanitize category result
function normalizeCategory(text) {
    if (!text) return "other";
    const t = text.toLowerCase();
    if (t.includes("road")) return "roads";
    if (t.includes("water")) return "water";
    if (t.includes("electric")) return "electricity";
    if (t.includes("waste")) return "waste";
    if (t.includes("health")) return "health";
    if (t.includes("education")) return "education";
    if (t.includes("security")) return "security";
    return "other";
}

// POST /api/ai-categorize
router.post("/ai-categorize", async (req, res) => {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: "Missing description" });

    const prompt = `Classify the following citizen issue into one of: roads, water, electricity, waste, health, education, security, other.
Issue:
"${description}"
Return only the single category name.`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 20,
            temperature: 0.0,
        });

        const raw = completion.choices?.[0]?.message?.content || "";
        const category = normalizeCategory(raw);
        return res.json({ category, raw: raw.trim() });
    } catch (err) {
        console.error("ai-categorize error:", err);
        return res.status(500).json({ error: "AI categorization failed" });
    }
});

// POST /api/ai-enhance-description
router.post("/ai-enhance-description", async (req, res) => {
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: "Missing description" });

    const prompt = `Rewrite the following citizen-reported issue so it is clear, concise, actionable, and suitable for reporting to local government. Keep important details and location context. Keep it professional and under ~120 words.

Original:
"${description}"`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 250,
            temperature: 0.2,
        });

        const enhanced = completion.choices?.[0]?.message?.content || "";
        return res.json({ enhanced: enhanced.trim() });
    } catch (err) {
        console.error("ai-enhance error:", err);
        return res.status(500).json({ error: "AI enhancement failed" });
    }
});

export default router;
