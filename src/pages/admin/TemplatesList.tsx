import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Search, Layout, Eye, RefreshCw } from "lucide-react";

interface HostnameWithConfig {
  id: number;
  hostname: string;
  userId: number;
  created_at?: string;
  config?: {
    templateId: string;
    businessName: string;
    isActive: boolean;
  };
}

const TEMPLATE_INFO: Record<
  string,
  { name: string; description: string; color: string }
> = {
  "plan-basico-opcion-1": {
    name: "Plan Básico - Opción 1",
    description: "Diseño moderno con iconos y secciones destacadas",
    color: "blue",
  },
  "plan-basico-opcion-2": {
    name: "Plan Básico - Opción 2",
    description: "Diseño clásico y minimalista",
    color: "purple",
  },
};

export default function TemplatesList() {
  const { token } = useAuth();
  const [hostnames, setHostnames] = useState<HostnameWithConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingConfigs, setLoadingConfigs] = useState<Record<number, boolean>>(
    {},
  );

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

  const fetchConfigForHostname = async (
    hostnameId: number,
    hostname: string,
  ) => {
    setLoadingConfigs((prev) => ({ ...prev, [hostnameId]: true }));
    try {
      const response = await fetch("/api/tenant-config", {
        headers: {
          "x-tenant-host": hostname,
        },
      });
      if (response.ok) {
        const config = await response.json();
        setHostnames((prev) =>
          prev.map((h) =>
            h.id === hostnameId
              ? {
                  ...h,
                  config: {
                    templateId: config.templateId,
                    businessName: config.businessName,
                    isActive: config.isActive,
                  },
                }
              : h,
          ),
        );
      }
    } catch (err) {
      console.error(`Error fetching config for ${hostname}:`, err);
    } finally {
      setLoadingConfigs((prev) => ({ ...prev, [hostnameId]: false }));
    }
  };

  useEffect(() => {
    if (token) fetchHostnames();
  }, [token]);

  const filteredHostnames = hostnames.filter(
    (h) =>
      h.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.config?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const templateStats = hostnames.reduce(
    (acc, h) => {
      if (h.config?.templateId) {
        acc[h.config.templateId] = (acc[h.config.templateId] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-charcoal dark:text-primary">
            Gestión de Templates
          </h2>
          <p className="text-sm text-charcoal/60 dark:text-primary/60 mt-1">
            Supervisa los templates utilizados por cada hostname
          </p>
        </div>

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

      {/* Template Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/30 rounded-xl p-6">
          <Layout className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {templateStats["plan-basico-opcion-1"] || 0}
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            Plan Básico - Opción 1
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700/30 rounded-xl p-6">
          <Layout className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {templateStats["plan-basico-opcion-2"] || 0}
          </p>
          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
            Plan Básico - Opción 2
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border border-gray-200 dark:border-gray-700/30 rounded-xl p-6">
          <Layout className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {hostnames.filter((h) => !h.config).length}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Sin configurar
          </p>
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
                  Hostname
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Nombre Negocio
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Template
                </th>
                <th className="p-4 font-bold border-b border-charcoal/5 dark:border-primary/10">
                  Estado
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
                filteredHostnames.map((hostname) => {
                  const templateInfo = hostname.config?.templateId
                    ? TEMPLATE_INFO[hostname.config.templateId]
                    : null;

                  return (
                    <tr
                      key={hostname.id}
                      className="hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors"
                    >
                      <td className="p-4 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">
                            {hostname.hostname}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        {hostname.config?.businessName || (
                          <span className="text-charcoal/40 dark:text-primary/40 italic text-sm">
                            No configurado
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {templateInfo ? (
                          <div>
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-bold bg-${templateInfo.color}-100 dark:bg-${templateInfo.color}-900/30 text-${templateInfo.color}-700 dark:text-${templateInfo.color}-300`}
                            >
                              {templateInfo.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-charcoal/40 dark:text-primary/40 italic text-sm">
                            Sin template
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {hostname.config ? (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                              hostname.config.isActive
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${hostname.config.isActive ? "bg-green-500" : "bg-gray-500"}`}
                            />
                            {hostname.config.isActive ? "Activo" : "Inactivo"}
                          </span>
                        ) : (
                          <span className="text-charcoal/40 dark:text-primary/40 italic text-sm">
                            -
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!hostname.config && (
                            <button
                              onClick={() =>
                                fetchConfigForHostname(
                                  hostname.id,
                                  hostname.hostname,
                                )
                              }
                              disabled={loadingConfigs[hostname.id]}
                              className="p-2 hover:bg-charcoal/5 dark:hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
                              title="Cargar configuración"
                            >
                              <RefreshCw
                                className={`w-4 h-4 ${loadingConfigs[hostname.id] ? "animate-spin" : ""}`}
                              />
                            </button>
                          )}
                          <a
                            href={`https://${hostname.hostname}.eirl.pe`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-charcoal/5 dark:hover:bg-primary/10 rounded-lg transition-colors"
                            title="Ver sitio"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
