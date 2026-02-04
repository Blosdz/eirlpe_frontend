import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-solid border-border-beige/50 bg-background-light/80 backdrop-blur-md px-6 md:px-20 py-4">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                    <div className="size-6 text-charcoal">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <h2 className="text-charcoal text-lg font-bold tracking-tight uppercase">eirl.pe</h2>
                </Link>
                <nav className="hidden md:flex items-center gap-12">
                    <Link to="/dominios" className="text-charcoal/70 hover:text-charcoal text-xs font-semibold tracking-widest uppercase transition-colors">
                        Dominios
                    </Link>
                    <Link to="/precios" className="text-charcoal/70 hover:text-charcoal text-xs font-semibold tracking-widest uppercase transition-colors">
                        Precios
                    </Link>
                    <Link to="/faq" className="text-charcoal/70 hover:text-charcoal text-xs font-semibold tracking-widest uppercase transition-colors">
                        FAQ
                    </Link>
                    <button className="flex min-w-[120px] items-center justify-center rounded-full h-11 px-6 bg-charcoal text-primary text-xs font-bold tracking-[0.1em] uppercase transition-transform active:scale-95">
                        Comenzar
                    </button>
                </nav>
                <div className="md:hidden">
                    <span className="material-symbols-outlined text-charcoal text-3xl">menu</span>
                </div>
            </div>
        </header>
    );
}
