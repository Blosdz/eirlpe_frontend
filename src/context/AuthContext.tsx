import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface UserProfile {
  id?: number;
  email: string;
  role: "admin" | "user" | string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar desde localStorage en el primer render
    const storedToken = localStorage.getItem("eirl_access_token");
    const storedUser = localStorage.getItem("eirl_user");

    console.log("========== AUTH CONTEXT INIT ==========");
    console.log("storedToken:", storedToken ? "exists" : "null");
    console.log("storedUser:", storedUser);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      } catch (e) {
        console.error("Error parsing stored user", e);
        localStorage.removeItem("eirl_user");
      }
    }

    setIsLoading(false);
    console.log("Auth loading complete");
    console.log("======================================");
  }, []);

  const login = (newToken: string, newUser: UserProfile) => {
    console.log("========== AUTH CONTEXT LOGIN ==========");
    console.log("newToken:", newToken);
    console.log("newUser:", newUser);
    console.log("newUser.role:", newUser.role);
    console.log("typeof newUser.role:", typeof newUser.role);
    console.log("======================================");

    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("eirl_access_token", newToken);
    localStorage.setItem("eirl_user", JSON.stringify(newUser));

    console.log("Stored in localStorage:", localStorage.getItem("eirl_user"));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("eirl_access_token");
    localStorage.removeItem("eirl_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
