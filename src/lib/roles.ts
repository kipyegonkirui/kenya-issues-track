// src/lib/roles.ts
// Central definition of the role model. Every route guard, dashboard, and
// Firestore rule should ultimately trace back to these helpers so the
// definition of "who can do what" lives in exactly one place.

export type Role = "citizen" | "ward_officer" | "county_admin" | "admin";

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName?: string | null;
    role: Role;
    county?: string | null;   // county id, e.g. "047" (Nairobi)
    ward?: string | null;     // ward id, e.g. "047-001-001" — required for ward_officer
    department?: string | null; // department name, e.g. "Water and Sanitation Department"
}

// Legacy accounts (created before this redesign) may still have role "user"
// or "staff" written by the old signup/admin flows. Treat those as their
// modern equivalents rather than forcing a manual data migration up front.
export function normalizeRole(raw: string | null | undefined): Role {
    switch (raw) {
        case "admin":
            return "admin";
        case "county_admin":
            return "county_admin";
        case "ward_officer":
        case "staff": // legacy value
            return "ward_officer";
        case "citizen":
        case "user": // legacy value
        default:
            return "citizen";
    }
}

export const ROLE_LABELS: Record<Role, string> = {
    citizen: "Citizen",
    ward_officer: "Ward Officer",
    county_admin: "County Admin",
    admin: "Super Admin",
};

export function isAdmin(profile: Pick<UserProfile, "role"> | null | undefined) {
    return profile?.role === "admin";
}

export function isCountyAdmin(profile: Pick<UserProfile, "role"> | null | undefined) {
    return profile?.role === "county_admin" || isAdmin(profile);
}

export function isWardOfficer(profile: Pick<UserProfile, "role"> | null | undefined) {
    return profile?.role === "ward_officer" || isCountyAdmin(profile);
}

// Does this user have management authority over the given county?
// Admins can manage any county; a county_admin only their own.
export function hasCountyAccess(
    profile: Pick<UserProfile, "role" | "county"> | null | undefined,
    county: string | null | undefined
) {
    if (!profile) return false;
    if (profile.role === "admin") return true;
    if (profile.role === "county_admin") return !!county && profile.county === county;
    return false;
}

// Does this user have responder authority over the given ward+department?
// Ward officers only their own ward+department; county_admin/admin escalate above them.
export function hasWardAccess(
    profile: Pick<UserProfile, "role" | "county" | "ward" | "department"> | null | undefined,
    ward: string | null | undefined,
    department: string | null | undefined
) {
    if (!profile) return false;
    if (profile.role === "admin") return true;
    if (profile.role === "county_admin") {
        // county_admin sees everything in their county regardless of ward/department
        return true; // county match is checked separately via hasCountyAccess at the caller
    }
    if (profile.role === "ward_officer") {
        return profile.ward === ward && profile.department === department;
    }
    return false;
}
