import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Users,
  Globe,
  ArrowRight,
  Layout,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalUsers: number;
  totalHostnames: number;
  activeHostnames: number;
  adminUsers: number;
}

export default function AdminDashboardPlaceholder() {
  const { user, token } = useAuth();

  console.log("========== ADMIN DASHBOARD RENDERING ==========");
  console.log("user:", user);
  console.log("token:", token);
  console.log("==============================================");

  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHostnames: 0,
    activeHostnames: 0,
    adminUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;

      try {
        // Fetch users
        const usersRes = await fetch("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = await usersRes.json();

        // Fetch hostnames
        const hostnamesRes = await fetch("/api/hostnames", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const hostnames = await hostnamesRes.json();

        setStats({
          totalUsers: users.length,
          totalHostnames: hostnames.length,
          activeHostnames: hostnames.length, // Todos los hostnames se asumen activos por ahora
          adminUsers: users.filter((u: any) => u.role === "admin").length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif text-charcoal dark:text-primary">
          Hola, {user?.email || "Administrador"}
        </h2>
        <p className="text-muted-beige dark:text-primary/80 text-lg">
          Bienvenido al panel de administración de la plataforma.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <Activity className="w-4 h-4 text-blue-400 dark:text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {loading ? "..." : stats.totalUsers}
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            Total Usuarios
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <TrendingUp className="w-4 h-4 text-purple-400 dark:text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {loading ? "..." : stats.totalHostnames}
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
            Total Hostnames
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">
            {loading ? "..." : stats.activeHostnames}
          </p>
          <p className="text-sm text-green-700 dark:text-green-300 font-medium">
            Hostnames Activos
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-700/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <span className="px-2 py-0.5 bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-amber-100 text-xs font-bold rounded">
              ADMIN
            </span>
          </div>
          <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">
            {loading ? "..." : stats.adminUsers}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
            Administradores
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 bg-charcoal/5 dark:bg-primary/10 text-charcoal/60 dark:text-primary/70 text-xs font-bold uppercase tracking-wider rounded-full">
              Gestión
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoal dark:text-primary mb-2">
              Usuarios de la Plataforma
            </h3>
            <p className="text-charcoal/60 dark:text-primary/60 text-sm mb-6">
              Administra los usuarios registrados, cambia sus roles y elimina
              cuentas que ya no están activas.
            </p>
            <Link
              to="/admin/users"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal dark:text-primary hover:opacity-70 transition-opacity"
            >
              Ver usuarios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hostnames Card */}
        <div className="bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 bg-charcoal/5 dark:bg-primary/10 text-charcoal/60 dark:text-primary/70 text-xs font-bold uppercase tracking-wider rounded-full">
              Gestión
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoal dark:text-primary mb-2">
              Hostnames Activos
            </h3>
            <p className="text-charcoal/60 dark:text-primary/60 text-sm mb-6">
              Supervisa los subdominios creados por los tenants. Puedes
              visualizar a qué usuario pertenecen y eliminarlos.
            </p>
            <Link
              to="/admin/hostnames"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal dark:text-primary hover:opacity-70 transition-opacity"
            >
              Ver hostnames <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Templates Card */}
        <div className="bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layout className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 bg-charcoal/5 dark:bg-primary/10 text-charcoal/60 dark:text-primary/70 text-xs font-bold uppercase tracking-wider rounded-full">
              Gestión
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-charcoal dark:text-primary mb-2">
              Templates
            </h3>
            <p className="text-charcoal/60 dark:text-primary/60 text-sm mb-6">
              Revisa los templates disponibles y las configuraciones de los
              tenants activos.
            </p>
            <Link
              to="/admin/templates"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal dark:text-primary hover:opacity-70 transition-opacity"
            >
              Ver templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
