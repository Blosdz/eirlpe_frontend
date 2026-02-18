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
                {/* Parallax background */}
                <div className="absolute inset-0 z-0 pointer-events-none text-charcoal dark:text-primary/25 transition-colors duration-500">
                    <div ref={dotsLayer.ref} className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-[0.06] dark:opacity-[0.08]" style={{ willChange: 'transform' }}>
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

                <div className="w-full max-w-5xl sm:max-w-6xl space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-14 relative z-10">
                    {/* Badge */}
                    <div className="flex justify-center">
                        <div className="relative inline-flex items-center px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full border border-charcoal/15 dark:border-primary/20 cursor-default overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-charcoal/[0.04] dark:via-primary/[0.08] to-transparent" />
                            <span className="relative text-[11px] sm:text-xs md:text-sm lg:text-base font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-charcoal/70 dark:text-primary/70">
                                Landing Page <span className="font-serif italic tracking-normal normal-case text-charcoal dark:text-primary">Gratis</span>
                            </span>
                        </div>
                    </div>

                    <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[1.1] tracking-tight text-charcoal dark:text-primary transition-colors duration-500">
                        Tu <span className="italic font-normal">Dominio</span> Profesional.
                    </h1>
                    <p className="mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-beige dark:text-primary/70 font-light leading-relaxed transition-colors duration-500">
                        Registra tu subdominio .eirl.pe y construye tu presencia digital profesional en minutos.
                    </p>

                    {/* Search bar */}
                    <div className="pt-4 sm:pt-6 md:pt-8">
                        <div className="w-full max-w-3xl sm:max-w-4xl mx-auto">
                            <div className="border-2 border-charcoal/20 dark:border-primary/30 focus-within:border-charcoal dark:focus-within:border-primary rounded-2xl sm:rounded-full transition-all duration-500 bg-white/80 dark:bg-charcoal/40 backdrop-blur-sm shadow-xl overflow-hidden">
                                <div className="flex items-center px-4 sm:px-5 md:px-8 py-3.5 sm:py-4 md:py-5">
                                    <div className="text-charcoal/40 dark:text-primary/50 flex items-center justify-center pr-2 sm:pr-3 md:pr-4">
                                        <span className="material-symbols-outlined text-xl sm:text-2xl md:text-3xl lg:text-4xl">search</span>
                                    </div>
                                    <div className="flex items-center flex-1 text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif min-w-0">
                                        <span className="text-charcoal/50 dark:text-primary/60 shrink-0">www.</span>
                                        <input
                                            className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-charcoal/20 dark:placeholder:text-primary/40 p-0 text-charcoal dark:text-primary min-w-0 mx-0.5 sm:mx-2"
                                            placeholder="tuempresa"
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                            onKeyDown={handleKeyDown}
                                            disabled={!!transitionDomain}
                                        />
                                        <span className="text-charcoal/50 dark:text-primary/60 shrink-0">.eirl.pe</span>
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="hidden sm:block ml-3 md:ml-6 px-5 md:px-8 py-2.5 md:py-3 bg-charcoal dark:bg-primary text-primary dark:text-charcoal rounded-full font-bold text-sm md:text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                                    >
                                        Buscar
                                    </button>
                                </div>
                                <div className="px-3 pb-3 sm:hidden">
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="w-full py-3 bg-charcoal dark:bg-primary text-primary dark:text-charcoal rounded-xl font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Buscar dominio
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                            {['consultoria', 'abogados', 'arquitectura'].map((name) => (
                                <button
                                    key={name}
                                    onClick={() => startSearch(name)}
                                    disabled={!!transitionDomain}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-charcoal/10 dark:border-primary/20 text-xs sm:text-sm md:text-base text-muted-beige dark:text-primary/70 bg-white/50 dark:bg-charcoal/30 transition-colors duration-500 hover:border-charcoal/30 dark:hover:border-primary/40 hover:text-charcoal dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {name}.eirl.pe
                                </button>
                            ))}
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
