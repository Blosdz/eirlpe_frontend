import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Trash2, Search, ExternalLink, Calendar, User } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal";

interface Hostname {
  id: number;
  hostname: string;
  userId: number;
  created_at?: string;
}

export default function HostnameList() {
  const { token } = useAuth();
  const [hostnames, setHostnames] = useState<Hostname[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [hostnameToDelete, setHostnameToDelete] = useState<number | null>(null);

  const fetchHostnames = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/hostnames", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al cargar hostnames");
      const data = await response.json();
      setHostnames(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchHostnames();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/hostnames/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al eliminar");
      setHostnames(hostnames.filter((h) => h.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredHostnames = hostnames.filter((h) =>
    h.hostname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const targetHostnameObj = hostnameToDelete
    ? hostnames.find((h) => h.id === hostnameToDelete)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-serif text-charcoal dark:text-primary">
          Gestión de Hostnames
        </h2>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-primary/40" />
          <input
            type="text"
            placeholder="Buscar hostname..."
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
                  Hostname
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  ID Usuario
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Fecha Creación
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
              ) : filteredHostnames.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-charcoal/50 dark:text-primary/50"
                  >
                    No se encontraron hostnames
                  </td>
                </tr>
              ) : (
                filteredHostnames.map((hostname) => (
                  <tr
                    key={hostname.id}
                    className="hover:bg-charcoal/[0.02] dark:hover:bg-primary/[0.02] transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-mono text-sm">{hostname.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-mono text-sm rounded border border-purple-200 dark:border-purple-700">
                          {hostname.hostname}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-charcoal/60 dark:text-primary/70">
                        <User className="w-4 h-4" />
                        <span className="font-mono text-sm">
                          {hostname.userId}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      {hostname.created_at ? (
                        <div className="flex items-center gap-2 text-sm text-charcoal/60 dark:text-primary/60">
                          <Calendar className="w-4 h-4" />
                          {new Date(hostname.created_at).toLocaleDateString(
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
                    <td className="p-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://${hostname.hostname}.eirl.pe`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="Ver sitio"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setHostnameToDelete(hostname.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Eliminar hostname"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={hostnameToDelete !== null}
        onClose={() => setHostnameToDelete(null)}
        onConfirm={() => {
          if (hostnameToDelete !== null) {
            handleDelete(hostnameToDelete);
          }
        }}
        title="Eliminar hostname"
        description={
          <>
            Atención: eliminar el hostname{" "}
            <span className="font-bold text-red-600 dark:text-red-400">
              {targetHostnameObj?.hostname}
            </span>{" "}
            es una acción altamente destructiva del sistema que afectará
            directamente el sitio web del cliente y la visibilidad de su
            contenido. No se podrá deshacer. ¿Deseas proceder?
          </>
        }
        confirmText="Eliminar permanentemente"
      />
    </div>
  );
}
