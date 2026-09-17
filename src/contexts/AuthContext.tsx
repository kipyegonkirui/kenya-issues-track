import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type UserProfile = {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    createdAt?: any;
};

type AuthContextType = {
    firebaseUser: FirebaseUser | null;
    profile: UserProfile | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ firebaseUser: null, profile: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            setFirebaseUser(user);
            if (user) {
                // fetch profile doc
                const docRef = doc(db, "users", user.uid);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    setProfile({ uid: user.uid, ...(snap.data() as any) });
                } else {
                    setProfile({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName || null,
                    });
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return <AuthContext.Provider value={ { firebaseUser, profile, loading } }> { children } </AuthContext.Provider>;
};
