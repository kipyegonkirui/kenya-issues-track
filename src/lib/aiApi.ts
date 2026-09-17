// src/lib/aiApi.ts
// Talks to the AI categorize/enhance endpoints served by server/.
// In dev, Vite proxies "/api" to http://localhost:5000 (see vite.config.ts).
// In production, set VITE_API_URL to wherever server/ is deployed if it's
// not served from the same origin as the frontend.
const API_BASE = import.meta.env.VITE_API_URL || "";

async function postJSON<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Request to ${path} failed (${res.status})`);
    }

    return res.json();
}

export function aiCategorize(description: string) {
    return postJSON<{ category: string }>("/api/ai-categorize", { description });
}

export function aiEnhanceDescription(description: string) {
    return postJSON<{ enhanced: string }>("/api/ai-enhance-description", {
        description,
    });
}
