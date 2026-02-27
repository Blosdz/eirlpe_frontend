import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DomainSearchTransition from './DomainSearchTransition';

const PROXIMITY_RADIUS = 420; // px: a partir de esta distancia el efecto empieza a notarse
const MAX_SCALE = 1.04;       // escala máxima del buscador cuando el cursor está cerca
const MAX_GLOW = 28;         // intensidad máxima del brillo (px spread)

export default function HeroSection() {
    const [searchValue, setSearchValue] = useState('');
    const [transitionDomain, setTransitionDomain] = useState<string | null>(null);
    const [proximity, setProximity] = useState(0); // 0 = lejos, 1 = cursor muy cerca del buscador
    const heroRef = useRef<HTMLElement>(null);
    const searchWrapRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const hero = heroRef.current;
        const searchWrap = searchWrapRef.current;
        if (!hero || !searchWrap) return;

        const handleMove = (e: MouseEvent) => {
            const rect = searchWrap.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const distance = Math.hypot(dx, dy);
            const t = Math.max(0, 1 - distance / PROXIMITY_RADIUS);
            setProximity(t * t); // curva suave: más efecto al acercarse
        };
        const handleLeave = () => setProximity(0);

        hero.addEventListener('mousemove', handleMove, { passive: true });
        hero.addEventListener('mouseleave', handleLeave);
        return () => {
            hero.removeEventListener('mousemove', handleMove);
            hero.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

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
            <section ref={heroRef} className="relative flex min-h-[min(92vh,100dvh)] flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-12 md:pb-16 px-3 sm:px-6 md:px-8 lg:px-12 text-center">
                <div className="w-full max-w-4xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10 relative z-10 min-w-0">
                    {/* Título: en pantallas angostas más compacto y legible */}
                    <h1 className="font-serif text-[1.75rem] leading-tight tracking-tight text-charcoal dark:text-primary transition-colors duration-500 min-[400px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl sm:leading-[1.12]">
                        Tu dominio profesional
                        <br />
                        <span className="italic font-normal text-accent dark:text-accent-light">.eirl.pe</span> en minutos
                    </h1>

                    {/* Subtítulo */}
                    <p className="mx-auto max-w-2xl text-xs min-[400px]:text-sm sm:text-base md:text-lg lg:text-xl text-muted-beige dark:text-primary/70 font-light leading-relaxed px-0.5 sm:px-1">
                        Registra tu subdominio, obtén hosting con SSL incluido
                        y lanza tu presencia digital profesional hoy mismo.
                    </p>

                    {/* Buscador: efecto de proximidad — en angostas menos padding */}
                    <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-8 w-full">
                        <div ref={searchWrapRef} className="w-full max-w-3xl sm:max-w-4xl mx-auto min-w-0 rounded-2xl sm:rounded-full overflow-hidden transition-transform duration-300 ease-out" style={{
                            transform: `scale(${1 + (MAX_SCALE - 1) * proximity})`,
                            boxShadow: proximity > 0
                                ? `0 0 ${20 + MAX_GLOW * proximity}px rgba(91, 68, 242, ${0.15 + 0.2 * proximity}), 0 0 ${40 + 30 * proximity}px rgba(91, 68, 242, ${0.08 * proximity})`
                                : undefined,
                        }}>
                            <div className="border border-charcoal/20 dark:border-primary/15 focus-within:border-accent dark:focus-within:border-accent-light rounded-2xl sm:rounded-full transition-all duration-500 bg-white/95 dark:bg-[rgba(7,5,26,0.72)] dark:backdrop-blur-md shadow-lg shadow-charcoal/10 dark:shadow-none dark:ring-1 dark:ring-primary/10 focus-within:ring-2 focus-within:ring-accent/20 dark:focus-within:ring-accent-light/25 overflow-hidden h-full">
                                <div className="flex items-center px-2.5 sm:px-5 md:px-8 py-2.5 sm:py-4 md:py-5 min-w-0">
                                    <div className="text-charcoal/60 dark:text-primary/70 flex items-center justify-center pr-1 sm:pr-3 md:pr-4 shrink-0">
                                        <span className="material-symbols-outlined text-base sm:text-2xl md:text-3xl lg:text-4xl">search</span>
                                    </div>
                                    <div className="flex items-center flex-1 min-w-0 text-xs sm:text-xl md:text-2xl lg:text-3xl font-serif">
                                        <span className="text-charcoal/70 dark:text-primary-bright/90 shrink-0">www.</span>
                                        <input
                                            className="flex-1 w-0 bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-charcoal/45 dark:placeholder:text-primary/60 p-0 text-charcoal dark:text-primary-bright min-w-0 mx-0.5 sm:mx-2 text-xs sm:text-xl md:text-2xl lg:text-3xl font-serif min-h-[44px] sm:min-h-0"
                                            placeholder="tuempresa"
                                            type="text"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                            onKeyDown={handleKeyDown}
                                            disabled={!!transitionDomain}
                                        />
                                        <span className="text-charcoal/70 dark:text-primary-bright/90 shrink-0">.eirl.pe</span>
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="hidden sm:flex ml-3 md:ml-6 px-5 md:px-8 py-2.5 md:py-3 bg-accent hover:bg-accent-deep text-white rounded-full font-bold text-sm md:text-base tracking-wider uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 items-center justify-center shadow-lg shadow-accent/20"
                                    >
                                        Buscar
                                    </button>
                                </div>
                                <div className="px-2.5 pb-2.5 sm:hidden">
                                    <button
                                        onClick={handleSearch}
                                        disabled={!!transitionDomain || !searchValue.trim()}
                                        className="w-full min-h-[44px] py-3 bg-accent hover:bg-accent-deep text-white rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
                                    >
                                        Buscar dominio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust bar: en angostas más compacto y con buen wrap */}
                    <div className="pt-3 sm:pt-4 md:pt-6 lg:pt-10 flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-6 sm:gap-y-3 md:gap-x-10 text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm text-muted-beige dark:text-primary/50 font-medium">
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-accent dark:text-accent-light">verified</span>
                            SSL incluido
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-accent dark:text-accent-light">schedule</span>
                            Activación en minutos
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-accent dark:text-accent-light">support_agent</span>
                            Soporte dedicado
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-accent dark:text-accent-light">money_off</span>
                            Sin costos ocultos
                        </span>
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
