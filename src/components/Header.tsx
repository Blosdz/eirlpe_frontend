import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (!menuOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [menuOpen]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinks = [
        { to: '/dominios', label: 'Dominios' },
        { to: '/precios', label: 'Precios' },
        { to: '/faq', label: 'FAQ' },
    ];

    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-solid border-border-beige/50 dark:border-charcoal/30 bg-background-light/80 dark:bg-background-dark/90 backdrop-blur-md px-6 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-5 md:py-6 transition-colors duration-500 ease-in-out">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 sm:gap-4">
                        <div className="size-7 sm:size-8 md:size-10 text-charcoal dark:text-primary transition-colors duration-500 shrink-0">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-charcoal dark:text-primary text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase transition-colors duration-500">eirl.pe</h2>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-charcoal/70 dark:text-primary/70 hover:text-charcoal dark:hover:text-primary text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            type="button"
                            onClick={(e) => toggleTheme({ clientX: e.clientX, clientY: e.clientY })}
                            className="flex items-center justify-center size-12 lg:size-14 rounded-full border border-charcoal/15 dark:border-primary/20 bg-background-light dark:bg-charcoal/40 hover:bg-charcoal/5 dark:hover:bg-charcoal/60 text-charcoal dark:text-primary transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-primary/30 active:scale-95"
                            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                        >
                            {isDark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 lg:size-7 transition-transform duration-500">
                                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 lg:size-7 transition-transform duration-500">
                                    <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                                </svg>
                            )}
                        </button>

                        {/* Dropdown Comenzar */}
                        <div ref={menuRef} className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex min-w-[140px] lg:min-w-[160px] items-center justify-center gap-2 rounded-full h-12 lg:h-14 px-6 lg:px-8 bg-charcoal dark:bg-primary text-primary dark:text-charcoal text-sm lg:text-base font-bold tracking-[0.1em] uppercase transition-all duration-300 active:scale-95 hover:opacity-90"
                            >
                                Comenzar
                                <span className={`material-symbols-outlined text-lg transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            <div className={`absolute right-0 top-full mt-3 w-56 rounded-2xl border border-charcoal/10 dark:border-primary/15 bg-white dark:bg-background-dark shadow-xl shadow-charcoal/10 dark:shadow-black/30 overflow-hidden transition-all duration-200 origin-top-right ${
                                menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                            }`}>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 px-5 py-4 hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl text-charcoal/50 dark:text-primary/50">login</span>
                                    <div>
                                        <p className="text-sm font-bold text-charcoal dark:text-primary">Iniciar sesion</p>
                                        <p className="text-xs text-muted-beige dark:text-primary/40">Ya tengo una cuenta</p>
                                    </div>
                                </Link>
                                <div className="h-px bg-charcoal/5 dark:bg-primary/10 mx-4" />
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 px-5 py-4 hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl text-charcoal/50 dark:text-primary/50">person_add</span>
                                    <div>
                                        <p className="text-sm font-bold text-charcoal dark:text-primary">Registrarse</p>
                                        <p className="text-xs text-muted-beige dark:text-primary/40">Crear cuenta nueva</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={(e) => toggleTheme({ clientX: e.clientX, clientY: e.clientY })}
                            className="flex items-center justify-center size-11 sm:size-12 rounded-full border border-charcoal/15 dark:border-primary/20 bg-background-light dark:bg-charcoal/40 text-charcoal dark:text-primary transition-all duration-500"
                            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                        >
                            {isDark ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                                </svg>
                            )}
                        </button>
                        <Link
                            to="/login"
                            className="flex items-center justify-center size-11 sm:size-12 rounded-full border border-charcoal/15 dark:border-primary/20 bg-background-light dark:bg-charcoal/40 text-charcoal dark:text-primary transition-all duration-500"
                            aria-label="Iniciar sesion"
                        >
                            <span className="material-symbols-outlined text-2xl">person</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex items-center justify-center size-11 sm:size-12 text-charcoal dark:text-primary transition-colors duration-500"
                            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                        >
                            <span className="material-symbols-outlined text-3xl sm:text-4xl transition-transform duration-300">
                                {mobileOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-charcoal/50 dark:bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile menu panel */}
            <div
                className={`fixed top-0 right-0 z-40 h-full w-[min(80vw,320px)] bg-background-light dark:bg-background-dark border-l border-border-beige/50 dark:border-charcoal/30 shadow-2xl md:hidden transition-transform duration-300 ease-out ${
                    mobileOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full pt-24 pb-8 px-6">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-4 px-4 py-4 rounded-xl text-charcoal dark:text-primary font-semibold text-lg tracking-wide uppercase hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="h-px bg-charcoal/10 dark:bg-primary/15 my-6" />

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl text-charcoal/50 dark:text-primary/50">login</span>
                            <div>
                                <p className="text-base font-bold text-charcoal dark:text-primary">Iniciar sesion</p>
                                <p className="text-xs text-muted-beige dark:text-primary/40">Ya tengo una cuenta</p>
                            </div>
                        </Link>
                        <Link
                            to="/signup"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-charcoal/5 dark:hover:bg-primary/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl text-charcoal/50 dark:text-primary/50">person_add</span>
                            <div>
                                <p className="text-base font-bold text-charcoal dark:text-primary">Registrarse</p>
                                <p className="text-xs text-muted-beige dark:text-primary/40">Crear cuenta nueva</p>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-auto">
                        <Link
                            to="/"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-charcoal dark:bg-primary text-primary dark:text-charcoal font-bold text-base tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-[0.98]"
                        >
                            Comenzar
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
