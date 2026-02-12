import { useParallax } from 'react-scroll-parallax';

const DOT_SPACING = 40;
const LINE_SPACING = 72;

/** Fondo parallax de página completa: puntos, líneas, círculos, triángulos. */
export default function FullPageParallaxBackground() {
    const dotsFast = useParallax<HTMLDivElement>({ speed: -38 });
    const dotsSlow = useParallax<HTMLDivElement>({ speed: 20 });
    const linesLayer = useParallax<HTMLDivElement>({ speed: 28 });
    const circlesBack = useParallax<HTMLDivElement>({ speed: -22 });
    const circlesFront = useParallax<HTMLDivElement>({ speed: 18 });
    const trianglesLayer = useParallax<HTMLDivElement>({ speed: -15 });
    const trianglesLayer2 = useParallax<HTMLDivElement>({ speed: 25 });
    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none text-charcoal dark:text-primary/30 transition-colors duration-500"
            aria-hidden
        >
            {/* Patrón de puntos (rápido) */}
            <div
                ref={dotsFast.ref}
                className="absolute -top-[30%] -left-[30%] w-[160%] h-[160%] opacity-[0.24] dark:opacity-[0.18]"
                style={{ willChange: 'transform' }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="fp-dots-fast" width={DOT_SPACING} height={DOT_SPACING} patternUnits="userSpaceOnUse">
                            <circle cx={DOT_SPACING / 2} cy={DOT_SPACING / 2} r="2" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fp-dots-fast)" />
                </svg>
            </div>

            {/* Patrón de puntos (lento) - profundidad */}
            <div
                ref={dotsSlow.ref}
                className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%] opacity-[0.14]"
                style={{ willChange: 'transform' }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="fp-dots-slow" width={DOT_SPACING * 1.4} height={DOT_SPACING * 1.4} patternUnits="userSpaceOnUse">
                            <circle cx={DOT_SPACING * 0.7} cy={DOT_SPACING * 0.7} r="1.2" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fp-dots-slow)" />
                </svg>
            </div>

            {/* Líneas (cuadrícula) */}
            <div
                ref={linesLayer.ref}
                className="absolute -top-[30%] -left-[30%] w-[160%] h-[160%] opacity-[0.14]"
                style={{ willChange: 'transform' }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="fp-lines-v" width={LINE_SPACING} height={LINE_SPACING} patternUnits="userSpaceOnUse">
                            <line x1={0} y1={0} x2={0} y2={LINE_SPACING} stroke="currentColor" strokeWidth="0.6" />
                        </pattern>
                        <pattern id="fp-lines-h" width={LINE_SPACING} height={LINE_SPACING} patternUnits="userSpaceOnUse">
                            <line x1={0} y1={0} x2={LINE_SPACING} y2={0} stroke="currentColor" strokeWidth="0.6" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fp-lines-v)" />
                    <rect width="100%" height="100%" fill="url(#fp-lines-h)" />
                </svg>
            </div>

            {/* Círculos (capa atrás) */}
            <div ref={circlesBack.ref} className="absolute inset-0 flex items-center justify-center overflow-visible" style={{ willChange: 'transform' }}>
                <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full border border-charcoal/15 dark:border-primary/15" />
                <div className="absolute top-[40%] right-[8%] w-24 h-24 rounded-full border border-charcoal/12 dark:border-primary/12" />
                <div className="absolute bottom-[25%] left-[20%] w-40 h-40 rounded-full border border-muted-beige/25 dark:border-primary/20" />
                <div className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full bg-charcoal/[0.06] dark:bg-primary/10" />
                <div className="absolute bottom-[40%] right-[12%] w-20 h-20 rounded-full border border-charcoal/10 dark:border-primary/10" />
            </div>

            {/* Círculos (capa al frente) */}
            <div ref={circlesFront.ref} className="absolute inset-0 overflow-visible" style={{ willChange: 'transform' }}>
                <div className="absolute top-[25%] right-[15%] w-20 h-20 rounded-full border-2 border-charcoal/20 dark:border-primary/25" />
                <div className="absolute top-[70%] left-[12%] w-28 h-28 rounded-full border border-muted-beige/30 dark:border-primary/20" />
                <div className="absolute bottom-[30%] left-[35%] w-14 h-14 rounded-full bg-primary/40 dark:bg-primary/30" />
                <div className="absolute top-[35%] left-[8%] w-10 h-10 rounded-full bg-charcoal/10 dark:bg-primary/20" />
                <div className="absolute bottom-[15%] right-[30%] w-24 h-24 rounded-full border-2 border-charcoal/15 dark:border-primary/20" />
                <div className="absolute top-[80%] right-[10%] w-12 h-12 rounded-full bg-muted-beige/25 dark:bg-primary/20" />
            </div>

            {/* Triángulos (capa 1) */}
            <div ref={trianglesLayer.ref} className="absolute inset-0 overflow-visible" style={{ willChange: 'transform' }}>
                <div className="absolute top-[8%] left-[6%] w-24 h-20 border border-charcoal/20 dark:border-primary/20 bg-transparent" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <div className="absolute top-[42%] right-[12%] w-20 h-16 bg-charcoal/[0.07] dark:bg-primary/15" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                <div className="absolute bottom-[22%] right-[18%] w-28 h-24 border border-muted-beige/30 dark:border-primary/20 bg-transparent" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <div className="absolute bottom-[38%] left-[18%] w-16 h-14 bg-charcoal/[0.06] dark:bg-primary/10" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                <div className="absolute top-[18%] right-[8%] w-14 h-12 border border-charcoal/15 dark:border-primary/15 bg-transparent" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
            </div>

            {/* Triángulos (capa 2) */}
            <div ref={trianglesLayer2.ref} className="absolute inset-0 overflow-visible" style={{ willChange: 'transform' }}>
                <div className="absolute top-[28%] left-[12%] w-20 h-16 border border-charcoal/18 dark:border-primary/18 bg-transparent" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <div className="absolute top-[52%] left-[4%] w-16 h-14 bg-primary/30 dark:bg-primary/25" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                <div className="absolute bottom-[28%] right-[8%] w-22 h-18 border border-muted-beige/25 dark:border-primary/20 bg-transparent" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                <div className="absolute bottom-[12%] left-[28%] w-12 h-10 bg-charcoal/[0.05] dark:bg-primary/10" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
                <div className="absolute top-[12%] right-[28%] w-18 h-15 border border-charcoal/12 dark:border-primary/12 bg-transparent" style={{ clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)' }} />
            </div>

            {/* Velado suave para que el texto siga legible */}
            <div className="absolute inset-0 bg-gradient-to-b from-background-light/40 via-background-light/5 to-background-light/40 dark:from-background-dark/50 dark:via-background-dark/10 dark:to-background-dark/50 transition-colors duration-500" />
        </div>
    );
}
