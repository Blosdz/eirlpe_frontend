import Header from '../components/Header';

export default function DominiosPage() {
    return (
        <div className="min-h-screen min-h-[100dvh] bg-background-light/90 dark:bg-transparent backdrop-blur-[2px] font-display text-charcoal dark:text-primary-bright transition-colors duration-500 overflow-x-hidden">
            <Header />
            <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 min-w-0">
                <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
                    <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal dark:text-primary-bright px-2">Dominios Disponibles</h1>
                    <div className="bg-primary/20 dark:bg-surface-dark/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 border-2 border-dashed border-charcoal/20 dark:border-primary/25">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-beige dark:text-primary-bright mb-3 sm:mb-6">🚧 Página en construcción</p>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-beige dark:text-primary-bright/95 max-w-xl mx-auto px-2">
                            Esta sección está pendiente de completar por el equipo.
                            <br className="hidden sm:block" />Aquí se mostrará el catálogo completo de dominios disponibles.
                        </p>
                        <div className="mt-6 sm:mt-8 md:mt-10">
                            <a href="/" className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-4 min-h-[44px] bg-accent text-white rounded-full font-bold text-sm sm:text-base hover:opacity-90 transition-opacity shadow-lg shadow-accent/25">
                                <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl">arrow_back</span>
                                Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
