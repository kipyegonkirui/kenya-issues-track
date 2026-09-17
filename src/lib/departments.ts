// src/lib/departments.ts
// Maps a citizen-facing issue category to the county department responsible
// for it, and the SLA (response budget, in days) before an unaddressed issue
// escalates. Department names here must match the "name" field of documents
// seeded into the Firestore "departments" collection (see seedDepartments.ts).

export interface CategoryConfig {
    department: string;
    slaDays: number;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    roads: { department: "Public Works and Housing Department", slaDays: 14 },
    water: { department: "Water and Sanitation Department", slaDays: 7 },
    electricity: { department: "Energy Department", slaDays: 5 },
    waste: { department: "Water and Sanitation Department", slaDays: 7 },
    health: { department: "Health Services Department", slaDays: 3 },
    education: { department: "Education Department", slaDays: 14 },
    security: { department: "Disaster Management and Emergency Response Department", slaDays: 2 },
    other: { department: "Customer Service and Administration Department", slaDays: 10 },
};

export function getCategoryConfig(category: string): CategoryConfig {
    return CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.other;
}

// Escalation levels, in ascending severity. Each entry is how many *additional*
// SLA-periods of silence trigger that level (e.g. level 1 at 1x SLA overdue,
// level 2 at 2x SLA overdue).
export const ESCALATION_MULTIPLIERS = [1, 2] as const; // index 0 -> level 1, index 1 -> level 2

export const ESCALATION_LABELS: Record<number, string> = {
    0: "On Track",
    1: "Overdue",
    2: "Escalated",
};
