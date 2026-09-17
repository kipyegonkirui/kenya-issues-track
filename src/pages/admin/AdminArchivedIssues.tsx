import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db, auth } from "@/firebase";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { toast } from "sonner";

interface Issue {
    id: string;
    title: string;
    description: string;
    category: string;
    county: string;
    ward: string;
    reportedBy: string;
    createdAt?: any;
    status?: string;
    assignedDepartment?: string;
}

const AdminArchivedIssues = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [restoring, setRestoring] = useState(false);

    // Fetch from archived_issues collection
    useEffect(() => {
        const fetchArchivedIssues = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "archived_issues"));
                const data = querySnapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                })) as Issue[];
                setIssues(data);
            } catch (error) {
                console.error("Error fetching archived issues:", error);
                toast.error("Failed to fetch archived issues");
            } finally {
                setLoading(false);
            }
        };
        fetchArchivedIssues();
    }, []);

    // Restore issue (move from archived_issues → issues)
    const handleRestore = async () => {
        if (!selectedIssue) return;
        const user = auth.currentUser;
        if (!user || !user.email) {
            toast.error("You must be logged in as an admin.");
            return;
        }

        try {
            setRestoring(true);
            const credential = EmailAuthProvider.credential(user.email, confirmPassword);
            await reauthenticateWithCredential(user, credential);

            // Add to main issues collection
            const issueData = { ...selectedIssue, archived: false };
            await addDoc(collection(db, "issues"), issueData);

            // Remove from archived_issues
            await deleteDoc(doc(db, "archived_issues", selectedIssue.id));

            // Update UI
            setIssues((prev) => prev.filter((i) => i.id !== selectedIssue.id));
            setSelectedIssue(null);
            setConfirmPassword("");
            toast.success("✅ Issue restored successfully!");
        } catch (error) {
            console.error("Error restoring issue:", error);
            toast.error("Password incorrect or action failed");
        } finally {
            setRestoring(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Loading archived issues...
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Archived Issues</h1>
                    <p className="text-muted-foreground">
                        View and restore archived or deleted issues.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Archived Issues List</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>County</TableHead>
                                    <TableHead>Ward</TableHead>
                                    <TableHead>Reported By</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {issues.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={8}
                                            className="text-center py-6 text-muted-foreground"
                                        >
                                            No archived issues found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    issues.map((issue) => (
                                        <TableRow key={issue.id}>
                                            <TableCell className="font-medium">
                                                {issue.title}
                                            </TableCell>
                                            <TableCell>{issue.category}</TableCell>
                                            <TableCell>{issue.county}</TableCell>
                                            <TableCell>{issue.ward}</TableCell>
                                            <TableCell>{issue.reportedBy}</TableCell>
                                            <TableCell>
                                                {issue.createdAt?.seconds
                                                    ? new Date(issue.createdAt.seconds * 1000).toLocaleDateString()
                                                    : "N/A"}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-gray-100 text-gray-700 border-gray-300"
                                                >
                                                    Archived
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => setSelectedIssue(issue)}
                                                >
                                                    Restore
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Confirm Restore Modal */}
            <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Restore</DialogTitle>
                    </DialogHeader>
                    {selectedIssue && (
                        <div className="space-y-4">
                            <p>
                                Are you sure you want to <b>restore</b> the issue titled{" "}
                                <span className="font-semibold">{selectedIssue.title}</span>?
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Please confirm your admin password to proceed.
                            </p>

                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setSelectedIssue(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleRestore}
                                    disabled={restoring || !confirmPassword}
                                >
                                    {restoring ? "Restoring..." : "Confirm Restore"}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminArchivedIssues;
