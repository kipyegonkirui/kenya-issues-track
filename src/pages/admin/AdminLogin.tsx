import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  if (user?.role === 'admin') {
    navigate("/admin/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      
      // Check if user is admin after sign in
      const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
      if (authUser.role !== 'admin') {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have admin privileges",
        });
        return;
      }

      toast({
        title: "Welcome Admin",
        description: "Successfully logged in to admin dashboard",
      });
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <ShieldCheck className="h-12 w-12 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl">Admin Login</CardTitle>
            <CardDescription>
              Access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-info/10 rounded-lg border border-info/20">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-info mb-1">Demo Admin Credentials:</p>
                <p className="text-muted-foreground">
                  To create an admin account, sign up normally and manually set role to 'admin' in localStorage
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
