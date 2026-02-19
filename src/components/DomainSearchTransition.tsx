import { useEffect, useState } from 'react';

const MESSAGES = [
    'Buscando dominio',
    'Verificando disponibilidad',
    'Preparando tu espacio',
    'Casi listo',
];

const MESSAGE_INTERVAL = 1200;
const TOTAL_DURATION = MESSAGES.length * MESSAGE_INTERVAL;

interface Props {
    domain: string;
    onComplete: () => void;
}

export default function DomainSearchTransition({ domain, onComplete }: Props) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    // Entrada
    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
    }, []);

    // Ciclar mensajes
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((i) => {
                if (i < MESSAGES.length - 1) return i + 1;
                return i;
            });
        }, MESSAGE_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // Terminar: navegar directamente sin fade-out (la nueva pagina reemplaza el overlay)
    useEffect(() => {
        const timer = setTimeout(onComplete, TOTAL_DURATION);
        return () => clearTimeout(timer);
    }, [onComplete]);

    // Barra de progreso
    const progress = ((messageIndex + 1) / MESSAGES.length) * 100;

    return (
        <div
            className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background-light dark:bg-background-dark transition-opacity duration-500 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Contenido central */}
            <div className={`flex flex-col items-center space-y-10 sm:space-y-12 transition-all duration-700 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
                {/* Dominio */}
                <div className="text-center space-y-3">
                    <p className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-muted-beige dark:text-primary/80">
                        Dominio
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-primary">
                        {domain}<span className="text-muted-beige dark:text-primary/80">.eirl.pe</span>
                    </h2>
                </div>

                {/* Barra de progreso */}
                <div className="w-48 sm:w-64 md:w-80 h-0.5 bg-charcoal/10 dark:bg-primary/15 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent dark:bg-accent-light rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Mensaje actual */}
                <div className="h-8 flex items-center justify-center">
                    <p
                        key={messageIndex}
                        className="text-base sm:text-lg md:text-xl text-muted-beige dark:text-primary/90 font-light animate-fadeInUp"
                    >
                        {MESSAGES[messageIndex]}
                    </p>
                </div>
            </div>
        </div>
    );
}
