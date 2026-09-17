import { Navigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { isWardOfficer } from "@/lib/roles";

interface Props {
    children: React.ReactNode;
}

// Grants access to ward_officer, county_admin, and admin (each higher role
// can see everything a ward officer can, since they oversee ward officers).
const WardOfficerRoute: React.FC<Props> = ({ children }) => {
    const { user, profile, loading } = useUserRole();

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return isWardOfficer(profile) ? <>{children}</> : <Navigate to="/not-authorized" replace />;
};

export default WardOfficerRoute;
