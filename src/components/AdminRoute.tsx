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

    // Matches the same "role" field AdminLogin.tsx checks in Firestore —
    // only an actual admin gets past this guard, not just any logged-in user.
    const isAdmin = !!user && role === "admin";

    return isAdmin ? <>{children}</> : <Navigate to="/not-authorized" replace />;
};

export default AdminRoute;
