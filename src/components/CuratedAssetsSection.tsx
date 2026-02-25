const GRADIENTS = [
    'from-accent/20 via-accent/5 to-transparent',
    'from-purple-500/20 via-purple-400/5 to-transparent',
    'from-indigo-500/20 via-indigo-400/5 to-transparent',
    'from-violet-500/20 via-violet-400/5 to-transparent',
];

const assets = [
    { domain: 'consultoria.eirl.pe', category: 'Disponible', icon: 'business_center', gradient: GRADIENTS[0] },
    { domain: 'abogados.eirl.pe', category: 'Premium', icon: 'gavel', gradient: GRADIENTS[1] },
    { domain: 'arquitectura.eirl.pe', category: 'Destacado', icon: 'architecture', gradient: GRADIENTS[2] },
    { domain: 'contadores.eirl.pe', category: 'Disponible', icon: 'calculate', gradient: GRADIENTS[3] },
];

export default function CuratedAssetsSection() {
    return (
        <section id="dominios-destacados" className="py-24 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-20">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
                    <div className="space-y-3">
                        <p className="text-accent dark:text-accent-light uppercase tracking-[0.2em] text-sm font-bold">
                            Dominios populares
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary">
                            Dominios Destacados
                        </h2>
                    </div>
                    <a
                        className="text-accent dark:text-accent-light font-semibold text-sm tracking-wide hover:underline underline-offset-4 shrink-0"
                        href="/dominios"
                    >
                        Ver todos los dominios &rarr;
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                    {assets.map((a) => (
                        <a
                            key={a.domain}
                            href={`/templates/${a.domain.split('.')[0]}`}
                            className="group relative flex flex-col justify-between rounded-2xl border border-charcoal/8 dark:border-primary/20 bg-white/60 dark:bg-surface-dark/60 backdrop-blur-sm overflow-hidden p-6 sm:p-8 min-h-[200px] hover:border-accent/30 dark:hover:border-accent-light/40 hover:shadow-xl hover:shadow-accent/5 dark:hover:shadow-accent/10 transition-all duration-300"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient} dark:opacity-60 opacity-40 group-hover:opacity-70 transition-opacity duration-300`} />

                            <div className="relative z-10">
                                <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                                    a.category === 'Premium'
                                        ? 'bg-amber-500/15 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300'
                                        : a.category === 'Destacado'
                                        ? 'bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent-light'
                                        : 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300'
                                }`}>
                                    {a.category}
                                </span>
                            </div>

                            <div className="relative z-10 mt-8">
                                <div className="mb-3 inline-flex items-center justify-center size-10 rounded-lg bg-charcoal/5 dark:bg-primary/10 text-charcoal/50 dark:text-primary/60">
                                    <span className="material-symbols-outlined text-xl">{a.icon}</span>
                                </div>
                                <p className="text-lg sm:text-xl font-bold text-charcoal dark:text-primary tracking-tight group-hover:text-accent dark:group-hover:text-accent-light transition-colors duration-200">
                                    {a.domain}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
