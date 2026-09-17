import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { normalizeRole, type Role, type UserProfile } from "@/lib/roles";

interface UseUserRoleResult {
    user: ReturnType<typeof useAuthState>[0];
    role: Role | null;
    profile: UserProfile | null;
    loading: boolean;
}

export const useUserRole = (): UseUserRoleResult => {
    // useAuthState's own `authLoading` flag is essential here: on a hard refresh,
    // `user` starts as `undefined` for a brief moment while Firebase Auth
    // rehydrates the persisted session from storage. Treating that transient
    // `undefined` as "signed out" caused AdminRoute to redirect a real admin to
    // /not-authorized before the session finished loading — so we wait for
    // authLoading to clear before making any role decision.
    const [user, authLoading] = useAuthState(auth);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setProfile(null);
            setRoleLoading(false);
            return;
        }

        setRoleLoading(true);
        const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
            const data = docSnap.exists() ? (docSnap.data() as any) : {};
            setProfile({
                uid: user.uid,
                email: user.email,
                displayName: data.displayName ?? user.displayName ?? null,
                role: normalizeRole(data.role),
                county: data.county ?? null,
                ward: data.ward ?? null,
                department: data.department ?? null,
            });
            setRoleLoading(false);
        });

        return () => unsub();
    }, [user, authLoading]);

    return { user, role: profile?.role ?? null, profile, loading: authLoading || roleLoading };
};
