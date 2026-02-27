import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { getMyHostnames } from '../api/auth';
import type { UserHostname } from '../api/auth';

export default function MisDominiosPage() {
    const { user } = useAuth();
    const [hostnames, setHostnames] = useState<UserHostname[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadHostnames = () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        getMyHostnames()
            .then((data) => setHostnames(Array.isArray(data) ? data : []))
            .catch(() => setError('No se pudieron cargar tus dominios. Revisa tu conexión e intenta de nuevo.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (user) loadHostnames();
    }, [user]);

    if (!user) {
        return (
            <div className="min-h-screen min-h-[100dvh] bg-background-light/90 dark:bg-transparent font-display text-charcoal dark:text-primary-bright overflow-x-hidden">
                <Header />
                <div className="pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="max-w-2xl mx-auto text-center rounded-2xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90 p-8 sm:p-10">
                        <p className="text-lg text-muted-beige dark:text-primary-bright/90 mb-6">Inicia sesión para ver y gestionar tus dominios.</p>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent dark:bg-accent-light text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light/90 dark:bg-transparent backdrop-blur-[2px] font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 min-w-0">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-charcoal/15 dark:border-primary/25 text-charcoal dark:text-primary text-sm font-semibold hover:bg-charcoal/5 dark:hover:bg-primary/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Inicio
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent dark:bg-accent-light text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Registrar nuevo dominio
                        </Link>
                    </div>
                    <div>
                        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary-bright">Mis dominios</h1>
                        <p className="mt-2 text-muted-beige dark:text-primary/80 text-sm sm:text-base">
                            Aquí aparecen los subdominios .eirl.pe que tienes registrados a tu cuenta.
                        </p>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90 shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-8 md:p-10">
                            {loading ? (
                                <div className="flex items-center justify-center py-12 gap-2 text-muted-beige dark:text-primary/70">
                                    <span className="material-symbols-outlined animate-spin text-2xl">progress_activity</span>
                                    <span>Cargando...</span>
                                </div>
                            ) : error ? (
                                <div className="text-center py-8">
                                    <p className="text-rose-600 dark:text-rose-400 mb-4">{error}</p>
                                    <button
                                        type="button"
                                        onClick={loadHostnames}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-charcoal/15 dark:border-primary/25 font-semibold text-sm hover:bg-charcoal/5 dark:hover:bg-primary/10 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">refresh</span>
                                        Reintentar
                                    </button>
                                </div>
                            ) : hostnames.length === 0 ? (
                                <div className="text-center py-10 sm:py-12">
                                    <span className="material-symbols-outlined text-5xl text-charcoal/30 dark:text-primary/40 mb-4 block">dns</span>
                                    <p className="text-lg font-semibold text-charcoal dark:text-primary-bright mb-2">Aún no tienes dominios registrados</p>
                                    <p className="text-sm text-muted-beige dark:text-primary/70 mb-6 max-w-sm mx-auto">
                                        Registra tu primer subdominio .eirl.pe desde la página de inicio: busca disponibilidad y completa el registro.
                                    </p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent dark:bg-accent-light text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-accent/25"
                                    >
                                        <span className="material-symbols-outlined text-lg">search</span>
                                        Buscar y registrar dominio
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <ul className="divide-y divide-charcoal/10 dark:divide-primary/20">
                                        {hostnames
                                            .filter((h) => h.hostname)
                                            .map((h) => (
                                                <li key={`${h.id}-${h.hostname}`} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-charcoal dark:text-primary text-lg truncate">
                                                                {h.hostname}.eirl.pe
                                                            </p>
                                                            {h.company_name && (
                                                                <p className="text-sm text-muted-beige dark:text-primary/70 truncate">{h.company_name}</p>
                                                            )}
                                                            {h.created_at && (
                                                                <p className="text-xs text-charcoal/50 dark:text-primary/50 mt-1">
                                                                    Registrado el {new Date(h.created_at).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <a
                                                            href={`https://${h.hostname}.eirl.pe`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-charcoal/15 dark:border-primary/25 text-sm font-semibold hover:bg-charcoal/5 dark:hover:bg-primary/10 transition-colors shrink-0"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                                                            Ver sitio
                                                        </a>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                    <div className="mt-6 pt-6 border-t border-charcoal/10 dark:border-primary/20 text-center">
                                        <Link
                                            to="/"
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-accent dark:text-accent-light hover:opacity-90 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-lg">add</span>
                                            Registrar otro dominio
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
