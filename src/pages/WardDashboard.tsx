import { useEffect, useState } from "react";
import { collection, query, where, doc, updateDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserRole } from "@/hooks/useUserRole";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, AlertTriangle } from "lucide-react";
import { ESCALATION_LABELS } from "@/lib/departments";
import { getWardName, getCountyName } from "@/lib/counties";

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
    status?: string;
    escalationLevel?: number;
    slaDeadline?: Timestamp;
    statusHistory?: StatusHistoryEntry[];
    reportedBy?: string;
    createdAt?: any;
}

const escalationBadge = (level = 0) => {
    if (level >= 2) return <Badge className="bg-red-600 text-white">{ESCALATION_LABELS[2]}</Badge>;
    if (level >= 1) return <Badge className="bg-amber-500 text-white">{ESCALATION_LABELS[1]}</Badge>;
    return <Badge variant="outline">{ESCALATION_LABELS[0]}</Badge>;
};

const WardDashboard = () => {
    const { profile, loading: profileLoading } = useUserRole();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Issue | null>(null);
    const [newStatus, setNewStatus] = useState("pending");
    const [note, setNote] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!profile?.ward || !profile?.department) return;

        const fetchIssues = async () => {
            setLoading(true);
            try {
                // Two equality filters — Firestore may prompt you to create a
                // composite index the first time this runs; follow the link it
                // logs to the console once and it'll persist.
                const q = query(
                    collection(db, "issues"),
                    where("wardId", "==", profile.ward),
                    where("department", "==", profile.department)
                );
                const snap = await getDocs(q);
                setIssues(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Issue)));
            } catch (error) {
                console.error("Error fetching ward issues:", error);
                toast.error("Failed to load issues for your ward.");
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, [profile?.ward, profile?.department]);

    const openIssue = (issue: Issue) => {
        setSelected(issue);
        setNewStatus(issue.status || "pending");
        setNote("");
    };

    const submitUpdate = async () => {
        if (!selected || !profile) return;
        if (!note.trim()) {
            toast.error("Add a note — it's shown publicly on the issue and is how citizens see what you did.");
            return;
        }

        setSaving(true);
        try {
            const historyEntry: StatusHistoryEntry = {
                status: newStatus,
                note: note.trim(),
                actorUid: profile.uid,
                actorName: profile.displayName || profile.email || "Ward Officer",
                actorRole: "ward_officer",
                at: Timestamp.now(),
            };

            await updateDoc(doc(db, "issues", selected.id), {
                status: newStatus,
                statusHistory: [...(selected.statusHistory || []), historyEntry],
                // Acting on it at all resets escalation — the whole point of
                // escalation is to force a response, and this is that response.
                escalationLevel: 0,
            });

            setIssues((prev) =>
                prev.map((i) =>
                    i.id === selected.id
                        ? { ...i, status: newStatus, escalationLevel: 0, statusHistory: [...(i.statusHistory || []), historyEntry] }
                        : i
                )
            );
            toast.success("Issue updated.");
            setSelected(null);
        } catch (error) {
            console.error("Error updating issue:", error);
            toast.error("Failed to update the issue.");
        } finally {
            setSaving(false);
        }
    };

    if (profileLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container px-4 py-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Ward Officer Dashboard</h1>
                    <p className="text-muted-foreground">
                        {getWardName(profile?.county, profile?.ward) || "Your ward"}, {getCountyName(profile?.county)} — {profile?.department}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
                ) : issues.length === 0 ? (
                    <p className="text-muted-foreground">No issues reported in your ward/department yet.</p>
                ) : (
                    <div className="grid gap-4">
                        {issues.map((issue) => (
                            <Card key={issue.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-base">{issue.title}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        {escalationBadge(issue.escalationLevel)}
                                        <Badge variant="secondary">{issue.status || "pending"}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                                    {(issue.escalationLevel ?? 0) >= 1 && (
                                        <p className="text-sm text-amber-600 flex items-center gap-1">
                                            <AlertTriangle className="w-4 h-4" /> This issue is overdue against its response SLA.
                                        </p>
                                    )}
                                    <Button size="sm" onClick={() => openIssue(issue)}>
                                        Update Status
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update: {selected?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1">Status</label>
                            <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm mb-1">
                                Note <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="What did you do / what's the plan? This is shown publicly."
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
                            <Button onClick={submitUpdate} disabled={saving}>
                                {saving ? "Saving..." : "Save Update"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default WardDashboard;
