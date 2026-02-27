import ServiceCard from './ServiceCard';

export default function ServicesSection() {
    const services = [
        {
            number: '01',
            title: 'Registro de Subdominios',
            description: 'Obtén tu dominio .eirl.pe en minutos con proceso simplificado y activación inmediata.'
        },
        {
            number: '02',
            title: 'Hosting Incluido',
            description: 'Hosting profesional con 99.9% uptime, SSL gratuito y copias de seguridad automáticas.'
        },
        {
            number: '03',
            title: 'Herramientas Empresariales',
            description: 'Correos corporativos, panel de control intuitivo y soporte técnico especializado 24/7.'
        }
    ];

    return (
        <section className="py-14 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 transition-colors duration-500">
            <div className="services-section-wrap relative mx-auto max-w-5xl lg:max-w-6xl">
                {/* Resplandor difuminado detrás del bloque */}
                <div className="services-section-glow absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-3xl sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-accent/5 to-accent-light/15 dark:from-accent/25 dark:via-accent/10 dark:to-accent-light/20 blur-2xl sm:blur-3xl opacity-70 dark:opacity-60 pointer-events-none transition-opacity duration-500" aria-hidden />
                <div className="services-section-box relative z-10 mx-auto max-w-5xl lg:max-w-6xl rounded-2xl sm:rounded-3xl bg-background-light/90 dark:!bg-surface-dark-elevated backdrop-blur-[2px] shadow-xl shadow-charcoal/5 dark:shadow-black/20 dark:ring-1 dark:ring-primary/20 border border-charcoal/5 dark:!border-primary/20 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-24 transition-colors duration-500 min-w-0">
                <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20 xl:mb-24">
                    <div className="min-w-0 max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4 md:space-y-6">
                        <h3 className="text-charcoal dark:!text-primary-bright uppercase tracking-[0.2em] text-xs sm:text-sm md:text-base font-bold">Lo que ofrecemos</h3>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-charcoal dark:!text-primary-bright dark:font-medium leading-tight">
                            Todo lo que necesitas para tu presencia digital.
                        </h2>
                    </div>
                    <p className="min-w-0 max-w-sm md:max-w-md text-muted-beige dark:!text-primary-bright text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed">
                        Desde el registro hasta el soporte técnico, tenemos todo cubierto para que te enfoques en tu negocio.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
            </div>
        </section>
    );
}
