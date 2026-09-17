import { Navigate } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, role, loading } = useUserRole();

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Role is stored lowercased ("admin"/"staff"/"user"); normalize defensively
    // in case older records still have capitalized values.
    const isAdmin = role?.toLowerCase() === "admin";

    return isAdmin ? <>{children}</> : <Navigate to="/not-authorized" replace />;
};

export default AdminRoute;
