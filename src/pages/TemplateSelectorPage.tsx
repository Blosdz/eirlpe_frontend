import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Header from "../components/Header";
import Stepper from "../components/Stepper";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  accent: string;
}

// const TEMPLATES: Template[] = [
//     {
//         id: 'minimal',
//         name: 'Minimal',
//         description: 'Diseño limpio y elegante. Ideal para consultores y profesionales independientes.',
//         category: 'Profesional',
//         preview: 'from-stone-100 to-stone-50',
//         accent: 'bg-stone-800',
//     },
//     {
//         id: 'bold',
//         name: 'Bold',
//         description: 'Tipografía fuerte y contrastes marcados. Perfecto para startups y agencias.',
//         category: 'Creativo',
//         preview: 'from-zinc-900 to-zinc-800',
//         accent: 'bg-amber-400',
//     },
//     {
//         id: 'serene',
//         name: 'Serene',
//         description: 'Tonos suaves y espacios amplios. Para coaches, terapeutas y bienestar.',
//         category: 'Bienestar',
//         preview: 'from-sky-50 to-teal-50',
//         accent: 'bg-teal-600',
//     },
//     {
//         id: 'classic',
//         name: 'Classic',
//         description: 'Estructura formal y confiable. Abogados, contadores y firmas profesionales.',
//         category: 'Corporativo',
//         preview: 'from-slate-800 to-slate-700',
//         accent: 'bg-amber-300',
//     },
//     {
//         id: 'vivid',
//         name: 'Vivid',
//         description: 'Colores vibrantes y energía visual. Restaurantes, tiendas y marcas jóvenes.',
//         category: 'Comercial',
//         preview: 'from-rose-50 to-orange-50',
//         accent: 'bg-rose-500',
//     },
//     {
//         id: 'architect',
//         name: 'Architect',
//         description: 'Grid preciso y líneas definidas. Arquitectos, diseñadores e ingenieros.',
//         category: 'Técnico',
//         preview: 'from-neutral-100 to-neutral-200',
//         accent: 'bg-neutral-900',
//     },
// ];

// Fallback visual data for templates since backend currently returns only {id, name}
const TEMPLATE_VISUALS: Record<string, Partial<Template>> = {
  "plan-basico-opcion-1": {
    description:
      "Muestra tu negocio con un diseño moderno, secciones claras e iconos llamativos.",
    category: "Moderno",
    preview: "from-stone-100 to-stone-50",
    accent: "bg-stone-800",
  },
  "plan-basico-opcion-2": {
    description:
      "Estructura formal y confiable, perfecta para profesionales y firmas.",
    category: "Clásico",
    preview: "from-slate-800 to-slate-700",
    accent: "bg-amber-300",
  },
};

const DEFAULT_VISUAL: Partial<Template> = {
  description: "Diseño limpio y elegante listo para personalizarse.",
  category: "Estándar",
  preview: "from-zinc-900 to-zinc-800",
  accent: "bg-amber-400",
};

