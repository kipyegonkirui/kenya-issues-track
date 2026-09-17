import { Navigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import { isCountyAdmin } from "@/lib/roles";

interface Props {
    children: React.ReactNode;
}

// Grants access to county_admin and admin only.
const CountyAdminRoute: React.FC<Props> = ({ children }) => {
    const { user, profile, loading } = useUserRole();

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return isCountyAdmin(profile) ? <>{children}</> : <Navigate to="/not-authorized" replace />;
};

export default CountyAdminRoute;
