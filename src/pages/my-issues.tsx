import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import IssueCard, { Issue } from "@/components/IssueCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyIssues = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    // Watch user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Fetch user's issues
    useEffect(() => {
        if (!user) {
            setIssues([]);
            setLoading(false);
            return;
        }

        const q = query(collection(db, "issues"), where("reportedBy", "==", user.email));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(
                (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as Issue)
            );
            setIssues(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">Loading your issues...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <p className="text-muted-foreground mb-4">
                    You must be logged in to view your issues.
                </p>
                <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
        );
    }

    if (issues.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <p className="text-muted-foreground mb-4">You haven’t reported any issues yet.</p>
                <Button onClick={() => navigate("/report")}>Report an Issue</Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Reported Issues</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
        </div>
    );
};

export default MyIssues;