function TemplateCard({
  template,
  selected,
  onSelect,
}: {
  template: Template;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`group text-left rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        selected
          ? "border-accent dark:border-accent-light ring-2 ring-accent/20 dark:ring-accent-light/30 scale-[1.02]"
          : "border-charcoal/10 dark:border-primary/30 hover:border-accent/30 dark:hover:border-accent-light/30 hover:shadow-lg dark:hover:shadow-accent/10"
      }`}
    >
      {/* Preview - mantiene los colores del template como preview visual */}

      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${template.preview} p-6 sm:p-8 flex flex-col justify-between`}
      >
        <div className="space-y-2">
          <div className={`h-1.5 w-12 rounded-full ${template.accent}`} />
          <div
            className={`h-1 w-20 rounded-full ${template.accent} opacity-30`}
          />
        </div>
        <div className="space-y-2">
          <div
            className={`h-3 sm:h-4 w-3/4 rounded ${template.accent} opacity-80`}
          />
          <div
            className={`h-3 sm:h-4 w-1/2 rounded ${template.accent} opacity-60`}
          />
          <div
            className={`h-1.5 w-full rounded-full ${template.accent} opacity-10 mt-4`}
          />
          <div
            className={`h-1.5 w-5/6 rounded-full ${template.accent} opacity-10`}
          />
        </div>
        {selected && (
          <div className="absolute top-4 right-4 size-8 sm:size-10 rounded-full bg-accent dark:bg-accent-light text-white flex items-center justify-center shadow-lg shadow-accent/25">
            <span className="material-symbols-outlined text-lg sm:text-xl">
              check
            </span>
          </div>
        )}
      </div>
      {/* Info - modo oscuro: fondo y texto claros */}
      <div className="p-5 sm:p-6 bg-white dark:bg-surface-dark dark:border-t dark:border-primary/20 space-y-2 sm:space-y-3 transition-colors duration-500">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal dark:text-primary-bright tracking-tight">
            {template.name}
          </h3>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-muted-beige dark:text-primary/85 border border-charcoal/10 dark:border-primary/35 px-2.5 py-1 rounded-full">
            {template.category}
          </span>
        </div>
        <p className="text-sm sm:text-base text-muted-beige dark:text-primary-bright/95 leading-relaxed">
          {template.description}
        </p>
      </div>
    </button>
  );
}

export default function TemplateSelectorPage() {
  const { domain } = useParams<{ domain: string }>();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname.endsWith(".localhost");
  const domainDisplay = domain
    ? `${domain}${isLocal ? ".localhost" : ".eirl.pe"}`
    : "";

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Since this is public, we don't necessarily need a tenant host header,
        // but the endpoint `/api/tenant-page/templates` expects one according to docs.
        // It just reads the directory though. We pass the requested domain as tenant.
        const response = await fetch("/api/tenant-page/templates", {
          headers: { "x-tenant-host": domain || "localhost" },
        });

        if (!response.ok) throw new Error("Error al cargar templates");

        const json = await response.json();
        const templateIds: string[] = json.templates || [];

        // Merge api data with visual mock data
        const mergedTemplates: Template[] = templateIds.map((id) => {
          const visual = TEMPLATE_VISUALS[id] || DEFAULT_VISUAL;
          // Auto-generate name from ID if not provided by backend
          const name = id
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

          return {
            id: id,
            name: name,
            description: visual.description!,
            category: visual.category!,
            preview: visual.preview!,
            accent: visual.accent!,
          };
        });

        setTemplates(mergedTemplates);
      } catch (err: any) {
        setError(err.message || "Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [domain]);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background-light dark:bg-transparent font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-24 sm:pb-28 md:pb-32 lg:pb-36 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 min-w-0">
        <div className="mx-auto max-w-7xl min-w-0">
          {/* Stepper */}
          <div className="mb-10 sm:mb-12 md:mb-14">
            <Stepper currentStep={1} />
          </div>

          {/* Header de la sección */}
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base text-muted-beige dark:text-primary/85 hover:text-charcoal dark:hover:text-primary-bright transition-colors mb-2"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              Volver
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-primary-bright leading-tight">
              Elige tu <span className="italic font-normal">template</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-beige dark:text-primary-bright/95 font-light max-w-2xl mx-auto">
              Selecciona el diseño para{" "}
              <span className="font-bold text-charcoal dark:text-primary-bright">
                {domainDisplay}
              </span>
            </p>
          </div>
          {/* Template States */}
          {loading && (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-charcoal/50 dark:text-primary/50">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="font-bold tracking-wide">Cargando templates...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center p-12 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-3xl border border-red-100 dark:border-red-900/30">
              <p className="text-lg font-bold mb-2">Error</p>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-100 dark:bg-red-900/30 rounded-full font-bold hover:bg-red-200 transition-colors"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Grid de templates */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  selected={selectedTemplate === template.id}
                  onSelect={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
          )}

          {/* Barra inferior fija con CTA */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out pb-safe ${
              selectedTemplate
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className="bg-charcoal dark:bg-background-dark border-t border-charcoal/20 dark:border-primary/30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-5 transition-colors duration-500">
              <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 truncate">
                  <span className="text-primary/70 text-sm sm:text-base font-light truncate">
                    {domainDisplay}
                  </span>
                  <span className="text-primary/30 hidden sm:inline">/</span>
                  <span className="text-primary text-sm sm:text-base font-bold hidden sm:inline">
                    {selectedTemplate || "Selecciona un template"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/registro/${encodeURIComponent(domain || "")}/${encodeURIComponent(selectedTemplate || "")}`,
                    )
                  }
                  className="shrink-0 w-full sm:w-auto min-h-[44px] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 bg-accent text-white rounded-full font-bold text-sm sm:text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg shadow-accent/25"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
