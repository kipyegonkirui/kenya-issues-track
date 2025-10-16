import { createContext, useContext, useEffect, useState } from "react";

interface User {
  uid: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in - store users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }
    
    const authUser = { uid: foundUser.uid, email: foundUser.email };
    localStorage.setItem("authUser", JSON.stringify(authUser));
    setUser(authUser);
  };

  const signUp = async (email: string, password: string) => {
    // Mock sign up - store users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      throw new Error("Email already exists");
    }
    
    const newUser = {
      uid: Date.now().toString(),
      email,
      password,
    };
    
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    const authUser = { uid: newUser.uid, email: newUser.email };
    localStorage.setItem("authUser", JSON.stringify(authUser));
    setUser(authUser);
  };

  const signOut = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
