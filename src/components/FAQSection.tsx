import { useState } from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item border-b border-border-beige dark:!border-primary/25 transition-colors duration-500">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 sm:py-5 md:py-6 lg:py-8 flex justify-between items-start sm:items-center gap-3 text-left group hover:bg-accent/5 dark:hover:bg-primary/10 px-4 sm:px-6 rounded-lg transition-colors duration-300"
            >
                <h3 className="min-w-0 flex-1 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-charcoal dark:!text-primary-bright pr-2 sm:pr-8">{question}</h3>
                <span className={`material-symbols-outlined text-2xl sm:text-3xl text-charcoal dark:!text-primary-bright transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[28rem] sm:max-h-96 pb-6 sm:pb-8' : 'max-h-0'}`}
            >
                <p className="text-muted-beige dark:!text-primary-bright/95 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-6">{answer}</p>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const faqs = [
        {
            question: '¿Qué es eirl.pe?',
            answer: 'eirl.pe es un servicio de registro de subdominios profesionales. Te permite crear tu presencia digital con un dominio personalizado bajo eirl.pe, ideal para empresas individuales, consultores, profesionales y pequeños negocios en Perú.'
        },
        {
            question: '¿Cómo funciona el registro de subdominios?',
            answer: 'Es muy sencillo: buscas el nombre que deseas (por ejemplo, "tuempresa"), verificas disponibilidad, y en minutos tendrás activo www.tuempresa.eirl.pe. Incluye hosting, certificado SSL y panel de administración.'
        },
        {
            question: '¿Cuánto cuesta un subdominio .eirl.pe?',
            answer: 'Ofrecemos planes desde S/. 99 anuales con todo incluido: dominio, hosting, certificado SSL, soporte técnico y actualizaciones. Sin costos ocultos ni tarifas adicionales.'
        },
        {
            question: '¿Puedo transferir mi sitio web existente?',
            answer: 'Sí, totalmente. Nuestro equipo te ayuda a migrar tu sitio web actual a tu nuevo dominio .eirl.pe sin costo adicional. El proceso es rápido y sin interrupciones en tu servicio.'
        },
        {
            question: '¿Qué incluye el servicio?',
            answer: 'Cada subdominio incluye: registro del dominio, hosting con 99.9% uptime, certificado SSL gratuito, correos corporativos, panel de control intuitivo, soporte técnico 24/7 y copias de seguridad automáticas.'
        },
        {
            question: '¿Es necesario tener conocimientos técnicos?',
            answer: 'No es necesario. Nuestro panel de control es extremadamente fácil de usar y ofrecemos soporte técnico completo. Si necesitas ayuda, nuestro equipo está disponible para asistirte en todo momento.'
        }
    ];

    return (
        <section id="preguntas-frecuentes" className="faq-section py-14 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-background-light/90 dark:!bg-transparent backdrop-blur-[2px] transition-colors duration-500">
            <div className="mx-auto max-w-4xl lg:max-w-5xl min-w-0">
                <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 space-y-3 sm:space-y-4 md:space-y-6">
                    <h3 className="text-charcoal dark:!text-primary-bright uppercase tracking-[0.2em] text-xs sm:text-sm md:text-base font-bold">Preguntas Frecuentes</h3>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-charcoal dark:!text-primary-bright">
                        ¿Tienes dudas?
                    </h2>
                    <p className="text-muted-beige dark:!text-primary-bright/95 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-2xl mx-auto px-1">
                        Aquí respondemos las preguntas más comunes sobre nuestro servicio.
                    </p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
}
