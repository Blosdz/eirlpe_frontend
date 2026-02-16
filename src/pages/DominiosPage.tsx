export default function DominiosPage() {
    return (
        <div className="min-h-screen bg-background-light/90 backdrop-blur-[2px] font-display text-charcoal">
            <div className="pt-24 sm:pt-28 md:pt-32 px-6 sm:px-8 md:px-12">
                <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-charcoal">Dominios Disponibles</h1>
                    <div className="bg-primary/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 border-2 border-dashed border-charcoal/20">
                        <p className="text-xl sm:text-2xl md:text-3xl text-muted-beige mb-4 sm:mb-6">🚧 Página en construcción</p>
                        <p className="text-base sm:text-lg md:text-xl text-muted-beige max-w-xl mx-auto">
                            Esta sección está pendiente de completar por el equipo.
                            <br />Aquí se mostrará el catálogo completo de dominios disponibles.
                        </p>
                        <div className="mt-8 sm:mt-10">
                            <a href="/" className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-white rounded-full font-bold text-sm sm:text-base hover:opacity-90 transition-opacity shadow-lg shadow-accent/25">
                                <span className="material-symbols-outlined text-xl sm:text-2xl">arrow_back</span>
                                Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
