import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    setDoc,
    addDoc,
    deleteDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

// 🔔 Notification helper
const sendNotification = async (
    userEmail: string,
    issueId: string,
    title: string,
    message: string
) => {
    try {
        const notifRef = doc(db, "notifications", issueId);
        await setDoc(
            notifRef,
            {
                userId: userEmail,
                issueId,
                title,
                message,
                read: false,
                timestamp: serverTimestamp(),
            },
            { merge: true }
        );
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

interface StatusHistoryEntry {
    status: string;
    note: string;
    actorUid?: string;
    actorName: string;
    actorRole: string;
    at?: any;
}

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
    department?: string;
    statusHistory?: StatusHistoryEntry[];
}

const AdminIssues = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [statusNote, setStatusNote] = useState("");
    const [filter, setFilter] = useState("all");
    const [adminPassword, setAdminPassword] = useState("");
    const [processing, setProcessing] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    // 🔹 Fetch issues + the real department list (same source AdminUsers uses,
    // so an issue's department always matches a value officers can actually be
    // assigned to).
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "issues"));
                const data = querySnapshot.docs.map((docSnap) => ({
                    id: docSnap.id,
                    ...docSnap.data(),
                })) as Issue[];
                setIssues(data);
            } catch (error) {
                console.error("Error fetching issues:", error);
            } finally {
                setLoading(false);
            }
        };
        const fetchDepartments = async () => {
            try {
                const snap = await getDocs(collection(db, "departments"));
                setDepartmentOptions(snap.docs.map((d) => d.data().name).filter(Boolean));
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchIssues();
        fetchDepartments();
    }, []);

    const filteredIssues =
        filter === "all" ? issues : issues.filter((i) => i.status === filter);

    // 🔹 Confirm admin action
    const handleConfirm = async () => {
        if (!selectedIssue) return;

        // 🚫 Prevent modifying resolved issues
        if (selectedIssue.status === "resolved" && !deleteMode) {
            toast.warning("This issue has already been resolved and cannot be modified.");
            return;
        }

        if (!auth.currentUser) {
            toast.error("No authenticated admin found.");
            return;
        }
        if (!adminPassword.trim()) {
            toast.error("Please enter your password.");
            return;
        }

        setProcessing(true);

        try {
            const cred = EmailAuthProvider.credential(
                auth.currentUser.email!,
                adminPassword
            );
            await reauthenticateWithCredential(auth.currentUser, cred);

            const issueRef = doc(db, "issues", selectedIssue.id);

            if (deleteMode) {
                // 🗃️ Move issue to archived collection
                const { id, ...archivedData } = selectedIssue;
                await addDoc(collection(db, "archived_issues"), {
                    ...archivedData,
                    archivedAt: serverTimestamp(),
                    archivedBy: auth.currentUser.email,
                });
                await deleteDoc(issueRef);

                await sendNotification(
                    selectedIssue.reportedBy,
                    selectedIssue.id,
                    "Issue Archived",
                    `⚠️ Your issue "${selectedIssue.title}" was archived.`
                );

                setIssues((prev) => prev.filter((i) => i.id !== selectedIssue.id));
                toast.success("Issue archived successfully.");
            } else {
                const statusChanged = selectedIssue.status !== issues.find((i) => i.id === selectedIssue.id)?.status;
                if (statusChanged && !statusNote.trim()) {
                    toast.error("Please add a note explaining this status change — it's shown publicly on the issue.");
                    setProcessing(false);
                    return;
                }

                const historyEntry: StatusHistoryEntry = {
                    status: selectedIssue.status || "pending",
                    note: statusNote.trim() || "Department reassigned.",
                    actorUid: auth.currentUser!.uid,
                    actorName: auth.currentUser!.displayName || auth.currentUser!.email || "Admin",
                    actorRole: "admin",
                    at: Timestamp.now(),
                };

                // ✏️ Update issue — append to the audit trail rather than overwrite
                await updateDoc(issueRef, {
                    status: selectedIssue.status,
                    department: selectedIssue.department || "",
                    statusHistory: [...(selectedIssue.statusHistory || []), historyEntry],
                });

                setIssues((prev) =>
                    prev.map((i) =>
                        i.id === selectedIssue.id
                            ? { ...selectedIssue, statusHistory: [...(selectedIssue.statusHistory || []), historyEntry] }
                            : i
                    )
                );

                toast.success("Issue updated successfully.");

                // 🔔 Notification logic
                let title = "Issue Update";
                let message = `Your issue "${selectedIssue.title}" has been updated.`;

                if (selectedIssue.status === "in-progress") {
                    title = "Issue In Progress";
                    message = `🚧 Your issue "${selectedIssue.title}" is being handled by the ${selectedIssue.department} department.`;
                } else if (selectedIssue.status === "resolved") {
                    title = "Issue Resolved";
                    message = `✅ Your issue "${selectedIssue.title}" has been resolved successfully.`;
                } else if (selectedIssue.status === "pending") {
                    title = "Issue Pending Review";
                    message = `🕓 Your issue "${selectedIssue.title}" is pending review and will be processed soon.`;
                }

                await sendNotification(
                    selectedIssue.reportedBy,
                    selectedIssue.id,
                    title,
                    message
                );
            }

            setSelectedIssue(null);
            setAdminPassword("");
            setStatusNote("");
            setDeleteMode(false);
        } catch (error: any) {
            console.error("Error confirming admin:", error);
            toast.error("Password incorrect or authentication failed.");
        } finally {
            setProcessing(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin mr-2" />
                Loading issues...
            </div>
        );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Manage Issues</h1>
                    <p className="text-muted-foreground">
                        Review, update, or archive reported issues securely.
                    </p>
                </div>

                <Select value={filter} onValueChange={(val) => setFilter(val)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Reported Issues</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Reporter</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIssues.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-6 text-muted-foreground"
                                        >
                                            No issues found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredIssues.map((issue) => (
                                        <TableRow key={issue.id}>
                                            <TableCell>{issue.title}</TableCell>
                                            <TableCell>{issue.department || "N/A"}</TableCell>
                                            <TableCell>{issue.reportedBy}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        issue.status === "resolved"
                                                            ? "bg-green-100 text-green-700 border-green-300"
                                                            : issue.status === "in-progress"
                                                                ? "bg-blue-100 text-blue-700 border-blue-300"
                                                                : "bg-yellow-100 text-yellow-700 border-yellow-300"
                                                    }
                                                >
                                                    {issue.status || "pending"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {issue.createdAt?.seconds
                                                    ? new Date(issue.createdAt.seconds * 1000).toLocaleDateString()
                                                    : "N/A"}
                                            </TableCell>
                                            <TableCell className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={issue.status === "resolved"}
                                                    onClick={() => {
                                                        setDeleteMode(false);
                                                        setSelectedIssue(issue);
                                                        setStatusNote("");
                                                    }}
                                                >
                                                    Manage
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    disabled={issue.status === "resolved"}
                                                    onClick={() => {
                                                        setDeleteMode(true);
                                                        setSelectedIssue(issue);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" /> Archive
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

            {/* Dialog for managing or archiving */}
            <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {deleteMode ? "Confirm Issue Archiving" : "Manage Issue"}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedIssue && (
                        <div className="space-y-4">
                            <div>
                                <h2 className="font-semibold text-lg">{selectedIssue.title}</h2>
                                <p className="text-sm text-muted-foreground">
                                    {selectedIssue.description}
                                </p>

                                {selectedIssue.status === "resolved" && (
                                    <p className="text-sm text-green-600 font-medium mt-2">
                                        ✅ This issue has been resolved and cannot be modified.
                                    </p>
                                )}
                            </div>

                            {!deleteMode && (
                                <>
                                    <div>
                                        <p className="text-sm font-medium mb-1">Department</p>
                                        <Select
                                            value={selectedIssue.department || ""}
                                            onValueChange={(val) =>
                                                setSelectedIssue({ ...selectedIssue, department: val })
                                            }
                                            disabled={selectedIssue.status === "resolved"}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-64">
                                                {departmentOptions.map((name) => (
                                                    <SelectItem key={name} value={name}>
                                                        {name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-1">Status</p>
                                        <Select
                                            value={selectedIssue.status || "pending"}
                                            onValueChange={(val) =>
                                                setSelectedIssue({ ...selectedIssue, status: val })
                                            }
                                            disabled={selectedIssue.status === "resolved"}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="in-progress">In Progress</SelectItem>
                                                <SelectItem value="resolved">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            {!deleteMode && selectedIssue.statusHistory && selectedIssue.statusHistory.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-1">History (public)</p>
                                    <div className="text-xs space-y-1 max-h-28 overflow-y-auto border rounded-md p-2 bg-slate-50">
                                        {selectedIssue.statusHistory.map((h, i) => (
                                            <p key={i}>
                                                <b>{h.status}</b> — {h.note} <span className="text-muted-foreground">({h.actorName})</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!deleteMode && (
                                <div>
                                    <p className="text-sm font-medium mb-1">
                                        Note for this update <span className="text-red-500">*</span>
                                    </p>
                                    <Textarea
                                        placeholder="e.g. Crew dispatched, expect repair within 3 days — this is shown publicly to the reporter and anyone viewing the issue."
                                        value={statusNote}
                                        onChange={(e) => setStatusNote(e.target.value)}
                                        disabled={selectedIssue.status === "resolved"}
                                    />
                                </div>
                            )}

                            <div className="mt-4 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Confirm your password to {deleteMode ? "archive" : "save"} changes.
                                </p>
                                <Input
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" onClick={() => setSelectedIssue(null)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant={deleteMode ? "destructive" : "default"}
                                    disabled={processing}
                                    onClick={handleConfirm}
                                >
                                    {processing
                                        ? "Processing..."
                                        : deleteMode
                                            ? "Confirm Archive"
                                            : "Confirm & Save"}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminIssues;
