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
            <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-24 sm:pt-28 px-6 sm:px-8 md:px-12 text-center overflow-hidden transition-colors duration-500">
                {/* Parallax background */}
                <div className="absolute inset-0 z-0 pointer-events-none text-charcoal transition-colors duration-500">
                    <div ref={dotsLayer.ref} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.06][0.08]" style={{ willChange: 'transform' }}>
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="hero-dots" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
                                    <circle cx={DOT_SPACING / 2} cy={DOT_SPACING / 2} r="1.5" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#hero-dots)" />
                        </svg>
                    </div>
                    <div ref={linesLayer.ref} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.04]" style={{ willChange: 'transform' }}>
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
                    <div className="hero-bg-float absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.07]">
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
                <div className="max-w-5xl sm:max-w-6xl space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 relative z-10">
                    {/* Badge "Landing Page Gratis" */}
                    <div className="flex justify-center">
                        <div className="relative inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-charcoal/15 cursor-default overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-accent/[0.06]/[0.10] to-transparent" />
                            <span className="relative text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] uppercase text-charcoal/70">
                                Landing Page <span className="font-serif italic tracking-normal normal-case text-charcoal">Gratis</span>
                            </span>
                        </div>
                    </div>

                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[1.1] tracking-tight text-charcoal transition-colors duration-500">
                        Tu <span className="italic font-normal">Dominio</span> Profesional.
                    </h1>
                    <p className="mx-auto max-w-2xl sm:max-w-3xl text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-beige font-light leading-relaxed transition-colors duration-500">
                        Registra tu subdominio .eirl.pe y construye tu presencia digital profesional en minutos.
                    </p>

                    <div className="pt-6 sm:pt-8">
                        <label className="flex flex-col w-full max-w-3xl sm:max-w-4xl mx-auto">
                            <div className="flex w-full items-center justify-center border-2 border-charcoal/20 focus-within:border-accent:border-accent-light rounded-full transition-all duration-500 px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white/80 backdrop-blur-sm shadow-xl">
                                <div className="text-charcoal/40 flex items-center justify-center pr-3 sm:pr-4">
                                    <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl">search</span>
                                </div>
                                <div className="flex items-center flex-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif min-w-0">
                                    <span className="text-charcoal/50 shrink-0">www.</span>
                                    <input
                                        className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-charcoal/20:text-primary/40 p-0 text-charcoal min-w-0 mx-1 sm:mx-2"
                                        placeholder="tuempresa"
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        onKeyDown={handleKeyDown}
                                        disabled={!!transitionDomain}
                                    />
                                    <span className="text-charcoal/50 shrink-0">.eirl.pe</span>
                                </div>
                                <button
                                    onClick={handleSearch}
                                    disabled={!!transitionDomain || !searchValue.trim()}
                                    className="ml-3 sm:ml-4 md:ml-6 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-accent text-white rounded-full font-bold text-sm sm:text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-accent/25"
                                >
                                    Buscar
                                </button>
                            </div>
                        </label>
                        <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
                            {['consultoria', 'abogados', 'arquitectura'].map((name) => (
                                <button
                                    key={name}
                                    onClick={() => startSearch(name)}
                                    disabled={!!transitionDomain}
                                    className="px-4 py-2 rounded-full border border-charcoal/10 text-sm sm:text-base text-muted-beige bg-white/50 transition-colors duration-500 hover:border-accent/40:border-accent-light/50 hover:text-accent:text-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {name}.eirl.pe
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pantalla de transición full-screen */}
            {transitionDomain && (
                <DomainSearchTransition
                    domain={transitionDomain}
                    onComplete={handleTransitionComplete}
                />
            )}
        </>
    );
}
