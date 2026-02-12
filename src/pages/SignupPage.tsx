import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Header from '../components/Header';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogleSuccess = useCallback((user: { email: string; name: string }, credential: string) => {
        setGoogleLoading(false);
        console.log('Google sign-in:', user, credential);
        alert(`Bienvenido ${user.name} (${user.email})`);
    }, []);

    const { signIn: googleSignIn } = useGoogleSignIn(handleGoogleSuccess);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const isValid =
        form.name.trim().length >= 2 &&
        form.email.includes('@') &&
        form.password.length >= 8 &&
        form.password === form.confirmPassword &&
        agreed;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        alert(`Cuenta creada para ${form.email}`);
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-charcoal dark:text-primary">
            <Header />
            <main className="pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 px-6 sm:px-8 md:px-12">
                <div className="mx-auto max-w-md">
                    <div className="text-center space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary leading-tight">
                            Crear <span className="italic font-normal">cuenta</span>
                        </h1>
                        <p className="text-base sm:text-lg text-muted-beige dark:text-primary/60 font-light">
                            Registrate y comienza a construir tu presencia digital.
                        </p>
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        onClick={() => { setGoogleLoading(true); googleSignIn(); setTimeout(() => setGoogleLoading(false), 5000); }}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 sm:py-5 rounded-2xl border-2 border-charcoal/10 dark:border-primary/15 bg-white dark:bg-charcoal/40 hover:border-charcoal/25 dark:hover:border-primary/30 hover:shadow-md transition-all duration-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-wait"
                    >
                        <svg className="size-5 sm:size-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="text-sm sm:text-base font-bold text-charcoal dark:text-primary tracking-wide">
                            {googleLoading ? 'Conectando...' : 'Registrarse con Google'}
                        </span>
                    </button>

                    <div className="flex items-center gap-4 my-8 sm:my-10">
                        <div className="flex-1 h-px bg-charcoal/10 dark:bg-primary/15" />
                        <span className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase text-charcoal/30 dark:text-primary/30">o</span>
                        <div className="flex-1 h-px bg-charcoal/10 dark:bg-primary/15" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary/50">Nombre completo</label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/15 bg-white dark:bg-charcoal/40 focus-within:border-charcoal dark:focus-within:border-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary/30 shrink-0">person</span>
                                <input type="text" placeholder="Juan Perez" value={form.name} onChange={handleChange('name')} className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary placeholder:text-charcoal/20 dark:placeholder:text-primary/25" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary/50">Correo electronico</label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/15 bg-white dark:bg-charcoal/40 focus-within:border-charcoal dark:focus-within:border-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary/30 shrink-0">mail</span>
                                <input type="email" placeholder="juan@empresa.com" value={form.email} onChange={handleChange('email')} className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary placeholder:text-charcoal/20 dark:placeholder:text-primary/25" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary/50">Contraseña</label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/15 bg-white dark:bg-charcoal/40 focus-within:border-charcoal dark:focus-within:border-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary/30 shrink-0">lock</span>
                                <input type={showPassword ? 'text' : 'password'} placeholder="Minimo 8 caracteres" value={form.password} onChange={handleChange('password')} className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary placeholder:text-charcoal/20 dark:placeholder:text-primary/25" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-charcoal/30 dark:text-primary/30 hover:text-charcoal/60 dark:hover:text-primary/60 transition-colors shrink-0">
                                    <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                            {form.password.length > 0 && form.password.length < 8 && (
                                <p className="text-xs text-rose-500 dark:text-rose-400 pl-1">Minimo 8 caracteres</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-bold tracking-[0.1em] uppercase text-charcoal/60 dark:text-primary/50">Confirmar contraseña</label>
                            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-charcoal/10 dark:border-primary/15 bg-white dark:bg-charcoal/40 focus-within:border-charcoal dark:focus-within:border-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-lg text-charcoal/30 dark:text-primary/30 shrink-0">lock</span>
                                <input type={showPassword ? 'text' : 'password'} placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={handleChange('confirmPassword')} className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-base sm:text-lg text-charcoal dark:text-primary placeholder:text-charcoal/20 dark:placeholder:text-primary/25" />
                            </div>
                            {form.confirmPassword.length > 0 && form.password !== form.confirmPassword && (
                                <p className="text-xs text-rose-500 dark:text-rose-400 pl-1">Las contraseñas no coinciden</p>
                            )}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer group pt-2">
                            <div className="relative mt-0.5">
                                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
                                <div className={`size-5 sm:size-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${agreed ? 'bg-charcoal dark:bg-primary border-charcoal dark:border-primary' : 'border-charcoal/20 dark:border-primary/20 group-hover:border-charcoal/40 dark:group-hover:border-primary/40'}`}>
                                    {agreed && <span className="material-symbols-outlined text-sm text-primary dark:text-charcoal">check</span>}
                                </div>
                            </div>
                            <span className="text-sm sm:text-base text-muted-beige dark:text-primary/60 leading-snug">
                                Acepto los <a href="#" className="underline text-charcoal dark:text-primary hover:opacity-80 transition-opacity">terminos de servicio</a> y la <a href="#" className="underline text-charcoal dark:text-primary hover:opacity-80 transition-opacity">politica de privacidad</a>
                            </span>
                        </label>

                        <button type="submit" disabled={!isValid} className="w-full py-4 sm:py-5 rounded-2xl bg-charcoal dark:bg-primary text-primary dark:text-charcoal font-bold text-base sm:text-lg tracking-wider uppercase hover:opacity-90 transition-all duration-300 active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed mt-4">
                            Crear cuenta
                        </button>
                    </form>

                    <p className="text-center text-sm sm:text-base text-muted-beige dark:text-primary/50 mt-8 sm:mt-10">
                        Ya tienes cuenta?{' '}
                        <Link to="/login" className="font-bold text-charcoal dark:text-primary hover:opacity-80 transition-opacity underline">
                            Inicia sesion
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
