import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'eirlpe-theme';

const THEME_BG = {
    light: '#F5F3FF',
    dark: '#1E1940',
} as const;

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
}

export type ThemeClickOrigin = { clientX: number; clientY: number };

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme, origin?: ThemeClickOrigin) => void;
    toggleTheme: (origin?: ThemeClickOrigin) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const REVEAL_MS = 420;

/**
 * Crea el overlay en el DOM, anima con rAF y lo destruye al terminar.
 * Cero re-renders de React durante la animación.
 */
function runCircularReveal(
    fromTheme: Theme,
    toTheme: Theme,
    cx: number,
    cy: number,
    onDone: () => void,
) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const maxR = Math.ceil(Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy))) + 40;

    // Crear overlay
    const el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = `
        position:fixed;inset:0;z-index:99999;pointer-events:none;
        background:${THEME_BG[fromTheme]};
        will-change:mask-image,-webkit-mask-image;
    `;
    document.body.appendChild(el);

    // Aplicar tema nuevo debajo
    applyTheme(toTheme);

    const start = performance.now();

    function tick(now: number) {
        const t = Math.min((now - start) / REVEAL_MS, 1);
        const r = (1 - (1 - t) ** 3) * maxR; // ease-out cubic
        const mask = `radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, black ${r + 1}px)`;
        el.style.maskImage = mask;
        el.style.webkitMaskImage = mask;
        if (t < 1) {
            requestAnimationFrame(tick);
        } else {
            el.remove();
            onDone();
        }
    }

    requestAnimationFrame(tick);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
    const animating = useRef(false);

    const setTheme = useCallback((next: Theme, origin?: ThemeClickOrigin) => {
        if (next === theme || animating.current) return;

        localStorage.setItem(STORAGE_KEY, next);

        if (!origin || typeof window === 'undefined') {
            applyTheme(next);
            setThemeState(next);
            return;
        }

        animating.current = true;
        runCircularReveal(theme, next, origin.clientX, origin.clientY, () => {
            animating.current = false;
            setThemeState(next);
        });
    }, [theme]);

    const toggleTheme = useCallback((origin?: ThemeClickOrigin) => {
        setTheme(theme === 'light' ? 'dark' : 'light', origin);
    }, [theme, setTheme]);

    useEffect(() => {
        applyTheme(theme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
