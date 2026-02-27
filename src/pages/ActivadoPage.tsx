import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function ActivadoPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const state = location.state as { domain?: string; template?: string } | null;
    const domain = state?.domain ?? '';
    const template = state?.template ?? '';

    // Si alguien llega aquí sin estado (acceso directo), redirigir a inicio
    useEffect(() => {
        if (!state?.domain) {
            navigate('/', { replace: true });
        }
    }, [state, navigate]);

    if (!domain) return null;

    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light dark:bg-transparent font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 min-w-0">
                <div className="mx-auto max-w-xl min-w-0 w-full text-center space-y-8 sm:space-y-10">

                    {/* Icono de éxito */}
                    <div className="flex justify-center">
                        <div className="size-24 sm:size-28 rounded-full bg-accent/10 dark:bg-accent-light/10 flex items-center justify-center ring-4 ring-accent/20 dark:ring-accent-light/20">
                            <span className="material-symbols-outlined text-5xl sm:text-6xl text-accent dark:text-accent-light">check_circle</span>
                        </div>
                    </div>

                    {/* Título */}
                    <div className="space-y-3 sm:space-y-4">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary-bright leading-tight">
                            ¡Tu dominio está <span className="italic font-normal">activo</span>!
                        </h1>
                        {user?.name && (
                            <p className="text-lg sm:text-xl text-muted-beige dark:text-primary-bright/90 font-light">
                                Bienvenido, <span className="font-bold text-charcoal dark:text-primary-bright">{user.name}</span>
                            </p>
                        )}
                    </div>

                    {/* Info del dominio */}
                    <div className="rounded-2xl border border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark p-6 sm:p-8 space-y-5 text-left">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-2xl text-accent dark:text-accent-light shrink-0">language</span>
                            <div className="min-w-0">
                                <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-beige dark:text-primary/80 mb-0.5">Tu dominio</p>
                                <p className="text-base sm:text-lg font-bold text-charcoal dark:text-primary-bright truncate">{domain}</p>
                            </div>
                        </div>
                        {template && (
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-2xl text-accent dark:text-accent-light shrink-0">palette</span>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold tracking-[0.12em] uppercase text-muted-beige dark:text-primary/80 mb-0.5">Template elegido</p>
                                    <p className="text-base sm:text-lg font-bold text-charcoal dark:text-primary-bright capitalize truncate">{template.replace(/-/g, ' ')}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3 pt-1">
                            <span className="material-symbols-outlined text-xl text-amber-500 shrink-0 mt-0.5">info</span>
                            <p className="text-sm text-muted-beige dark:text-primary-bright/80 leading-relaxed">
                                Tu página estará lista en minutos. Puedes personalizar el contenido desde tu panel de administración.
                            </p>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            onClick={() => navigate('/mis-dominios')}
                            className="flex-1 min-h-[52px] flex items-center justify-center gap-2 rounded-2xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark text-charcoal dark:text-primary-bright font-bold text-sm sm:text-base hover:border-accent/30 dark:hover:border-accent-light/30 transition-all duration-300"
                        >
                            <span className="material-symbols-outlined text-lg">dns</span>
                            Ver mis dominios
                        </button>
                        <button
                            onClick={() => navigate('/cuenta')}
                            className="flex-1 min-h-[52px] flex items-center justify-center gap-2 rounded-2xl bg-accent dark:bg-accent-light text-white font-bold text-sm sm:text-base hover:opacity-90 transition-all duration-300 shadow-lg shadow-accent/25"
                        >
                            <span className="material-symbols-outlined text-lg">person</span>
                            Completar perfil
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
