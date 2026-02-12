import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
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
                <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                    <Link to="/dominios" className="text-charcoal/70 dark:text-primary/70 hover:text-charcoal dark:hover:text-primary text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-300">
                        Dominios
                    </Link>
                    <Link to="/precios" className="text-charcoal/70 dark:text-primary/70 hover:text-charcoal dark:hover:text-primary text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-300">
                        Precios
                    </Link>
                    <Link to="/faq" className="text-charcoal/70 dark:text-primary/70 hover:text-charcoal dark:hover:text-primary text-sm lg:text-base font-semibold tracking-widest uppercase transition-colors duration-300">
                        FAQ
                    </Link>
                    <button
                        type="button"
                        onClick={(e) => toggleTheme({ clientX: e.clientX, clientY: e.clientY })}
                        className="flex items-center justify-center size-12 lg:size-14 rounded-full border border-charcoal/15 dark:border-primary/20 bg-background-light dark:bg-charcoal/40 hover:bg-charcoal/5 dark:hover:bg-charcoal/60 text-charcoal dark:text-primary transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-primary/30 active:scale-95"
                        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                    >
                        <span className="material-symbols-outlined text-2xl lg:text-3xl transition-transform duration-500">
                            {isDark ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <button className="flex min-w-[140px] lg:min-w-[160px] items-center justify-center rounded-full h-12 lg:h-14 px-6 lg:px-8 bg-charcoal dark:bg-primary text-primary dark:text-charcoal text-sm lg:text-base font-bold tracking-[0.1em] uppercase transition-all duration-300 active:scale-95 hover:opacity-90">
                        Comenzar
                    </button>
                </nav>
                <div className="flex md:hidden items-center gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={(e) => toggleTheme({ clientX: e.clientX, clientY: e.clientY })}
                        className="flex items-center justify-center size-11 sm:size-12 rounded-full border border-charcoal/15 dark:border-primary/20 bg-background-light dark:bg-charcoal/40 text-charcoal dark:text-primary transition-all duration-500"
                        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
                    >
                        {isDark ? <span className="material-symbols-outlined text-2xl">light_mode</span> : <span className="material-symbols-outlined text-2xl">dark_mode</span>}
                    </button>
                    <span className="material-symbols-outlined text-charcoal dark:text-primary text-3xl sm:text-4xl transition-colors duration-500">menu</span>
                </div>
            </div>
        </header>
    );
}
