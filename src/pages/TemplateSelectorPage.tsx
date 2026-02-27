import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import { getTemplates, getPreviewUrl } from '../api/templates';
import type { TemplateMeta } from '../api/templates';

const IFRAME_NATURAL_WIDTH = 1280;
const IFRAME_NATURAL_HEIGHT = 960;

function TemplateCard({
    template,
    selected,
    onSelect,
}: {
    template: TemplateMeta;
    selected: boolean;
    onSelect: () => void;
}) {
    const hasValidId = Boolean(template.id);
    const previewUrl = hasValidId ? getPreviewUrl(template.id) : '';
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            setScale(width / IFRAME_NATURAL_WIDTH);
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`group text-left rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                selected
                    ? 'border-accent dark:border-accent-light ring-2 ring-accent/20 dark:ring-accent-light/30 scale-[1.02]'
                    : 'border-charcoal/10 dark:border-primary/30 hover:border-accent/30 dark:hover:border-accent-light/30 hover:shadow-lg dark:hover:shadow-accent/10'
            }`}
        >
            {/* Preview del template en iframe escalado dinámicamente */}
            <div ref={containerRef} className="relative aspect-[4/3] bg-charcoal/5 dark:bg-primary/10 overflow-hidden">
                {hasValidId && previewUrl ? (
                    <iframe
                        title={`Vista previa: ${template.name}`}
                        src={previewUrl}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: `${IFRAME_NATURAL_WIDTH}px`,
                            height: `${IFRAME_NATURAL_HEIGHT}px`,
                            border: 'none',
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                            pointerEvents: 'none',
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-beige dark:text-primary/50 text-sm">
                        Vista previa no disponible
                    </div>
                )}
                {selected && (
                    <div className="absolute top-4 right-4 size-8 sm:size-10 rounded-full bg-accent dark:bg-accent-light text-white flex items-center justify-center shadow-lg shadow-accent/25">
                        <span className="material-symbols-outlined text-lg sm:text-xl">check</span>
                    </div>
                )}
            </div>
            <div className="p-5 sm:p-6 bg-white dark:bg-surface-dark dark:border-t dark:border-primary/20 space-y-2 sm:space-y-3 transition-colors duration-500">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal dark:text-primary-bright tracking-tight">
                        {template.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-muted-beige dark:text-primary/85 border border-charcoal/10 dark:border-primary/35 px-2.5 py-1 rounded-full shrink-0">
                        {template.category}
                    </span>
                </div>
                {template.description && (
                    <p className="text-sm sm:text-base text-muted-beige dark:text-primary-bright/95 leading-relaxed">
                        {template.description}
                    </p>
                )}
            </div>
        </button>
    );
}

export default function TemplateSelectorPage() {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const [templates, setTemplates] = useState<TemplateMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const domainDisplay = domain ? `${domain}.eirl.pe` : '';

    useEffect(() => {
        getTemplates()
            .then(setTemplates)
            .catch(() => setError('No se pudieron cargar los templates.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light dark:bg-transparent font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-24 sm:pb-28 md:pb-32 lg:pb-36 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 min-w-0">
                <div className="mx-auto max-w-7xl min-w-0">
                    <div className="mb-10 sm:mb-12 md:mb-14">
                        <Stepper currentStep={1} />
                    </div>

                    <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1.5 text-sm sm:text-base text-muted-beige dark:text-primary/85 hover:text-charcoal dark:hover:text-primary-bright transition-colors mb-2"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Volver
                        </button>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-primary-bright leading-tight">
                            Elige tu <span className="italic font-normal">template</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-muted-beige dark:text-primary-bright/95 font-light max-w-2xl mx-auto">
                            Selecciona el diseño para <span className="font-bold text-charcoal dark:text-primary-bright">{domainDisplay}</span>
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16 gap-2 text-muted-beige dark:text-primary/70">
                            <span className="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                            <span>Cargando plantillas...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 rounded-2xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90">
                            <p className="text-rose-600 dark:text-rose-400 mb-4">{error}</p>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-charcoal/15 dark:border-primary/25 font-semibold text-sm hover:bg-charcoal/5 dark:hover:bg-primary/10"
                            >
                                Reintentar
                            </button>
                        </div>
                    ) : templates.length === 0 ? (
                        <div className="text-center py-12 rounded-2xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90">
                            <p className="text-muted-beige dark:text-primary/80">No hay plantillas disponibles.</p>
                        </div>
                    ) : (
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

                    {createPortal(
                        <div
                            className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out ${
                                selectedTemplate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
                            }`}
                        >
                            <div className="bg-charcoal dark:bg-background-dark border-t border-charcoal/20 dark:border-primary/30 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-3 sm:py-4 transition-colors duration-500">
                                <div className="mx-auto max-w-7xl flex flex-row items-center justify-between gap-3 sm:gap-6 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 min-w-0 overflow-hidden">
                                        <span className="text-primary/60 text-xs sm:text-sm font-light truncate leading-tight">
                                            {domainDisplay}
                                        </span>
                                        <span className="text-primary text-sm sm:text-base font-semibold truncate leading-tight">
                                            {templates.find((t) => t.id === selectedTemplate)?.name}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/registro/${encodeURIComponent(domain || '')}/${encodeURIComponent(selectedTemplate || '')}`,
                                            )
                                        }
                                        className="shrink-0 min-h-[44px] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 bg-accent text-white rounded-full font-bold text-sm sm:text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg shadow-accent/25"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>,
                        document.body,
                    )}
                </div>
            </main>
        </div>
    );
}
