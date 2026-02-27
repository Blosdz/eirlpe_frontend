import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenantAuth } from '../../context/TenantAuthContext';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function TenantLoginPage() {
    const navigate = useNavigate();
    const { login, tenantHost } = useTenantAuth();
    // Extract subdomain only: "test.localhost:3000" → "test", "test.eirl.pe" → "test"
    const tenant = tenantHost.split('.')[0];

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/tenant-users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-host': tenant
                },
                body: JSON.stringify({ mail, password })
            });

            const data = await response.json();

            if (!response.ok) {
                // Determine if it is a string or an object with a message
                const errMessage = typeof data.message === 'string' ? data.message : 
                                   (data.message && typeof data.message[0] === 'string' ? data.message[0] : 'Error en las credenciales');
                throw new Error(errMessage);
            }

            // data contains: { user: {...}, access_token: "eyJ..." }
            login(data.access_token, data.user);
            navigate('/dashboard', { replace: true });
            
        } catch (err: any) {
             setError(err.message || 'Error al iniciar sesión. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-surface-dark border border-charcoal/10 dark:border-primary/20 rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-charcoal dark:text-primary mb-2 capitalize">{tenant}</h1>
                    <p className="text-charcoal/60 dark:text-primary/70">Ingresa a tu panel de administración</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-charcoal dark:text-primary ml-1 block">Correo electrónico</label>
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-primary/40 pointer-events-none" />
                            <input 
                                type="email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/10 dark:border-primary/20 bg-transparent dark:bg-black/20 focus:ring-2 focus:ring-charcoal dark:focus:ring-primary outline-none transition-all text-charcoal dark:text-primary"
                                placeholder="admin@ejemplo.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-charcoal dark:text-primary ml-1 block">Contraseña</label>
                        <div className="relative">
                            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-primary/40 pointer-events-none" />
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-charcoal/10 dark:border-primary/20 bg-transparent dark:bg-black/20 focus:ring-2 focus:ring-charcoal dark:focus:ring-primary outline-none transition-all text-charcoal dark:text-primary"
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-charcoal dark:bg-primary text-beige dark:text-charcoal rounded-xl font-bold flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
