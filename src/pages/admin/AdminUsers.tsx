import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Trash2, ShieldAlert, RefreshCw, Info } from "lucide-react";
import { db, auth } from "@/firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { toast } from "sonner";
import { useAuthState } from "react-firebase-hooks/auth";
import { normalizeRole, ROLE_LABELS, type Role } from "@/lib/roles";
import { counties, getWardsForCounty, getCountyName, getWardName } from "@/lib/counties";

type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    county: string | null;
    ward: string | null;
    department: string;
};

type Department = {
    id: string;
    name: string;
};

const matchesSearch = (user: User, query: string) => {
    if (!query.trim()) return true;
    const needle = query.toLowerCase();
    return (
        (user.name || "").toLowerCase().includes(needle) ||
        (user.email || "").toLowerCase().includes(needle)
    );
};

const UserTable = ({
    users,
    showScope,
    onEdit,
    onDelete,
    emptyMessage,
}: {
    users: User[];
    showScope: boolean;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    emptyMessage: string;
}) => {
    if (users.length === 0) {
        return <p className="text-slate-500 py-4">{emptyMessage}</p>;
    }

    return (
        <table className="min-w-full text-sm">
            <thead className="border-b bg-slate-50 text-slate-700">
                <tr>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Role</th>
                    {showScope && (
                        <>
                            <th className="text-left py-2 px-3">County</th>
                            <th className="text-left py-2 px-3">Ward</th>
                            <th className="text-left py-2 px-3">Department</th>
                        </>
                    )}
                    <th className="text-left py-2 px-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="border-b hover:bg-slate-50 transition-colors"
                    >
                        <td className="py-2 px-3">{user.name || "—"}</td>
                        <td className="py-2 px-3">{user.email}</td>
                        <td className="py-2 px-3">{ROLE_LABELS[user.role]}</td>
                        {showScope && (
                            <>
                                <td className="py-2 px-3">{getCountyName(user.county) || "—"}</td>
                                <td className="py-2 px-3">{getWardName(user.county, user.ward) || "—"}</td>
                                <td className="py-2 px-3">{user.department || "—"}</td>
                            </>
                        )}
                        <td className="py-2 px-3 flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(user)}
                            >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Change
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(user)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
    const [editTarget, setEditTarget] = useState<User | null>(null);
    const [editRole, setEditRole] = useState<Role>("citizen");
    const [editCounty, setEditCounty] = useState<string>("");
    const [editWard, setEditWard] = useState<string>("");
    const [editDepartment, setEditDepartment] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [staffSearch, setStaffSearch] = useState("");
    const [citizenSearch, setCitizenSearch] = useState("");
    const [currentUser] = useAuthState(auth);

    const usersRef = collection(db, "users");
    const departmentsRef = collection(db, "departments");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const snapshot = await getDocs(usersRef);
            const userData = snapshot.docs.map((d) => {
                const data = d.data() as any;
                return {
                    id: d.id,
                    name: data.name || data.displayName ||
                        [data.firstName, data.lastName].filter(Boolean).join(" "),
                    email: data.email,
                    role: normalizeRole(data.role),
                    county: data.county ?? null,
                    ward: data.ward ?? null,
                    department: data.department || "",
                } as User;
            });
            setUsers(userData);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const snapshot = await getDocs(departmentsRef);
            const deptData = snapshot.docs.map((d) => ({
                id: d.id,
                name: d.data().name,
            })) as Department[];
            setDepartments(deptData);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast.error("Failed to load departments");
        }
    };

    const confirmDelete = async () => {
        if (!deleteTarget || !confirmPassword) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                currentUser?.email || "",
                confirmPassword
            );
            await reauthenticateWithCredential(currentUser!, credential);

            await deleteDoc(doc(db, "users", deleteTarget.id));
            toast.success(`User ${deleteTarget.email} deleted successfully`);
            setDeleteTarget(null);
            setConfirmPassword("");
            fetchUsers();
        } catch (error: any) {
            console.error("Error confirming delete:", error);
            if (error.code === "auth/wrong-password") {
                toast.error("Incorrect password");
            } else {
                toast.error("Failed to confirm deletion");
            }
        }
    };

    // Apply role/scope update with password confirmation
    const confirmRoleDeptUpdate = async () => {
        if (!editTarget || !confirmPassword) {
            toast.error("Please enter your password");
            return;
        }

        if (editRole === "ward_officer" && (!editCounty || !editWard || !editDepartment)) {
            toast.error("Ward Officers need a county, ward, and department");
            return;
        }
        if (editRole === "county_admin" && !editCounty) {
            toast.error("County Admins need at least a county assigned");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                currentUser?.email || "",
                confirmPassword
            );
            await reauthenticateWithCredential(currentUser!, credential);

            // Clear scope fields that don't apply to the new role, so stale
            // county/ward/department values can't linger and silently grant
            // access via a Firestore rule that only checks role.
            const updatedFields: Partial<User> = {
                role: editRole,
                county: editRole === "ward_officer" || editRole === "county_admin" ? editCounty : null,
                ward: editRole === "ward_officer" ? editWard : null,
                department:
                    editRole === "ward_officer" || editRole === "county_admin"
                        ? (editDepartment || null)
                        : null,
            };

            await updateDoc(doc(db, "users", editTarget.id), updatedFields as any);
            toast.success("User information updated successfully");
            setEditTarget(null);
            setShowPasswordConfirm(false);
            setConfirmPassword("");
            fetchUsers();
        } catch (error: any) {
            console.error("Error confirming update:", error);
            if (error.code === "auth/wrong-password") {
                toast.error("Incorrect password");
            } else {
                toast.error("Failed to confirm update");
            }
        }
    };

    const openDeleteModal = (user: User) => {
        if (user.email === currentUser?.email) {
            toast.error("You cannot delete your own account");
            return;
        }
        if (user.role === "admin") {
            toast.error("You cannot delete another admin");
            return;
        }
        setDeleteTarget(user);
    };

    const openEditModal = (user: User) => {
        if (user.email === currentUser?.email) {
            toast.error("You cannot edit your own account");
            return;
        }
        setEditTarget(user);
        setEditRole(user.role);
        setEditCounty(user.county || "");
        setEditWard(user.ward || "");
        setEditDepartment(user.department || "");
        setConfirmPassword("");
    };

    useEffect(() => {
        fetchUsers();
        fetchDepartments();
    }, []);

    const staffAndAdmins = useMemo(
        () => users.filter((u) => u.role !== "citizen"),
        [users]
    );
    const citizens = useMemo(
        () => users.filter((u) => u.role === "citizen"),
        [users]
    );
    const filteredStaff = useMemo(
        () => staffAndAdmins.filter((u) => matchesSearch(u, staffSearch)),
        [staffAndAdmins, staffSearch]
    );
    const filteredCitizens = useMemo(
        () => citizens.filter((u) => matchesSearch(u, citizenSearch)),
        [citizens, citizenSearch]
    );

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Manage Users & Roles</CardTitle>
                    <p className="text-sm text-slate-500 flex items-start gap-2 mt-1">
                        <Info className="w-4 h-4 mt-0.5 shrink-0" />
                        New Ward Officer, County Admin, or Super Admin accounts can't be
                        created from scratch here — Firebase requires accounts to sign up
                        themselves first. Find their citizen account below (search by
                        email) and use "Change" to promote it.
                    </p>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <p>Loading users...</p>
                    ) : (
                        <Tabs defaultValue="staff">
                            <TabsList>
                                <TabsTrigger value="staff">
                                    Officers &amp; Admins ({staffAndAdmins.length})
                                </TabsTrigger>
                                <TabsTrigger value="citizens">
                                    Citizens ({citizens.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="staff" className="space-y-3 pt-3">
                                <Input
                                    placeholder="Search by name or email..."
                                    value={staffSearch}
                                    onChange={(e) => setStaffSearch(e.target.value)}
                                    className="max-w-sm"
                                />
                                <UserTable
                                    users={filteredStaff}
                                    showScope
                                    onEdit={openEditModal}
                                    onDelete={openDeleteModal}
                                    emptyMessage={
                                        staffAndAdmins.length === 0
                                            ? "No officer or admin accounts yet."
                                            : "No matches for that search."
                                    }
                                />
                            </TabsContent>

                            <TabsContent value="citizens" className="space-y-3 pt-3">
                                <Input
                                    placeholder="Search citizens by name or email..."
                                    value={citizenSearch}
                                    onChange={(e) => setCitizenSearch(e.target.value)}
                                    className="max-w-sm"
                                />
                                <UserTable
                                    users={filteredCitizens}
                                    showScope={false}
                                    onEdit={openEditModal}
                                    onDelete={openDeleteModal}
                                    emptyMessage={
                                        citizens.length === 0
                                            ? "No citizen accounts yet."
                                            : "No citizens match that search."
                                    }
                                />
                            </TabsContent>
                        </Tabs>
                    )}
                </CardContent>
            </Card>

            {/* Edit Role / Scope Dialog */}
            <Dialog open={!!editTarget} onOpenChange={() => setEditTarget(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 text-blue-500" />
                            Edit Role &amp; Assignment
                        </DialogTitle>
                    </DialogHeader>

                    {editTarget && (
                        <div className="space-y-4">
                            <div className="text-sm border rounded-md p-3 bg-slate-50">
                                <p><strong>Name:</strong> {editTarget.name}</p>
                                <p><strong>Email:</strong> {editTarget.email}</p>
                                <p><strong>Current Role:</strong> {ROLE_LABELS[editTarget.role]}</p>
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Role</label>
                                <Select
                                    value={editRole}
                                    onValueChange={(v) => setEditRole(v as Role)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="citizen">Citizen</SelectItem>
                                        <SelectItem value="ward_officer">Ward Officer</SelectItem>
                                        <SelectItem value="county_admin">County Admin</SelectItem>
                                        <SelectItem value="admin">Super Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(editRole === "ward_officer" || editRole === "county_admin") && (
                                <div>
                                    <label className="block text-sm mb-1">County</label>
                                    <Select
                                        value={editCounty}
                                        onValueChange={(v) => {
                                            setEditCounty(v);
                                            setEditWard(""); // county changed — old ward no longer valid
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select County" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-64">
                                            {counties.map((c) => (
                                                <SelectItem key={c.id} value={c.id}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {editRole === "ward_officer" && (
                                <div>
                                    <label className="block text-sm mb-1">Ward</label>
                                    <Select
                                        value={editWard}
                                        onValueChange={setEditWard}
                                        disabled={!editCounty}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder={editCounty ? "Select Ward" : "Select a county first"} />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-64">
                                            {getWardsForCounty(editCounty).map((w) => (
                                                <SelectItem key={w.id} value={w.id}>
                                                    {w.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {(editRole === "ward_officer" || editRole === "county_admin") && (
                                <div>
                                    <label className="block text-sm mb-1">
                                        Department {editRole === "county_admin" && (
                                            <span className="text-muted-foreground font-normal">(optional — leave blank to oversee all departments in the county)</span>
                                        )}
                                    </label>
                                    <Select
                                        value={editDepartment}
                                        onValueChange={setEditDepartment}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Department" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-64">
                                            {departments.length > 0 ? (
                                                departments.map((dept) => (
                                                    <SelectItem key={dept.id} value={dept.name}>
                                                        {dept.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem value="none" disabled>
                                                    No departments found — seed them first
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditTarget(null)}
                                >
                                    Cancel
                                </Button>
                                <Button onClick={() => setShowPasswordConfirm(true)}>
                                    Confirm Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Password Confirmation Modal */}
            <Dialog open={showPasswordConfirm} onOpenChange={setShowPasswordConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Your Password</DialogTitle>
                        <p className="text-sm text-gray-500">
                            Please enter your password to authorize this change.
                        </p>
                    </DialogHeader>

                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowPasswordConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                confirmRoleDeptUpdate();
                            }}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete confirmation dialog */}
            <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <ShieldAlert className="w-5 h-5" /> Confirm Account Deletion
                        </DialogTitle>
                        <p className="text-sm text-gray-500">
                            To delete <b>{deleteTarget?.email}</b>, please confirm your
                            password below. This action cannot be undone.
                        </p>
                    </DialogHeader>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Confirm Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminUsers;
