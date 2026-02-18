import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Stepper from '../components/Stepper';

interface Template {
    id: string;
    name: string;
    description: string;
    category: string;
    preview: string; // gradient/color usado como preview
    accent: string;
}

const TEMPLATES: Template[] = [
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Diseño limpio y elegante. Ideal para consultores y profesionales independientes.',
        category: 'Profesional',
        preview: 'from-stone-100 to-stone-50',
        accent: 'bg-stone-800',
    },
    {
        id: 'bold',
        name: 'Bold',
        description: 'Tipografía fuerte y contrastes marcados. Perfecto para startups y agencias.',
        category: 'Creativo',
        preview: 'from-zinc-900 to-zinc-800',
        accent: 'bg-amber-400',
    },
    {
        id: 'serene',
        name: 'Serene',
        description: 'Tonos suaves y espacios amplios. Para coaches, terapeutas y bienestar.',
        category: 'Bienestar',
        preview: 'from-sky-50 to-teal-50',
        accent: 'bg-teal-600',
    },
    {
        id: 'classic',
        name: 'Classic',
        description: 'Estructura formal y confiable. Abogados, contadores y firmas profesionales.',
        category: 'Corporativo',
        preview: 'from-slate-800 to-slate-700',
        accent: 'bg-amber-300',
    },
    {
        id: 'vivid',
        name: 'Vivid',
        description: 'Colores vibrantes y energía visual. Restaurantes, tiendas y marcas jóvenes.',
        category: 'Comercial',
        preview: 'from-rose-50 to-orange-50',
        accent: 'bg-rose-500',
    },
    {
        id: 'architect',
        name: 'Architect',
        description: 'Grid preciso y líneas definidas. Arquitectos, diseñadores e ingenieros.',
        category: 'Técnico',
        preview: 'from-neutral-100 to-neutral-200',
        accent: 'bg-neutral-900',
    },
];

function TemplateCard({ template, selected, onSelect }: { template: Template; selected: boolean; onSelect: () => void }) {
    return (
        <button
            onClick={onSelect}
            className={`group text-left rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                selected
                    ? 'border-accent ring-2 ring-accent/20 scale-[1.02]'
                    : 'border-charcoal/10 hover:border-accent/30:border-accent-light/30 hover:shadow-lg'
            }`}
        >
            {/* Preview */}
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${template.preview} p-6 sm:p-8 flex flex-col justify-between`}>
                {/* Mini layout simulado */}
                <div className="space-y-2">
                    <div className={`h-1.5 w-12 rounded-full ${template.accent}`} />
                    <div className={`h-1 w-20 rounded-full ${template.accent} opacity-30`} />
                </div>
                <div className="space-y-2">
                    <div className={`h-3 sm:h-4 w-3/4 rounded ${template.accent} opacity-80`} />
                    <div className={`h-3 sm:h-4 w-1/2 rounded ${template.accent} opacity-60`} />
                    <div className={`h-1.5 w-full rounded-full ${template.accent} opacity-10 mt-4`} />
                    <div className={`h-1.5 w-5/6 rounded-full ${template.accent} opacity-10`} />
                </div>
                {/* Checkmark */}
                {selected && (
                    <div className="absolute top-4 right-4 size-8 sm:size-10 rounded-full bg-accent text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-lg sm:text-xl">check</span>
                    </div>
                )}
            </div>
            {/* Info */}
            <div className="p-5 sm:p-6 bg-white space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal tracking-tight">{template.name}</h3>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-muted-beige border border-charcoal/10 px-2.5 py-1 rounded-full">
                        {template.category}
                    </span>
                </div>
                <p className="text-sm sm:text-base text-muted-beige leading-relaxed">{template.description}</p>
            </div>
        </button>
    );
}

export default function TemplateSelectorPage() {
    const { domain } = useParams<{ domain: string }>();
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const domainDisplay = domain ? `${domain}.eirl.pe` : '';

    return (
        <div className="min-h-screen bg-background-light font-display text-charcoal">
            <Header />
            <main className="pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 px-6 sm:px-8 md:px-12 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    {/* Stepper */}
                    <div className="mb-10 sm:mb-12 md:mb-14">
                        <Stepper currentStep={1} />
                    </div>

                    {/* Header de la sección */}
                    <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center gap-1.5 text-sm sm:text-base text-muted-beige hover:text-charcoal:text-primary transition-colors mb-2"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Volver
                        </button>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                            Elige tu <span className="italic font-normal">template</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-muted-beige font-light max-w-2xl mx-auto">
                            Selecciona el diseño para <span className="font-bold text-charcoal">{domainDisplay}</span>
                        </p>
                    </div>

                    {/* Grid de templates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {TEMPLATES.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                selected={selectedTemplate === template.id}
                                onSelect={() => setSelectedTemplate(template.id)}
                            />
                        ))}
                    </div>

                    {/* Barra inferior fija con CTA */}
                    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
                        selectedTemplate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}>
                        <div className="bg-charcoal border-t border-charcoal/20 px-6 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5">
                            <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                    <span className="text-primary/70 text-sm sm:text-base font-light truncate">
                                        {domainDisplay}
                                    </span>
                                    <span className="text-primary/30 hidden sm:inline">/</span>
                                    <span className="text-primary text-sm sm:text-base font-bold hidden sm:inline">
                                        {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                                    </span>
                                </div>
                                <button
                                    onClick={() => navigate(`/registro/${encodeURIComponent(domain || '')}/${encodeURIComponent(selectedTemplate || '')}`)}
                                    className="shrink-0 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 bg-accent text-white rounded-full font-bold text-sm sm:text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg shadow-accent/25"
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
