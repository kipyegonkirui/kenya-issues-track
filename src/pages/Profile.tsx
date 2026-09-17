import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useUserRole } from "@/hooks/useUserRole";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ROLE_LABELS } from "@/lib/roles";
import { getCountyName, getWardName } from "@/lib/counties";

const Profile = () => {
    const { user, profile, loading } = useUserRole();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        toast.success("Logged out successfully!");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin mr-2 h-5 w-5 text-primary" />
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-muted-foreground mb-4">
                        You must be logged in to view your profile.
                    </p>
                    <Button onClick={() => navigate("/")}>Go Home</Button>
                </div>
            </div>
        );
    }

    const displayName = profile?.displayName || user.displayName || user.email;

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container px-4 py-12">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>{displayName}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Role</p>
                                <p>{profile ? ROLE_LABELS[profile.role] : "Citizen"}</p>
                            </div>
                            {profile?.county && (
                                <div>
                                    <p className="text-sm text-muted-foreground">County</p>
                                    <p>{getCountyName(profile.county)}</p>
                                </div>
                            )}
                            {profile?.ward && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Ward</p>
                                    <p>{getWardName(profile.county, profile.ward)}</p>
                                </div>
                            )}
                            {profile?.department && (
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <p>{profile.department}</p>
                                </div>
                            )}
                            <div className="flex gap-4 pt-4">
                                <Button onClick={() => navigate("/my-issues")}>
                                    My Issues
                                </Button>
                                <Button variant="outline" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
