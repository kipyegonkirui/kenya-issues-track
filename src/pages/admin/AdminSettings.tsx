import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { auth } from "@/firebase";
import { updatePassword } from "firebase/auth";
import { seedDepartments } from "@/utils/seedDepartments";

const AdminSettings = () => {
    const user = auth.currentUser;
    const [email, setEmail] = useState(user?.email || "");
    const [name, setName] = useState(user?.displayName || "");
    const [newPassword, setNewPassword] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [seedingDepartments, setSeedingDepartments] = useState(false);

    const handleSeedDepartments = async () => {
        setSeedingDepartments(true);
        try {
            const { added, skipped } = await seedDepartments();
            if (added === 0) {
                toast.info(`Already up to date — all ${skipped} departments existed.`);
            } else {
                toast.success(`Added ${added} department(s)${skipped ? `, skipped ${skipped} already there` : ""}.`);
            }
        } catch (error) {
            console.error("Error seeding departments:", error);
            toast.error("Failed to seed departments — check the console for details.");
        } finally {
            setSeedingDepartments(false);
        }
    };

    const [notifications, setNotifications] = useState({
        newIssue: true,
        assignedIssue: true,
        weeklySummary: false,
    });

    // 🌙 Handle Dark Mode Toggle
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const isDark = storedTheme === "dark";
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        document.documentElement.classList.toggle("dark", checked);
        localStorage.setItem("theme", checked ? "dark" : "light");
        toast.success(`Switched to ${checked ? "Dark" : "Light"} Mode`);
    };

    // 🔐 Change Password
    const handleChangePassword = async () => {
        try {
            if (user && newPassword) {
                await updatePassword(user, newPassword);
                toast.success("Password changed successfully!");
                setNewPassword("");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
                Manage your system configuration, notifications, and security preferences.
            </p>

            <Tabs defaultValue="system" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[60%]">
                    <TabsTrigger value="system">System</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* 🧑 Profile (View Only) */}
                <TabsContent value="profile" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    value={name}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    value={email}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Profile editing is disabled for admin and staff accounts.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 🏢 System Settings */}
                <TabsContent value="system" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-muted-foreground">
                                Manage departments, issue categories, and appearance preferences.
                            </p>
                            <Button
                                variant="outline"
                                disabled={seedingDepartments}
                                onClick={handleSeedDepartments}
                            >
                                {seedingDepartments ? "Seeding..." : "Seed Standard Departments"}
                            </Button>
                            <p className="text-xs text-muted-foreground">
                                Populates the departments list issues get routed to. Safe to click
                                more than once — it skips any department that already exists.
                            </p>
                            <Button variant="outline">Manage Categories</Button>

                            <hr className="my-4" />

                            {/* 🌙 Dark Mode Toggle */}
                            <div className="flex items-center justify-between">
                                <Label>Dark Mode</Label>
                                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 🔔 Notifications */}
                <TabsContent value="notifications" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <Label className="capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </Label>
                                    <Switch
                                        checked={value}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, [key]: checked }))
                                        }
                                    />
                                </div>
                            ))}
                            <Button onClick={() => toast.success("Notification settings saved")}>
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 🛡️ Security */}
                <TabsContent value="security" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>New Password</Label>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleChangePassword}>Change Password</Button>

                            <hr className="my-4" />

                            <div>
                                <Label>Two-Step Verification (Coming Soon)</Label>
                                <p className="text-sm text-muted-foreground">
                                    Enhance account security with an extra verification step.
                                </p>
                            </div>
                            <Switch disabled />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminSettings;
