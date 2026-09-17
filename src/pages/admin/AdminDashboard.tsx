import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { normalizeRole } from "@/lib/roles";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Loader2,
    CheckCircle,
    Clock,
    AlertTriangle,
    BarChart3,
    FileText,
    CheckSquare,
    Users,
    Building2,
    UserCog,
    UserRound,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface Issue {
    id: string;
    title: string;
    category: string;
    status: string;
    department?: string;
    createdAt?: any;
}

interface Department {
    id: string;
    name: string;
}

interface User {
    id: string;
    role: string;
}

const AdminDashboard = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchIssues();
        fetchDepartments();
        fetchUsers();
    }, []);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "issues"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Issue[];

            const sorted = data.sort(
                (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
            );

            setIssues(sorted);
        } catch (error) {
            console.error("Error fetching issues:", error);
            toast({
                title: "Error",
                description: "Failed to load issues.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const snapshot = await getDocs(collection(db, "departments"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as { name: string }),
            }));
            setDepartments(data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast({
                title: "Error",
                description: "Failed to load departments.",
                variant: "destructive",
            });
        }
    };

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as { role: string }),
            }));
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast({
                title: "Error",
                description: "Failed to load users.",
                variant: "destructive",
            });
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, "issues", id), { status: newStatus });
            setIssues((prev) =>
                prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
            );
            toast({
                title: "Status updated",
                description: `Issue status changed to ${newStatus}`,
            });
        } catch (error) {
            toast({
                title: "Error updating status",
                description: "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    const handleDepartmentAssign = async (id: string, department: string) => {
        try {
            await updateDoc(doc(db, "issues", id), { department });
            setIssues((prev) =>
                prev.map((i) => (i.id === id ? { ...i, department } : i))
            );
            toast({
                title: "Department assigned",
                description: `${department} department assigned.`,
            });
        } catch (error) {
            toast({
                title: "Error assigning department",
                description: "Please try again.",
                variant: "destructive",
            });
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return "N/A";
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // === Stats ===
    const total = issues.length;
    const pending = issues.filter((i) => i.status?.toLowerCase() === "pending").length;
    const inProgress = issues.filter((i) => i.status?.toLowerCase() === "in progress").length;
    const resolved = issues.filter((i) => i.status?.toLowerCase() === "resolved").length;

    const totalUsers = users.length;
    const wardOfficerCount = users.filter((u) => normalizeRole(u.role) === "ward_officer").length;
    const countyAdminCount = users.filter((u) => normalizeRole(u.role) === "county_admin").length;
    const adminCount = users.filter((u) => normalizeRole(u.role) === "admin").length;
    const citizenCount = users.filter((u) => normalizeRole(u.role) === "citizen").length;

    const chartData = [
        { month: "Jan", issues: 12 },
        { month: "Feb", issues: 19 },
        { month: "Mar", issues: 8 },
        { month: "Apr", issues: 15 },
        { month: "May", issues: 10 },
        { month: "Jun", issues: 22 },
    ];

    const filteredIssues =
        filter === "all"
            ? issues
            : issues.filter((issue) => issue.status?.toLowerCase() === filter);

    return (
        <div className="space-y-8">
            {/* ===== HEADER ===== */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <Select onValueChange={(v) => setFilter(v)} defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* ===== USERS SUMMARY ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Users</p>
                            <h3 className="text-2xl font-bold">{totalUsers}</h3>
                        </div>
                        <Users className="text-blue-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Admins</p>
                            <h3 className="text-2xl font-bold">{adminCount}</h3>
                        </div>
                        <UserCog className="text-purple-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">County Admins</p>
                            <h3 className="text-2xl font-bold">{countyAdminCount}</h3>
                        </div>
                        <UserCog className="text-indigo-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Ward Officers</p>
                            <h3 className="text-2xl font-bold">{wardOfficerCount}</h3>
                        </div>
                        <UserRound className="text-green-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Departments</p>
                            <h3 className="text-2xl font-bold">{departments.length}</h3>
                        </div>
                        <Building2 className="text-orange-500" size={32} />
                    </CardContent>
                </Card>
            </div>

            {/* ===== EXISTING ISSUE STATS ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Total Issues</p>
                            <h3 className="text-2xl font-bold">{total}</h3>
                        </div>
                        <FileText className="text-blue-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Pending</p>
                            <h3 className="text-2xl font-bold">{pending}</h3>
                        </div>
                        <AlertTriangle className="text-yellow-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">In Progress</p>
                            <h3 className="text-2xl font-bold">{inProgress}</h3>
                        </div>
                        <Clock className="text-sky-500" size={32} />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Resolved</p>
                            <h3 className="text-2xl font-bold">{resolved}</h3>
                        </div>
                        <CheckSquare className="text-green-500" size={32} />
                    </CardContent>
                </Card>
            </div>

            {/* ===== CHART SECTION ===== */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="text-primary" />
                        Issue Trends
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="issues"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* ===== ISSUES TABLE ===== */}
            <Card>
                <CardHeader>
                    <CardTitle>All Reported Issues</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    ) : filteredIssues.length === 0 ? (
                        <p className="text-muted-foreground text-sm">No issues found.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIssues.map((issue) => (
                                    <TableRow key={issue.id}>
                                        <TableCell className="font-medium">{issue.title}</TableCell>
                                        <TableCell>{issue.category}</TableCell>
                                        <TableCell>
                                            <Select
                                                onValueChange={(v) => handleStatusChange(issue.id, v)}
                                                defaultValue={issue.status?.toLowerCase() || "pending"}
                                            >
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="in progress">In Progress</SelectItem>
                                                    <SelectItem value="resolved">Resolved</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                onValueChange={(v) => handleDepartmentAssign(issue.id, v)}
                                                defaultValue={issue.department || "none"}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Assign department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Unassigned</SelectItem>
                                                    {departments.map((dept) => (
                                                        <SelectItem key={dept.id} value={dept.name}>
                                                            {dept.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>{formatDate(issue.createdAt)}</TableCell>
                                        <TableCell>
                                            {issue.status === "resolved" ? (
                                                <CheckCircle className="text-green-500" size={18} />
                                            ) : issue.status?.includes("progress") ? (
                                                <Clock className="text-sky-500" size={18} />
                                            ) : (
                                                <AlertTriangle className="text-yellow-500" size={18} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
