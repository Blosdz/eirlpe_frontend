import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Trash2,
  Search,
  Shield,
  User as UserIcon,
  Calendar,
} from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";

interface User {
  id: number;
  email: string;
  role: string;
  created_at?: string;
}

export default function UserList() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al cargar usuarios");
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al eliminar");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error("Error al actualizar rol");
      setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const targetUserEmail = userToDelete
    ? users.find((u) => u.id === userToDelete)?.email
    : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif text-charcoal dark:text-primary">
          Gestión de Usuarios
        </h2>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-primary/40" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-xl border border-charcoal/10 dark:border-primary/20 bg-white dark:bg-surface-dark focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-primary/20 outline-none transition-all text-charcoal dark:text-primary"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>
      )}

      <div className="bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-charcoal/5 dark:bg-primary/5 text-charcoal/60 dark:text-primary/60 text-sm font-medium uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  ID
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Email
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Rol
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Fecha Registro
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5 dark:divide-primary/10 text-charcoal dark:text-primary">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-charcoal/50 dark:text-primary/50"
                  >
                    Cargando...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-charcoal/50 dark:text-primary/50"
                  >
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-charcoal/[0.02] dark:hover:bg-primary/[0.02] transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-mono text-sm">{user.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-charcoal/10 dark:bg-primary/10 flex items-center justify-center">
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{user.email}</span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="bg-transparent border border-charcoal/20 dark:border-primary/30 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-charcoal dark:focus:border-primary focus:ring-2 focus:ring-charcoal/10 dark:focus:ring-primary/10"
                        >
                          <option value="user" className="text-black">
                            User
                          </option>
                          <option value="admin" className="text-black">
                            Admin
                          </option>
                        </select>
                        {user.role === "admin" && (
                          <span title="Administrador">
                            <Shield className="w-4 h-4 text-amber-500" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {user.created_at ? (
                        <div className="flex items-center gap-2 text-sm text-charcoal/60 dark:text-primary/60">
                          <Calendar className="w-4 h-4" />
                          {new Date(user.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      ) : (
                        <span className="text-charcoal/40 dark:text-primary/40 italic text-sm">
                          -
                        </span>
                      )}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => setUserToDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete !== null) {
            handleDelete(userToDelete);
          }
        }}
        title="Eliminar usuario"
        description={
          <>
            ¿Estás seguro de que deseas eliminar permanentemente al usuario{" "}
            <span className="font-bold text-charcoal dark:text-primary">
              {targetUserEmail}
            </span>
            ? Esta acción no se puede deshacer.
          </>
        }
        confirmText="Eliminar permanentemente"
      />
    </div>
  );
}
