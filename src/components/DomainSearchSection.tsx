import { useState } from 'react';

export default function DomainSearchSection() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <section className="py-20 px-6 bg-primary/20">
            <div className="mx-auto max-w-4xl text-center space-y-10">
                <h2 className="font-serif text-3xl text-charcoal">Encuentra tu dominio perfecto.</h2>
                <div className="relative group">
                    <label className="flex flex-col w-full">
                        <div className="flex w-full items-stretch border-b-2 border-charcoal/10 focus-within:border-charcoal transition-colors pb-4 group">
                            <div className="text-charcoal/40 flex items-center justify-center pr-4">
                                <span className="material-symbols-outlined text-3xl">search</span>
                            </div>
                            <div className="flex items-center w-full text-2xl md:text-4xl font-serif">
                                <span className="text-charcoal/40">www.</span>
                                <input
                                    className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-charcoal/10 p-0 text-charcoal min-w-0"
                                    placeholder="tuempresa"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                />
                                <span className="text-charcoal/40">.eirl.pe</span>
                            </div>
                        </div>
                    </label>
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige">consultoría.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige">abogados.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 text-xs text-muted-beige">arquitectura.eirl.pe</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
