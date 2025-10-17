import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

// NOTE: This uses localStorage for role checking which is NOT secure for production.
// In production, use server-side validation with proper authentication (Supabase RLS, JWT, etc.)
const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
