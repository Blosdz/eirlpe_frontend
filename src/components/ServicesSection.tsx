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
        <section className="py-20 sm:py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 transition-colors duration-500">
            <div className="services-section-box mx-auto max-w-5xl lg:max-w-6xl rounded-3xl bg-background-light/90 dark:!bg-surface-dark backdrop-blur-[2px] shadow-xl shadow-charcoal/5 dark:shadow-black/30 border border-charcoal/5 dark:!border-primary/30 px-8 sm:px-10 md:px-16 lg:px-20 py-14 sm:py-16 md:py-20 lg:py-24 transition-colors duration-500">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-20 lg:mb-24">
                    <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
                        <h3 className="text-charcoal dark:!text-primary-bright uppercase tracking-[0.2em] text-sm sm:text-base font-bold">Lo que ofrecemos</h3>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-charcoal dark:!text-primary-bright dark:font-medium leading-tight">
                            Todo lo que necesitas para tu presencia digital.
                        </h2>
                    </div>
                    <p className="max-w-sm md:max-w-md text-muted-beige dark:!text-primary-bright text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                        Desde el registro hasta el soporte técnico, tenemos todo cubierto para que te enfoques en tu negocio.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
