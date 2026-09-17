import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useUserRole } from "@/hooks/useUserRole";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ESCALATION_LABELS } from "@/lib/departments";
import { getCountyName, getWardName } from "@/lib/counties";
import { normalizeRole } from "@/lib/roles";

interface Issue {
    id: string;
    title: string;
    status?: string;
    escalationLevel?: number;
    wardId?: string;
    department?: string;
    assignedTo?: string | null;
}

interface Officer {
    uid: string;
    name: string;
    ward: string;
}

const CountyAdminDashboard = () => {
    const { profile, loading: profileLoading } = useUserRole();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [officers, setOfficers] = useState<Officer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!profile?.county) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const issuesQuery = profile.department
                    ? query(
                        collection(db, "issues"),
                        where("countyId", "==", profile.county),
                        where("department", "==", profile.department)
                    )
                    : query(collection(db, "issues"), where("countyId", "==", profile.county));
                const issuesSnap = await getDocs(issuesQuery);
                setIssues(issuesSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Issue)));

                const usersSnap = await getDocs(collection(db, "users"));
                const wardOfficers = usersSnap.docs
                    .map((d) => ({ uid: d.id, ...d.data() } as any))
                    .filter(
                        (u) =>
                            normalizeRole(u.role) === "ward_officer" &&
                            u.county === profile.county &&
                            (!profile.department || u.department === profile.department)
                    )
                    .map((u) => ({
                        uid: u.uid,
                        name: u.displayName || [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email,
                        ward: u.ward,
                    }));
                setOfficers(wardOfficers);
            } catch (error) {
                console.error("Error loading county admin data:", error);
                toast.error("Failed to load county data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [profile?.county, profile?.department]);

    const reassign = async (issueId: string, officerUid: string) => {
        try {
            await updateDoc(doc(db, "issues", issueId), { assignedTo: officerUid || null });
            setIssues((prev) => prev.map((i) => (i.id === issueId ? { ...i, assignedTo: officerUid || null } : i)));
            toast.success("Reassigned.");
        } catch (error) {
            console.error("Error reassigning issue:", error);
            toast.error("Failed to reassign.");
        }
    };

    const escalated = issues.filter((i) => (i.escalationLevel ?? 0) >= 1);

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
            <div className="container px-4 py-8 space-y-8">
                <div>
                    <h1 className="text-2xl font-bold">County Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        {getCountyName(profile?.county)}{profile?.department ? ` — ${profile.department}` : " — all departments"}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
                ) : (
                    <>
                        <section>
                            <h2 className="text-lg font-semibold mb-3">
                                Escalation Queue ({escalated.length})
                            </h2>
                            {escalated.length === 0 ? (
                                <p className="text-muted-foreground text-sm">Nothing escalated right now — every ward officer in your scope is within SLA.</p>
                            ) : (
                                <div className="grid gap-3">
                                    {escalated.map((issue) => (
                                        <Card key={issue.id} className="border-amber-300">
                                            <CardContent className="flex items-center justify-between p-4">
                                                <div>
                                                    <p className="font-medium">{issue.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {getWardName(profile?.county, issue.wardId)} · {issue.department}
                                                    </p>
                                                </div>
                                                <Badge className={(issue.escalationLevel ?? 0) >= 2 ? "bg-red-600 text-white" : "bg-amber-500 text-white"}>
                                                    {ESCALATION_LABELS[Math.min(issue.escalationLevel ?? 1, 2)]}
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </section>

                        <section>
                            <h2 className="text-lg font-semibold mb-3">All Issues ({issues.length})</h2>
                            <div className="grid gap-3">
                                {issues.map((issue) => (
                                    <Card key={issue.id}>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                                            <CardTitle className="text-base">{issue.title}</CardTitle>
                                            <Badge variant="secondary">{issue.status || "pending"}</Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <label className="block text-sm mb-1 text-muted-foreground">Assigned Ward Officer</label>
                                            <Select
                                                value={issue.assignedTo || ""}
                                                onValueChange={(v) => reassign(issue.id, v)}
                                            >
                                                <SelectTrigger className="max-w-xs">
                                                    <SelectValue placeholder="Unassigned" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {officers
                                                        .filter((o) => o.ward === issue.wardId)
                                                        .map((o) => (
                                                            <SelectItem key={o.uid} value={o.uid}>
                                                                {o.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default CountyAdminDashboard;
