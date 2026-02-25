import { useParallax } from 'react-scroll-parallax';

const GRID_SPACING = 64;

/** Fondo parallax minimalista: solo una cuadrícula sutil con parallax. */
export default function FullPageParallaxBackground() {
    const gridLayer = useParallax<HTMLDivElement>({ speed: -8 });

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-500"
            aria-hidden
        >
            <div
                ref={gridLayer.ref}
                className="absolute -top-[15%] -left-[15%] w-[130%] h-[130%] opacity-[0.07] dark:opacity-[0.06] text-charcoal dark:text-primary/40"
                style={{ willChange: 'transform' }}
            >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="fp-grid" width={GRID_SPACING} height={GRID_SPACING} patternUnits="userSpaceOnUse">
                            <line x1={0} y1={0} x2={0} y2={GRID_SPACING} stroke="currentColor" strokeWidth="0.5" />
                            <line x1={0} y1={0} x2={GRID_SPACING} y2={0} stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#fp-grid)" />
                </svg>
            </div>

            {/* Degradado que suaviza los bordes del grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-background-light/60 via-transparent to-background-light/60 dark:from-background-dark/70 dark:via-transparent dark:to-background-dark/70 transition-colors duration-500" />
        </div>
    );
}
