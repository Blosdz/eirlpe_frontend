export default function Footer() {
    return (
        <footer className="bg-charcoal dark:bg-charcoal text-primary pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 px-6 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">
            <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 md:gap-10 lg:gap-12">
                <div className="md:col-span-2 space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="size-9 sm:size-10 md:size-12 shrink-0">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase">eirl.pe</h2>
                    </div>
                    <p className="text-primary/50 text-xl sm:text-2xl font-serif max-w-sm md:max-w-md leading-relaxed">
                        Tu dominio profesional a un clic de distancia.
                    </p>
                    <div className="flex flex-wrap gap-6 sm:gap-8">
                        <a className="text-primary/50 hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm sm:text-base font-bold" href="#">
                            Twitter
                        </a>
                        <a className="text-primary/50 hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm sm:text-base font-bold" href="#">
                            Instagram
                        </a>
                        <a className="text-primary/50 hover:text-primary transition-colors uppercase tracking-[0.2em] text-sm sm:text-base font-bold" href="#">
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div className="space-y-4 sm:space-y-6">
                    <h5 className="uppercase tracking-widest text-sm font-bold text-primary/30">Oficina</h5>
                    <p className="text-base sm:text-lg leading-relaxed text-primary/70">
                        Av. José Larco 1232<br />
                        Miraflores, Lima<br /><br />
                        contacto@eirl.pe
                    </p>
                </div>
                <div className="space-y-4 sm:space-y-6">
                    <h5 className="uppercase tracking-widest text-sm font-bold text-primary/30">Enlaces</h5>
                    <nav className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg font-bold uppercase tracking-widest">
                        <a className="hover:underline" href="#">Contacto</a>
                        <a className="hover:underline" href="#">Soporte</a>
                        <a className="hover:underline" href="#">Términos</a>
                        <a className="hover:underline" href="#">Privacidad</a>
                    </nav>
                </div>
            </div>
            <div className="mt-20 sm:mt-24 md:mt-32 pt-8 sm:pt-10 md:pt-12 border-t border-primary/10 mx-auto max-w-[1440px] flex flex-col md:flex-row justify-between items-center gap-4 px-6 sm:px-8 md:px-12 lg:px-20 text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-primary/30">
                <p>© 2024 eirl.pe. Todos los derechos reservados.</p>
                <p>Empoderando negocios digitales.</p>
            </div>
        </footer>
    );
}
