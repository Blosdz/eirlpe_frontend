import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Globe, User, Home } from "lucide-react";

export default function StandardLayout() {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Mis Dominios", href: "/dashboard/dominios", icon: Globe },
    { name: "Perfil", href: "/dashboard/perfil", icon: User },
  ];

  return (
    <div className="relative z-10 min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-surface-dark border-r border-charcoal/10 dark:border-primary/20 flex flex-col md:min-h-screen">
        <div className="p-6 border-b border-charcoal/10 dark:border-primary/20">
          <h1 className="text-2xl font-serif text-charcoal dark:text-primary">
            EIRL.pe
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/dashboard" &&
                location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-charcoal text-primary dark:bg-primary dark:text-charcoal"
                    : "text-charcoal/70 dark:text-primary/70 hover:bg-charcoal/5 dark:hover:bg-primary/10"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-charcoal/10 dark:border-primary/20">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-charcoal/10 dark:bg-primary/20 flex items-center justify-center text-charcoal dark:text-primary font-bold">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-charcoal dark:text-primary truncate">
                {user?.name || "Usuario"}
              </p>
              <p className="text-xs text-charcoal/50 dark:text-primary/50 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
        <div className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
