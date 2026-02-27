import { useParams, useNavigate } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import { useAuth } from '../context/AuthContext';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import { register } from '../api/auth';
import { createHostname } from '../api/hostnames';
import type { ApiError } from '../api/client';

export default function RegisterPage() {
    const { domain, template } = useParams<{ domain: string; template: string }>();
    const navigate = useNavigate();
    const { user, setUser, loading: authLoading } = useAuth();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState<'account' | 'domain' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const domainDisplay = domain ? `${domain}.eirl.pe` : '';

    // Si el usuario ya está autenticado, activar el dominio directamente sin formulario
    useEffect(() => {
        if (authLoading || !user || !domain) return;

        let cancelled = false;
        setLoading(true);
        setLoadingStep('domain');

        createHostname(domain, template ?? undefined)
            .then(() => {
                if (!cancelled) {
                    navigate('/activado', {
                        replace: true,
                        state: { domain: domainDisplay, template },
                    });
                }
            })
            .catch((err: ApiError) => {
                if (!cancelled) {
                    setLoading(false);
                    setLoadingStep(null);
                    // Si el dominio ya existe para este usuario, ir directo a /activado
                    const msg = err.message?.toLowerCase() ?? '';
                    if (msg.includes('ya existe') || msg.includes('already')) {
                        navigate('/activado', {
                            replace: true,
                            state: { domain: domainDisplay, template },
                        });
                    } else {
                        setError(err.message || 'No se pudo activar el dominio. Inténtalo de nuevo.');
                    }
                }
            });

        return () => { cancelled = true; };
    }, [user, authLoading, domain, template, domainDisplay, navigate]);


    const handleGoogleSuccess = useCallback((user: { email: string; name: string }, credential: string) => {
        setGoogleLoading(false);
        console.log('Google sign-in:', user, credential);
        alert(`Bienvenido ${user.name} (${user.email})! Tu dominio ${domainDisplay} con template "${template}" sera activado.`);
    }, [domainDisplay, template]);

    const { signIn: googleSignIn, isConfigured: googleConfigured } = useGoogleSignIn(handleGoogleSuccess);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const isValid =
        form.name.trim().length >= 2 &&
        form.email.includes('@') &&
        form.password.length >= 8 &&
        form.password === form.confirmPassword &&
        agreed;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setError(null);
        setLoading(true);

        try {
            // Paso 1: Crear cuenta
            setLoadingStep('account');
            const data = await register({
                email: form.email,
                password: form.password,
                name: form.name.trim(),
            });
            setUser(data.user);

            // Paso 2: Registrar dominio + crear BD tenant + guardar template
            if (domain) {
                setLoadingStep('domain');
                await createHostname(domain, template ?? undefined);
            }

            // Éxito — ir a la página de confirmación / cuenta
            navigate('/activado', {
                replace: true,
                state: {
                    domain: domain ? `${domain}.eirl.pe` : '',
                    template,
                },
            });
        } catch (err) {
            const msg = (err as ApiError).message || '';
            if (msg.toLowerCase().includes('hostname') || msg.toLowerCase().includes('dominio')) {
                setError('El dominio ya está registrado o no es válido. Vuelve atrás y elige otro.');
            } else {
                setError(msg || 'No se pudo completar el registro. Inténtalo de nuevo.');
            }
        } finally {
            setLoading(false);
            setLoadingStep(null);
        }
    };

    // Pantalla de carga mientras se activa el dominio para usuario ya logueado
    if ((authLoading || (user && loading)) && !error) {
        return (
            <div className="min-h-screen min-h-[100dvh] bg-background-light dark:bg-transparent font-display text-charcoal dark:text-primary-bright transition-colors duration-500 flex flex-col items-center justify-center gap-6 px-4">
                <div className="size-20 rounded-full bg-accent/10 dark:bg-accent-light/10 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-4xl text-accent dark:text-accent-light">rocket_launch</span>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xl sm:text-2xl font-bold text-charcoal dark:text-primary-bright">Activando tu dominio...</p>
                    <p className="text-base text-muted-beige dark:text-primary-bright/80">
                        Preparando <span className="font-semibold text-charcoal dark:text-primary-bright">{domainDisplay}</span>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light dark:bg-transparent font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <main className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 min-w-0">
                <div className="mx-auto max-w-xl min-w-0 w-full">
                    {/* Stepper */}
                    <div className="mb-10 sm:mb-12 md:mb-14">
                        <Stepper currentStep={2} />
                    </div>

                    {/* Header */}
                    <div className="text-center space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-1.5 text-sm sm:text-base text-muted-beige dark:text-primary-bright/90 hover:text-charcoal dark:hover:text-primary-bright transition-colors mb-2"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Volver
                        </button>
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary-bright leading-tight">
                            Crea tu <span className="italic font-normal">cuenta</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-beige dark:text-primary-bright/90 font-light">
                            Un paso mas para activar <span className="font-bold text-charcoal dark:text-primary-bright">{domainDisplay}</span>
                        </p>
                    </div>

                    {/* Resumen de seleccion */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 py-3 rounded-xl border border-charcoal/10 dark:border-primary/25 bg-white/50 dark:bg-surface-dark">
                        <span className="material-symbols-outlined text-lg text-muted-beige dark:text-primary-bright/90">language</span>
                        <span className="text-sm sm:text-base font-bold text-charcoal dark:text-primary-bright">{domainDisplay}</span>
                        <span className="text-charcoal/20 dark:text-primary-bright/60">/</span>
                        <span className="material-symbols-outlined text-lg text-muted-beige dark:text-primary-bright/90">palette</span>
                        <span className="text-sm sm:text-base text-muted-beige dark:text-primary-bright/90 capitalize">{template}</span>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    {/* Boton Google */}
                    <button
                        type="button"
                        onClick={() => {
                            setGoogleLoading(true);
                            googleSignIn();
                            setTimeout(() => setGoogleLoading(false), 5000);
                        }}
                        disabled={googleLoading}
                        className="relative w-full flex items-center justify-center gap-3 px-6 py-4 sm:py-5 rounded-2xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark hover:border-accent/25 dark:hover:border-accent-light/30 hover:shadow-md transition-all duration-300 active:scale-[0.99] group disabled:opacity-60 disabled:cursor-wait"
                    >
                        <svg className="size-5 sm:size-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm sm:text-base font-bold text-charcoal dark:text-primary-bright tracking-wide">
                            {googleLoading ? 'Conectando...' : 'Continuar con Google'}
                        </span>
                        {!googleConfigured && (
                            <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal/30 dark:text-primary-bright/70 absolute -bottom-5 left-0 right-0 text-center">
                                Requiere configurar VITE_GOOGLE_CLIENT_ID
                            </span>
                        )}
                    </button>

                    {/* Separador */}
                    <div className="flex items-center gap-4 my-8 sm:my-10">
                        <div className="flex-1 h-px bg-charcoal/10 dark:bg-primary/15" />
                        <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-charcoal/30 dark:text-primary-bright/70">o</span>
                        <div className="flex-1 h-px bg-charcoal/10 dark:bg-primary/15" />
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary-bright/90">
                                Nombre completo
                            </label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark focus-within:border-accent dark:focus-within:border-primary-bright transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary-bright/70 shrink-0">person</span>
                                <input
                                    type="text"
                                    placeholder="Juan Perez"
                                    value={form.name}
                                    onChange={handleChange('name')}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary-bright placeholder:text-charcoal/20 dark:placeholder:text-primary-bright/60"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary-bright/90">
                                Correo electronico
                            </label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark focus-within:border-accent dark:focus-within:border-primary-bright transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary-bright/70 shrink-0">mail</span>
                                <input
                                    type="email"
                                    placeholder="juan@empresa.com"
                                    value={form.email}
                                    onChange={handleChange('email')}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary-bright placeholder:text-charcoal/20 dark:placeholder:text-primary-bright/60"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary-bright/90">
                                Contraseña
                            </label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark focus-within:border-accent dark:focus-within:border-primary-bright transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary-bright/70 shrink-0">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Minimo 8 caracteres"
                                    value={form.password}
                                    onChange={handleChange('password')}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary-bright placeholder:text-charcoal/20 dark:placeholder:text-primary-bright/60"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-charcoal/30 dark:text-primary-bright/70 hover:text-charcoal/60 dark:hover:text-primary-bright transition-colors shrink-0"
                                >
                                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                            {form.password.length > 0 && form.password.length < 8 && (
                                <p className="text-xs text-rose-500 dark:text-rose-400 pl-1">Minimo 8 caracteres</p>
                            )}
                        </div>

                        {/* Confirmar Password */}
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary-bright/90">
                                Confirmar contraseña
                            </label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark focus-within:border-accent dark:focus-within:border-primary-bright transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary-bright/70 shrink-0">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Repite tu contraseña"
                                    value={form.confirmPassword}
                                    onChange={handleChange('confirmPassword')}
                                    className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary-bright placeholder:text-charcoal/20 dark:placeholder:text-primary-bright/60"
                                />
                            </div>
                            {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
                                <p className="text-xs text-rose-500 dark:text-rose-400 pl-1">Las contraseñas no coinciden</p>
                            )}
                        </div>

                        {/* Terminos */}
                        <label className="flex items-start gap-3 cursor-pointer group pt-2">
                            <div className="relative mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className={`size-5 sm:size-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                                    agreed
                                        ? 'bg-accent dark:bg-accent-light border-accent dark:border-accent-light'
                                        : 'border-charcoal/20 dark:border-primary/25 group-hover:border-accent/40 dark:group-hover:border-accent-light/40'
                                }`}>
                                    {agreed && (
                                        <span className="material-symbols-outlined text-sm text-white">check</span>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm sm:text-base text-muted-beige dark:text-primary-bright/90 leading-snug">
                                Acepto los{' '}
                                <a href="#" className="underline text-charcoal dark:text-primary-bright hover:opacity-80 transition-opacity">terminos de servicio</a>
                                {' '}y la{' '}
                                <a href="#" className="underline text-charcoal dark:text-primary-bright hover:opacity-80 transition-opacity">politica de privacidad</a>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!isValid || loading}
                            className="w-full py-4 sm:py-5 rounded-2xl bg-accent dark:bg-accent-light text-white font-bold text-base sm:text-lg tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed mt-4 shadow-lg shadow-accent/25"
                        >
                            {loadingStep === 'account' && 'Creando cuenta...'}
                            {loadingStep === 'domain' && 'Activando dominio...'}
                            {!loadingStep && 'Crear cuenta y activar dominio'}
                        </button>
                    </form>

                    {/* Nota */}
                    <p className="text-center text-xs sm:text-sm text-muted-beige dark:text-primary-bright/90 mt-8 sm:mt-10 font-light">
                        Tu landing page estara lista en minutos despues del registro.
                    </p>
                </div>
            </main>
        </div>
    );
}
