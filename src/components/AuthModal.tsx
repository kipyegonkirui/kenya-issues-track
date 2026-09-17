import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { counties } from "@/lib/counties"; // 🆕 Make sure this path is correct
import { normalizeRole } from "@/lib/roles";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // 🆕

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (user: any) => void;
}

const AuthModal = ({ open, onClose, onSuccess }: AuthModalProps) => {
    const [isSignup, setIsSignup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [county, setCounty] = useState(""); // 🆕
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async () => {
        if (!email || !password || (isSignup && (!firstName || !lastName || !county))) { // 🆕
            toast.error("Please fill in all required fields.");
            return;
        }

        if (isSignup && password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            let userCredential;

            if (isSignup) {
                // ✅ Create new user
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: `${firstName} ${lastName}`,
                });

                // ✅ Save user info in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    firstName,
                    lastName,
                    email,
                    county, // 🆕 Store county
                    role: "citizen",
                    createdAt: new Date(),
                });

                toast.success("Account created successfully!");
                onSuccess(user);
                onClose();
                navigate("/my-issues");
            } else {
                // ✅ Existing user login
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // ✅ Fetch role from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const role = normalizeRole(userData.role);

                    toast.success(`Welcome back, ${userData.firstName || "User"}!`);

                    if (role === "admin") {
                        navigate("/admin/dashboard");
                    } else if (role === "county_admin") {
                        navigate("/county-admin");
                    } else if (role === "ward_officer") {
                        navigate("/ward");
                    } else {
                        navigate("/my-issues");
                    }
                } else {
                    toast.error("User record not found. Contact support.");
                }

                onSuccess(user);
                onClose();
            }
        } catch (err: any) {
            toast.error(err.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isSignup ? "Sign Up" : "Log In"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {isSignup && (
                        <>
                            <Input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                            {/* 🆕 County Selection */}
                            <Select onValueChange={(value) => setCounty(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select County" />
                                </SelectTrigger>
                                <SelectContent>
                                    {counties.map((county) => (
                                        <SelectItem key={county.id} value={county.name}>
                                            {county.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </>
                    )}

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isSignup && (
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}

                    <Button className="w-full" onClick={handleAuth} disabled={loading}>
                        {loading ? "Processing..." : isSignup ? "Sign Up" : "Log In"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            className="text-primary underline"
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                        >
                            {isSignup ? "Log In" : "Sign Up"}
                        </button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
