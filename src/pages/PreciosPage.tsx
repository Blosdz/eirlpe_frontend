export default function PreciosPage() {
    return (
        <div className="min-h-screen bg-background-light/90 backdrop-blur-[2px] font-display text-charcoal">
            <div className="pt-32 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="font-serif text-5xl md:text-7xl text-charcoal">Planes y Precios</h1>
                    <div className="bg-primary/20 rounded-2xl p-12 border-2 border-dashed border-charcoal/20">
                        <p className="text-xl text-muted-beige mb-4">🚧 Página en construcción</p>
                        <p className="text-muted-beige">
                            Esta sección está pendiente de completar por el equipo.
                            <br />Aquí se mostrarán los planes y precios detallados.
                        </p>
                        <div className="mt-8">
                            <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-primary rounded-full font-bold hover:bg-charcoal/90 transition-colors">
                                <span className="material-symbols-outlined">arrow_back</span>
                                Volver al inicio
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
