import { useState, useEffect, useRef } from 'react';
import { useTenantAuth } from '../../context/TenantAuthContext';
import { Save, LogOut, Loader2, RefreshCw } from 'lucide-react';

export default function TenantDashboard() {
    const { token, tenantHost, logout } = useTenantAuth();
    // Extract subdomain only: "test.localhost:3000" → "test", "test.eirl.pe" → "test"
    const tenant = tenantHost.split('.')[0];
    
    // Config state
    const [templateId, setTemplateId] = useState('plan-basico-opcion-1');
    const [customization, setCustomization] = useState<Record<string, string>>({});
    const [availableTemplates, setAvailableTemplates] = useState<{id: string, name: string}[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const fetchConfig = async () => {
        try {
            setLoading(true);

            // Fetch available templates
            const templatesRes = await fetch('/api/tenant-page/templates', {
                headers: { 'x-tenant-host': tenant }
            });
            if (templatesRes.ok) {
                const json = await templatesRes.json();
                const formatted = (json.templates || []).map((id: string) => ({
                    id, 
                    name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                }));
                setAvailableTemplates(formatted);
            }

            // Fetch active config
            const response = await fetch('/api/tenant-config/editor-data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-tenant-host': tenant
                }
            });
            if (!response.ok) throw new Error('Error al cargar la configuración');
            const data = await response.json();
            
            // Populate form
            if (data.activeConfig) {
                setTemplateId(data.activeConfig.templateId || 'plan-basico-opcion-1');
                setCustomization(data.activeConfig.customization || {});
            } else if (data.fields) {
                // Initialize empty customization from fields if no active config
                const initial: Record<string, string> = {};
                data.fields.forEach((f: any) => initial[f.key] = '');
                setCustomization(initial);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && tenantHost) {
            fetchConfig();
        }
    }, [token, tenantHost]);

    const handleCustomizationChange = (key: string, value: string) => {
        setCustomization(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccessMessage(null);

            const payload = {
                templateId,
                businessName: customization['NOMBRE_EMPRESA'] || tenantHost,
                isActive: true,
                customization
            };

            const response = await fetch('/api/tenant-config', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-tenant-host': tenant,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Error al guardar la configuración');
            
            setSuccessMessage('Configuración guardada exitosamente');
            
            // Reload iframe to reflect changes
            if (iframeRef.current) {
                iframeRef.current.src = iframeRef.current.src;
            }

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const refreshIframe = () => {
        if (iframeRef.current) {
            iframeRef.current.src = iframeRef.current.src;
        }
    };

    const previewUrl = `/api/tenant-page?tenant=${tenant}`;

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-charcoal dark:text-primary overflow-hidden">
            {/* Left Panel: Editor */}
            <div className="w-full md:w-1/3 lg:w-2/5 flex flex-col border-r border-charcoal/10 dark:border-primary/20 bg-white dark:bg-surface-dark shadow-lg z-10">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-charcoal/10 dark:border-primary/20 flex items-center justify-between sticky top-0 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md">
                    <div>
                        <h2 className="text-xl font-serif font-bold">Live Editor</h2>
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 dark:text-primary/50">{tenantHost}</span>
                    </div>
                    <button 
                        onClick={logout}
                        className="p-2 text-charcoal/60 dark:text-primary/60 hover:text-red-500 transition-colors"
                        title="Cerrar Sessión"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm border border-green-100 dark:border-green-900/50">
                            {successMessage}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center p-12 text-charcoal/50 dark:text-primary/50">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold ml-1">Plantilla</label>
                                <select 
                                    value={templateId}
                                    onChange={(e) => setTemplateId(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-charcoal/10 dark:border-primary/20 bg-transparent focus:ring-2 focus:ring-charcoal/20 dark:focus:ring-primary/20 outline-none transition-all"
                                >
                                    {availableTemplates.length > 0 ? (
                                        availableTemplates.map(t => (
                                            <option key={t.id} className="text-black" value={t.id}>{t.name}</option>
                                        ))
                                    ) : (
                                        <>
                                            <option className="text-black" value="plan-basico-opcion-1">Plan Básico — Opción 1</option>
                                            <option className="text-black" value="plan-basico-opcion-2">Plan Básico — Opción 2</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className="h-px bg-charcoal/10 dark:bg-primary/20" />

                            {Object.entries(customization).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                    <label className="text-xs font-bold tracking-wider text-charcoal/70 dark:text-primary/70 uppercase">
                                        {key.replace(/_/g, ' ')}
                                    </label>
                                    {key.includes('ESTILO') ? (
                                        <select
                                            value={value}
                                            onChange={(e) => handleCustomizationChange(key, e.target.value)}
                                            className="w-full p-2.5 rounded-lg border border-charcoal/10 dark:border-primary/20 bg-charcoal/5 dark:bg-black/20 focus:ring-2 focus:ring-charcoal/20 transition-all text-sm"
                                        >
                                            {key === 'ESTILO_COLOR' ? (
                                                <>
                                                    <option className="text-black" value="color-opcion-1">Azul</option>
                                                    <option className="text-black" value="color-opcion-2">Verde</option>
                                                    <option className="text-black" value="color-opcion-3">Oscuro</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option className="text-black" value="font-opcion-1">Moderna Sans</option>
                                                    <option className="text-black" value="font-opcion-2">Clásica Serif</option>
                                                </>
                                            )}
                                        </select>
                                    ) : key.includes('DESCRIPCION') ? (
                                        <textarea 
                                            value={value}
                                            onChange={(e) => handleCustomizationChange(key, e.target.value)}
                                            className="w-full p-2.5 rounded-lg border border-charcoal/10 dark:border-primary/20 bg-charcoal/5 dark:bg-black/20 focus:ring-2 focus:ring-charcoal/20 outline-none transition-all text-sm resize-y"
                                            rows={3}
                                            placeholder={`Ingresa ${key.toLowerCase()}`}
                                        />
                                    ) : (
                                        <input 
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleCustomizationChange(key, e.target.value)}
                                            className="w-full p-2.5 rounded-lg border border-charcoal/10 dark:border-primary/20 bg-charcoal/5 dark:bg-black/20 focus:ring-2 focus:ring-charcoal/20 outline-none transition-all text-sm"
                                            placeholder={`Ingresa ${key.toLowerCase()}`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 border-t border-charcoal/10 dark:border-primary/20 bg-charcoal/5 dark:bg-surface-dark">
                    <button 
                        onClick={handleSave}
                        disabled={saving || loading}
                        className="w-full py-3 px-4 bg-charcoal dark:bg-primary text-beige dark:text-charcoal rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Guardar Cambios
                    </button>
                    <p className="text-center text-xs text-charcoal/40 dark:text-primary/40 mt-3 flex items-center justify-center gap-1">
                        Los cambios se reflejarán instantáneamente en la web.
                    </p>
                </div>
            </div>

            {/* Right Panel: Live Preview */}
            <div className="hidden md:flex flex-col w-2/3 lg:w-3/5 bg-gray-100 dark:bg-black relative">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button 
                        onClick={refreshIframe}
                        className="p-2 bg-white dark:bg-surface-dark border border-black/10 shadow-sm rounded-lg text-charcoal dark:text-primary hover:scale-105 transition-transform"
                        title="Refrescar Previsualización"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <a 
                        href={tenantHost.includes('.') ? `http://${tenantHost}` : `http://${tenantHost}.localhost:3000`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 bg-white dark:bg-surface-dark border border-black/10 shadow-sm rounded-lg text-charcoal dark:text-primary font-bold text-sm hover:scale-105 transition-transform"
                    >
                        Abrir Web
                    </a>
                </div>
                
                <div className="flex-1 w-full h-full p-4 lg:p-8">
                    <div className="w-full h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white/50 dark:border-surface-dark/50 ring-1 ring-black/5">
                        {tenantHost && (
                            <iframe 
                                ref={iframeRef}
                                src={previewUrl}
                                className="w-full h-full border-0 bg-white"
                                title="Live Preview"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
