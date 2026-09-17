import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const departments = [
    "ICT Department",
    "Human Resource Department",
    "Finance and Accounts Department",
    "Procurement and Supplies Department",
    "Public Relations and Communication Department",
    "Legal Affairs Department",
    "Planning and Development Department",
    "Internal Audit Department",
    "Transport and Logistics Department",
    "Education Department",
    "Health Services Department",
    "Agriculture and Livestock Department",
    "Environment and Natural Resources Department",
    "Water and Sanitation Department",
    "Public Works and Housing Department",
    "Trade, Tourism and Industrialization Department",
    "Sports, Culture and Social Services Department",
    "Land, Physical Planning and Urban Development Department",
    "Energy Department",
    "Gender and Youth Affairs Department",
    "Disaster Management and Emergency Response Department",
    "Revenue Collection and County Treasury",
    "Research, Innovation and Data Management Department",
    "Customer Service and Administration Department"
];

// Idempotent: safe to click more than once. Only adds departments whose name
// isn't already present, instead of blindly appending duplicates every run.
export const seedDepartments = async (): Promise<{ added: number; skipped: number }> => {
    const deptRef = collection(db, "departments");
    const existingSnap = await getDocs(deptRef);
    const existingNames = new Set(existingSnap.docs.map((d) => d.data().name));

    let added = 0;
    let skipped = 0;

    for (const name of departments) {
        if (existingNames.has(name)) {
            skipped += 1;
            continue;
        }
        await addDoc(deptRef, { name });
        added += 1;
        console.log(`✅ Added: ${name}`);
    }

    console.log(`🎉 Done. Added ${added}, skipped ${skipped} already-existing.`);
    return { added, skipped };
};
