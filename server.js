import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai"; // or use fetch if you prefer

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Put your key in .env
});

// === AI Categorize Route ===
app.post("/api/ai-categorize", async (req, res) => {
    try {
        const { description } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that categorizes issues into: Infrastructure, Security, Environment, Health, or Education.",
                },
                {
                    role: "user",
                    content: `Categorize this issue: ${description}`,
                },
            ],
        });

        const category = response.choices[0].message.content.trim();
        res.json({ category });
    } catch (error) {
        console.error("AI categorize failed:", error);
        res.status(500).json({ error: "AI categorize failed" });
    }
});

// === AI Enhance Description Route ===
app.post("/api/ai-enhance-description", async (req, res) => {
    try {
        const { description } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an assistant that rewrites issue descriptions to be clear and professional.",
                },
                {
                    role: "user",
                    content: `Rewrite and improve this issue description: ${description}`,
                },
            ],
        });

        const enhanced = response.choices[0].message.content.trim();
        res.json({ enhanced });
    } catch (error) {
        console.error("AI enhance failed:", error);
        res.status(500).json({ error: "AI enhance failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ AI backend running on port ${PORT}`));
