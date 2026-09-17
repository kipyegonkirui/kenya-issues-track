import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "sonner";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/AuthModal";
import NotificationsBell from "@/components/NotificationsBell"; // ✅ added

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // 🔹 Watch login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const handleLoginClick = () => setAuthModalOpen(true);

  const handleAuthSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
    toast.success(`Welcome back, ${loggedInUser.email}!`);
    setAuthModalOpen(false);
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo or title */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Kenya Issues
        </h1>

        {/* Right side: notifications + profile */}
        {user ? (
          <div className="flex items-center gap-4">
            {/* 🔔 Notifications */}
            <NotificationsBell />

            {/* 👤 Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted rounded-full transition"
                >
                  <User className="h-6 w-6 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-issues")}>
                  My Issues
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </div>

      {/* 🔹 Auth modal mounted below */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </nav>
  );
};

export default Navigation;
