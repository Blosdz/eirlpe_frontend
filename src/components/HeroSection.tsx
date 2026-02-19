import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParallax } from 'react-scroll-parallax';
import DomainSearchTransition from './DomainSearchTransition';

const DOT_SPACING = 48;
const LINE_SPACING = 80;

export default function HeroSection() {
    const [searchValue, setSearchValue] = useState('');
    const [transitionDomain, setTransitionDomain] = useState<string | null>(null);
    const navigate = useNavigate();

    const dotsLayer = useParallax<HTMLDivElement>({ speed: -25 });
    const linesLayer = useParallax<HTMLDivElement>({ speed: 15 });

    const startSearch = useCallback((domain: string) => {
        const d = domain.trim();
        if (!d || transitionDomain) return;
        setSearchValue(d);
        setTransitionDomain(d);
    }, [transitionDomain]);

    const handleSearch = useCallback(() => {
        startSearch(searchValue);
    }, [searchValue, startSearch]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    }, [handleSearch]);

    const handleTransitionComplete = useCallback(() => {
        if (transitionDomain) {
            navigate(`/templates/${encodeURIComponent(transitionDomain)}`);
        }
    }, [transitionDomain, navigate]);

    return (
        <>
            <section className="relative flex min-h-[85vh] sm:min-h-[90vh] flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-0 px-4 sm:px-6 md:px-8 lg:px-12 text-center overflow-hidden transition-colors duration-500">
                {/* Parallax background - puntos y líneas muy suaves */}
                <div className="absolute inset-0 z-0 pointer-events-none text-charcoal/80 dark:text-primary/40 transition-colors duration-500">
                    <div ref={dotsLayer.ref} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.035] dark:opacity-[0.05]" style={{ willChange: 'transform' }}>
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="hero-dots" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
                                    <circle cx={DOT_SPACING / 2} cy={DOT_SPACING / 2} r="1.5" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hero-dots)" />
                        </svg>
                    </div>
                    <div ref={linesLayer.ref} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.025] dark:opacity-[0.04]" style={{ willChange: 'transform' }}>
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="hero-lines-v" width={LINE_SPACING} height={LINE_SPACING} patternUnits="userSpaceOnUse">
                                    <line x1={0} y1={0} x2={0} y2={LINE_SPACING} stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                                <pattern id="hero-lines-h" width={LINE_SPACING} height={LINE_SPACING} patternUnits="userSpaceOnUse">
                                    <line x1={0} y1={0} x2={LINE_SPACING} y2={0} stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hero-lines-v)" />
                            <rect width="100%" height="100%" fill="url(#hero-lines-h)" />
                        </svg>
                    </div>
                    <div className="hero-bg-float absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.03] dark:opacity-[0.045]">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="hero-dots-float" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
                                    <circle cx={DOT_SPACING / 2} cy={DOT_SPACING / 2} r="1" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hero-dots-float)" />
                        </svg>
                    </div>
                </div>

                <div className="w-full max-w-5xl sm:max-w-6xl space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-14 relative z-10">
                    {/* Badge */}
                    <div className="flex justify-center hero-entrance hero-entrance-1">
                        <div className="relative inline-flex items-center px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-charcoal/15 dark:border-accent-light/40 cursor-default overflow-hidden dark:bg-[rgba(91,68,242,0.08)]">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-accent/[0.06] dark:via-accent-light/[0.15] to-transparent" />
                            <span className="relative text-[11px] sm:text-xs md:text-sm lg:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-charcoal/70 dark:text-primary-bright/80">
                                Landing Page <span className="font-serif italic tracking-normal normal-case text-charcoal dark:text-accent-light">Gratis</span>
                            </span>
                        </div>
                    </div>

                    <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[1.1] tracking-tight text-charcoal dark:text-white transition-colors duration-500 hero-entrance hero-entrance-2">
                        Tu <span className="italic font-normal dark:text-accent-light/90">Dominio</span> Profesional.
                    </h1>
                    <p className="mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-beige dark:text-primary-bright/70 font-light leading-relaxed transition-colors duration-500 hero-entrance hero-entrance-3">
                        Registra tu subdominio .eirl.pe y construye tu presencia digital profesional en minutos.
                    </p>

                    {/* Search bar */}
                    <div className="pt-4 sm:pt-6 md:pt-8 hero-entrance hero-entrance-4">
                        <div className="w-full max-w-3xl sm:max-w-4xl mx-auto">
                            <div className="border-2 border-charcoal/20 dark:border-accent-light/55 focus-within:border-accent dark:focus-within:border-accent-light focus-within:shadow-lg focus-within:shadow-accent/10 dark:focus-within:shadow-[0_0_36px_6px_rgba(155,133,247,0.22)] rounded-2xl sm:rounded-full transition-all duration-300 bg-white/80 dark:bg-[rgba(14,11,46,0.92)] backdrop-blur-md shadow-xl dark:shadow-[0_4px_40px_0_rgba(91,68,242,0.22)] overflow-hidden">
                                <div className="flex items-center px-4 sm:px-5 md:px-8 py-3.5 sm:py-4 md:py-5">
                                    <div className="text-charcoal/40 dark:text-accent-light/80 flex items-center justify-center pr-2 sm:pr-3 md:pr-4">
                                        <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">search</span>
                                    </div>
                                    <div className="flex items-center flex-1 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif min-w-0">
                                        <span className="text-charcoal/50 dark:text-primary-bright/50 shrink-0">www.</span>
                                        <input
                                            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-primary-bright/30 p-0 text-charcoal dark:text-white min-w-0 mx-0.5 sm:mx-2 transition-colors duration-200"
                                            placeholder="tuempresa"
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                            onKeyDown={handleKeyDown}
                                            disabled={!!transitionDomain}
                                        />
                                        <span className="text-charcoal/50 dark:text-primary-bright/50 shrink-0">.eirl.pe</span>
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="hidden sm:block ml-3 md:ml-6 px-5 md:px-8 py-2.5 md:py-3 bg-accent dark:bg-accent-light dark:text-[#07051A] text-white rounded-full font-bold text-sm md:text-base tracking-wider uppercase hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-lg shadow-accent/25 dark:shadow-accent-light/30 focus:outline-none focus:ring-2 focus:ring-accent-light/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                                    >
                                        Buscar
                                    </button>
                                </div>
                                <div className="px-3 pb-3 sm:hidden">
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="w-full py-3 bg-accent dark:bg-accent-light dark:text-[#07051A] text-white rounded-xl font-bold text-sm tracking-wider uppercase hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25 dark:shadow-accent-light/30 focus:outline-none focus:ring-2 focus:ring-accent-light/50 focus:ring-offset-2"
                                    >
                                        Buscar dominio
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 hero-entrance hero-entrance-5">
                            {['consultoria', 'abogados', 'arquitectura'].map((name) => (
                                <button
                                    key={name}
                                    onClick={() => startSearch(name)}
                                    disabled={!!transitionDomain}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-charcoal/10 dark:border-accent-light/45 text-xs sm:text-sm md:text-base text-muted-beige dark:text-primary-bright/80 bg-white/50 dark:bg-[rgba(14,11,46,0.75)] backdrop-blur-sm transition-all duration-200 hover:border-accent/40 dark:hover:border-accent-light/80 hover:text-accent dark:hover:text-accent-light hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                                >
                                    {name}.eirl.pe
                                </button>
                            ))}
                        </div>

                        {/* Barra de confianza */}
                        <div className="mt-12 sm:mt-14 md:mt-16 pt-8 sm:pt-10 border-t border-charcoal/10 dark:border-accent-light/25 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-6 text-charcoal/60 dark:text-primary-bright/70 hero-entrance hero-entrance-6">
                            <div className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-105">
                                <span className="material-symbols-outlined text-xl text-accent/80 dark:text-accent-light/90">verified_user</span>
                                <span className="text-xs sm:text-sm font-medium tracking-wide">SSL incluido</span>
                            </div>
                            <div className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-105">
                                <span className="material-symbols-outlined text-xl text-accent/80 dark:text-accent-light/90">schedule</span>
                                <span className="text-xs sm:text-sm font-medium tracking-wide">Activación en minutos</span>
                            </div>
                            <div className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-105">
                                <span className="material-symbols-outlined text-xl text-accent/80 dark:text-accent-light/90">support_agent</span>
                                <span className="text-xs sm:text-sm font-medium tracking-wide">Soporte dedicado</span>
                            </div>
                            <div className="flex items-center gap-2.5 transition-transform duration-200 hover:scale-105">
                                <span className="material-symbols-outlined text-xl text-accent/80 dark:text-accent-light/90">savings</span>
                                <span className="text-xs sm:text-sm font-medium tracking-wide">Sin costos ocultos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {transitionDomain && (
                <DomainSearchTransition
                    domain={transitionDomain}
                    onComplete={handleTransitionComplete}
                />
            )}
        </>
    );
}
