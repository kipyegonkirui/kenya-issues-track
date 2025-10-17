import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <p className="text-xl text-muted-foreground">
            You don't have permission to access this page
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button variant="outline">Return Home</Button>
          </Link>
          <Link to="/issues">
            <Button variant="default">View Issues</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
