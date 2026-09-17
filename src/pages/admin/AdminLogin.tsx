
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { normalizeRole } from "@/lib/roles";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check Firestore role
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const role = normalizeRole(docSnap.exists() ? docSnap.data().role : null);

            if (role === "admin") {
                navigate("/admin/dashboard");
            } else if (role === "county_admin") {
                navigate("/county-admin");
            } else if (role === "ward_officer") {
                navigate("/ward");
            } else {
                setError("This account doesn't have staff access. Use the regular sign-in instead.");
            }
        } catch (err: any) {
            setError("Invalid credentials or network error.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form
                onSubmit={handleLogin}
                className="bg-card p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                <div className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
