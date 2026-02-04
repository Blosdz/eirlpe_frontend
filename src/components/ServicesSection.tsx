import ServiceCard from './ServiceCard';

export default function ServicesSection() {
    const services = [
        {
            icon: 'domain',
            title: 'Registro de Subdominios',
            description: 'Obtén tu dominio .eirl.pe en minutos con proceso simplificado y activación inmediata.'
        },
        {
            icon: 'cloud_done',
            title: 'Hosting Incluido',
            description: 'Hosting profesional con 99.9% uptime, SSL gratuito y copias de seguridad automáticas.'
        },
        {
            icon: 'business_center',
            title: 'Herramientas Empresariales',
            description: 'Correos corporativos, panel de control intuitivo y soporte técnico especializado 24/7.'
        }
    ];

    return (
        <section className="py-32 px-6 md:px-20 bg-background-light">
            <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
                    <div className="max-w-2xl space-y-6">
                        <h3 className="text-charcoal uppercase tracking-[0.2em] text-sm font-bold">Lo que ofrecemos</h3>
                        <h2 className="font-serif text-4xl md:text-6xl text-charcoal">
                            Todo lo que necesitas para tu presencia digital.
                        </h2>
                    </div>
                    <p className="max-w-sm text-muted-beige text-lg font-light leading-relaxed">
                        Desde el registro hasta el soporte técnico, tenemos todo cubierto para que te enfoques en tu negocio.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
