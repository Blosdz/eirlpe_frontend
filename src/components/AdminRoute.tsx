import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, user, isLoading } = useAuth();

  console.log("========== ADMIN ROUTE CHECK ==========");
  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("isAdmin:", isAdmin);
  console.log("user:", user);
  console.log("user?.role:", user?.role);
  console.log("user?.role === 'admin':", user?.role === "admin");
  console.log("typeof user?.role:", typeof user?.role);
  console.log("======================================");

  if (isLoading) {
    console.log("⏳ Loading auth state...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal dark:border-primary mx-auto mb-4"></div>
          <p className="text-charcoal/60 dark:text-primary/60">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("❌ Not authenticated, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log("❌ Not admin, redirecting to /dashboard");
    console.log("Reason: user.role is '" + user?.role + "' not 'admin'");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("✅ Admin access granted");
  return <Outlet />;
}
