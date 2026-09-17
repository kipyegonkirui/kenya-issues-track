import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";

interface Issue {
    department?: string;
    status?: string;
    escalationLevel?: number;
}

interface DeptStats {
    department: string;
    total: number;
    resolved: number;
    overdue: number;
    escalated: number;
}

const AccountabilityPage = () => {
    const [stats, setStats] = useState<DeptStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const snap = await getDocs(collection(db, "issues"));
                const issues = snap.docs.map((d) => d.data() as Issue);

                const byDept = new Map<string, DeptStats>();
                for (const issue of issues) {
                    const dept = issue.department || "Unassigned";
                    if (!byDept.has(dept)) {
                        byDept.set(dept, { department: dept, total: 0, resolved: 0, overdue: 0, escalated: 0 });
                    }
                    const bucket = byDept.get(dept)!;
                    bucket.total += 1;
                    if (issue.status === "resolved") bucket.resolved += 1;
                    if ((issue.escalationLevel ?? 0) >= 1 && issue.status !== "resolved") bucket.overdue += 1;
                    if ((issue.escalationLevel ?? 0) >= 2 && issue.status !== "resolved") bucket.escalated += 1;
                }

                setStats(
                    Array.from(byDept.values()).sort((a, b) => b.escalated - a.escalated || b.overdue - a.overdue)
                );
            } catch (error) {
                console.error("Error loading accountability stats:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const totals = stats.reduce(
        (acc, s) => ({
            total: acc.total + s.total,
            resolved: acc.resolved + s.resolved,
            overdue: acc.overdue + s.overdue,
            escalated: acc.escalated + s.escalated,
        }),
        { total: 0, resolved: 0, overdue: 0, escalated: 0 }
    );
    const resolutionRate = totals.total ? Math.round((totals.resolved / totals.total) * 100) : 0;

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container px-4 py-10 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Public Accountability Record</h1>
                    <p className="text-muted-foreground max-w-2xl mt-2">
                        Every reported issue is tracked here — including how long it sat unaddressed.
                        Departments can't quietly ignore a report; overdue and escalated issues are visible
                        to everyone.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground">Total Reports</p>
                                    <p className="text-2xl font-bold">{totals.total}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <ShieldCheck className="w-4 h-4 text-green-600" /> Resolution Rate
                                    </p>
                                    <p className="text-2xl font-bold">{resolutionRate}%</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4 text-amber-500" /> Currently Overdue
                                    </p>
                                    <p className="text-2xl font-bold">{totals.overdue}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <AlertTriangle className="w-4 h-4 text-red-600" /> Escalated
                                    </p>
                                    <p className="text-2xl font-bold">{totals.escalated}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>By Department</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <table className="min-w-full text-sm">
                                    <thead className="border-b text-left text-muted-foreground">
                                        <tr>
                                            <th className="py-2 pr-4">Department</th>
                                            <th className="py-2 pr-4">Total</th>
                                            <th className="py-2 pr-4">Resolved</th>
                                            <th className="py-2 pr-4">Overdue</th>
                                            <th className="py-2 pr-4">Escalated</th>
                                            <th className="py-2 pr-4">Resolution Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.map((s) => (
                                            <tr key={s.department} className="border-b">
                                                <td className="py-2 pr-4">{s.department}</td>
                                                <td className="py-2 pr-4">{s.total}</td>
                                                <td className="py-2 pr-4">{s.resolved}</td>
                                                <td className="py-2 pr-4">
                                                    {s.overdue > 0 ? (
                                                        <span className="text-amber-600 font-medium">{s.overdue}</span>
                                                    ) : s.overdue}
                                                </td>
                                                <td className="py-2 pr-4">
                                                    {s.escalated > 0 ? (
                                                        <span className="text-red-600 font-medium">{s.escalated}</span>
                                                    ) : s.escalated}
                                                </td>
                                                <td className="py-2 pr-4">
                                                    {s.total ? Math.round((s.resolved / s.total) * 100) : 0}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountabilityPage;
