import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../api/auth';
import type { UpdateProfileBody } from '../api/auth';
import type { ApiError } from '../api/client';

export default function CuentaPage() {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [document, setDocument] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [rucCompany, setRucCompany] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const profile = user?.profile ?? user?.userProfile;
    const p = profile as { company_name?: string; companyName?: string; document?: string; phone?: string; address?: string; ruc_company?: string } | undefined;

    useEffect(() => {
        if (user) {
            setName(user.name ?? '');
            setEmail(user.email ?? '');
            setCompanyName(p?.company_name ?? p?.companyName ?? '');
            setDocument(p?.document ?? '');
            setPhone(p?.phone ?? '');
            setAddress(p?.address ?? '');
            setRucCompany(p?.ruc_company ?? '');
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword && newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'La nueva contraseña y la confirmación no coinciden.' });
            return;
        }
        if (newPassword && newPassword.length < 8) {
            setMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 8 caracteres.' });
            return;
        }
        if (newPassword && !currentPassword) {
            setMessage({ type: 'error', text: 'Indica tu contraseña actual para cambiar la contraseña.' });
            return;
        }
        setSaving(true);
        try {
            const body: UpdateProfileBody = {
                name: name.trim() || undefined,
                email: email.trim() || undefined,
                company_name: companyName.trim() || undefined,
                document: document.trim() || undefined,
                phone: phone.trim() || undefined,
                address: address.trim() || undefined,
                ruc_company: rucCompany.trim() || undefined,
            };
            if (newPassword) {
                body.currentPassword = currentPassword;
                body.newPassword = newPassword;
            }
            const data = await updateProfile(body);
            setUser(data.user);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage({ type: 'success', text: 'Cambios guardados correctamente.' });
        } catch (err) {
            setMessage({ type: 'error', text: (err as ApiError).message || 'No se pudieron guardar los cambios.' });
        } finally {
            setSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen min-h-[100dvh] bg-background-light/90 dark:bg-transparent font-display text-charcoal dark:text-primary-bright overflow-x-hidden">
                <Header />
                <div className="pt-24 sm:pt-28 md:pt-32 pb-12 px-4 sm:px-6 md:px-8 lg:px-12">
                    <div className="max-w-2xl mx-auto text-center rounded-2xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90 p-8 sm:p-10">
                        <p className="text-lg text-muted-beige dark:text-primary-bright/90 mb-6">Inicia sesión para editar tu cuenta.</p>
                        <Link to="/login" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent dark:bg-accent-light text-white rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const inputClass =
        'w-full px-4 py-3 rounded-xl border-2 border-charcoal/10 dark:border-primary/25 bg-white dark:bg-surface-dark text-charcoal dark:text-primary-bright placeholder:text-charcoal/30 dark:placeholder:text-primary/50 focus:border-accent dark:focus:border-accent-light focus:ring-0 transition-colors';
    const labelClass = 'block text-xs font-bold tracking-wider uppercase text-charcoal/60 dark:text-primary/70 mb-1.5';

    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light/90 dark:bg-transparent backdrop-blur-[2px] font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 min-w-0">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-charcoal/15 dark:border-primary/25 text-charcoal dark:text-primary text-sm font-semibold hover:bg-charcoal/5 dark:hover:bg-primary/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Inicio
                        </Link>
                    </div>
                    <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-charcoal dark:text-primary-bright">Mi cuenta</h1>

                    <form onSubmit={handleSubmit} className="rounded-2xl sm:rounded-3xl border border-charcoal/10 dark:border-primary/20 bg-white/80 dark:bg-surface-dark/90 shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-8 md:p-10 space-y-6">
                            {message && (
                                <div
                                    className={`rounded-xl px-4 py-3 text-sm ${
                                        message.type === 'success'
                                            ? 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                            : 'bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <section className="space-y-4">
                                <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal/50 dark:text-primary/60 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                    Datos personales
                                </h2>
                                <div>
                                    <label className={labelClass}>Nombre completo</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={inputClass}
                                        placeholder="Ej. Juan Pérez"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Correo electrónico</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={inputClass}
                                        placeholder="tu@email.com"
                                        required
                                    />
                                </div>
                            </section>

                            <section className="space-y-4 pt-4 border-t border-charcoal/10 dark:border-primary/20">
                                <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal/50 dark:text-primary/60 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">lock</span>
                                    Cambiar contraseña
                                </h2>
                                <p className="text-xs text-muted-beige dark:text-primary/70">Deja en blanco si no quieres cambiar la contraseña.</p>
                                <div>
                                    <label className={labelClass}>Contraseña actual</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="Solo si vas a cambiar la contraseña"
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Nueva contraseña</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="Mínimo 8 caracteres"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Confirmar nueva contraseña</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputClass}
                                        placeholder="Repite la nueva contraseña"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </section>

                            <section className="space-y-4 pt-4 border-t border-charcoal/10 dark:border-primary/20">
                                <h2 className="text-sm font-bold tracking-widest uppercase text-charcoal/50 dark:text-primary/60 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">business</span>
                                    Datos de empresa
                                </h2>
                                <p className="text-xs text-muted-beige dark:text-primary/70">Opcional. Si tienes un dominio .eirl.pe, aquí puedes guardar los datos asociados.</p>
                                <div>
                                    <label className={labelClass}>Razón social / Empresa</label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className={inputClass}
                                        placeholder="Nombre de la empresa"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Documento (DNI / CE)</label>
                                    <input
                                        type="text"
                                        value={document}
                                        onChange={(e) => setDocument(e.target.value)}
                                        className={inputClass}
                                        placeholder="Número de documento"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Teléfono</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={inputClass}
                                        placeholder="Ej. 999 888 777"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Dirección</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className={inputClass}
                                        placeholder="Dirección fiscal"
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>RUC (empresa)</label>
                                    <input
                                        type="text"
                                        value={rucCompany}
                                        onChange={(e) => setRucCompany(e.target.value)}
                                        className={inputClass}
                                        placeholder="11 dígitos"
                                    />
                                </div>
                            </section>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full sm:w-auto min-w-[180px] py-3 px-6 rounded-full bg-accent dark:bg-accent-light text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar cambios'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
