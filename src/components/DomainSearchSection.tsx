import { useState } from 'react';

export default function DomainSearchSection() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-primary/20 dark:bg-charcoal/40 transition-colors duration-500">
            <div className="mx-auto max-w-4xl text-center space-y-8 sm:space-y-10">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal dark:text-primary transition-colors duration-500">
                    Encuentra tu dominio perfecto.
                </h2>
                <div className="relative group">
                    <label className="flex flex-col w-full">
                        <div className="flex w-full items-stretch border-b-2 border-charcoal/10 dark:border-primary/20 focus-within:border-charcoal dark:focus-within:border-primary transition-colors pb-3 sm:pb-4 group">
                            <div className="text-charcoal/40 dark:text-primary/50 flex items-center justify-center pr-2 sm:pr-4">
                                <span className="material-symbols-outlined text-2xl sm:text-3xl">search</span>
                            </div>
                            <div className="flex items-center w-full text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif">
                                <span className="text-charcoal/40 dark:text-primary/50 shrink-0">www.</span>
                                <input
                                    className="flex-1 bg-transparent border-none focus:ring-0 placeholder:text-charcoal/10 dark:placeholder:text-primary/20 p-0 text-charcoal dark:text-primary min-w-0 transition-colors duration-500"
                                    placeholder="tuempresa"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                />
                                <span className="text-charcoal/40 dark:text-primary/50 shrink-0">.eirl.pe</span>
                            </div>
                        </div>
                    </label>
                    <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 dark:border-primary/20 text-xs sm:text-sm text-muted-beige dark:text-primary/50 transition-colors duration-500">consultoria.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 dark:border-primary/20 text-xs sm:text-sm text-muted-beige dark:text-primary/50 transition-colors duration-500">abogados.eirl.pe</span>
                        <span className="px-3 py-1 rounded-full border border-charcoal/10 dark:border-primary/20 text-xs sm:text-sm text-muted-beige dark:text-primary/50 transition-colors duration-500">arquitectura.eirl.pe</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
