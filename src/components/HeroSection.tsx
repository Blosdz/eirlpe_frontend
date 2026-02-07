import { useState } from 'react';

export default function HeroSection() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-20 px-6 text-center">
            <div className="max-w-5xl space-y-10 relative z-10">
                {/* Sitio Web Gratis Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 border border-charcoal/10 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-charcoal/50"></div>
                    <span className="text-sm font-semibold tracking-wide text-charcoal/80">Sitio Web Gratis</span>
                </div>

                <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] tracking-tight text-charcoal">
                    Tu <span className="italic font-normal">Dominio</span> Profesional.
                </h1>
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-beige font-light leading-relaxed">
                    Registra tu subdominio .eirl.pe y construye tu presencia digital profesional en minutos.
                </p>

                {/* Domain Search */}
                <div className="pt-4">
                    <label className="flex flex-col w-full max-w-3xl mx-auto">
                        <div className="flex w-full items-center justify-center border-2 border-charcoal/20 focus-within:border-charcoal rounded-full transition-colors px-6 py-4 bg-white/80 backdrop-blur-sm shadow-xl">
                            <div className="text-charcoal/40 flex items-center justify-center pr-3">
                                <span className="material-symbols-outlined text-2xl">search</span>
                            </div>
                            <div className="flex items-center flex-1 text-xl md:text-2xl font-serif">
                                <span className="text-charcoal/50">www.</span>
                                <input
                                    className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-charcoal/20 p-0 text-charcoal min-w-0 mx-1"
                                    placeholder="tuempresa"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                />
                                <span className="text-charcoal/50">.eirl.pe</span>
                            </div>
                            <button className="ml-4 px-6 py-2 bg-charcoal text-primary rounded-full font-bold text-sm tracking-wider uppercase hover:bg-charcoal/90 transition-colors">
                                Buscar
                            </button>
                        </div>
                    </label>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige bg-white/50">consultoría.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige bg-white/50">abogados.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige bg-white/50">arquitectura.eirl.pe</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
