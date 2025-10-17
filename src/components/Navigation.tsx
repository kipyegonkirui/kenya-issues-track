import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AlertCircle, Home, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuth();
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <AlertCircle className="h-6 w-6 text-primary" />
          <span>Kenya Issues</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/issues">
            <Button variant="ghost" size="sm">
              View Issues
            </Button>
          </Link>
          <Link to="/report">
            <Button variant="hero" size="sm">
              Report Issue
            </Button>
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard">
              <Button variant="secondary" size="sm">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
