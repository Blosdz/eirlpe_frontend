const STEPS = [
    { label: 'Dominio', icon: 'language' },
    { label: 'Template', icon: 'palette' },
    { label: 'Registro', icon: 'person_add' },
];

export default function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center justify-center gap-0 flex-wrap min-w-0 px-2">
            {STEPS.map((step, i) => {
                const isDone = i < currentStep;
                const isCurrent = i === currentStep;
                const isLast = i === STEPS.length - 1;

                return (
                    <div key={step.label} className="flex items-center">
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2">
                            <div className={`flex items-center justify-center size-8 sm:size-9 md:size-10 lg:size-11 rounded-full border-2 transition-all duration-300 shrink-0 ${
                                isDone
                                    ? 'bg-accent dark:bg-accent-light border-accent dark:border-accent-light text-white'
                                    : isCurrent
                                        ? 'border-accent dark:border-accent-light text-accent dark:text-accent-light bg-transparent'
                                        : 'border-charcoal/15 dark:border-primary/35 text-charcoal/30 dark:text-primary/60 bg-transparent'
                            }`}>
                                {isDone ? (
                                    <span className="material-symbols-outlined text-base sm:text-lg">check</span>
                                ) : (
                                    <span className="material-symbols-outlined text-base sm:text-lg">{step.icon}</span>
                                )}
                            </div>
                            <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.08em] sm:tracking-[0.1em] uppercase transition-colors duration-300 whitespace-nowrap ${
                                isDone || isCurrent
                                    ? 'text-charcoal dark:text-primary'
                                    : 'text-charcoal/30 dark:text-primary/65'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                        {!isLast && (
                            <div className={`w-6 sm:w-10 md:w-14 lg:w-20 h-px mb-4 sm:mb-5 md:mb-6 mx-1 sm:mx-2 md:mx-3 transition-colors duration-300 shrink-0 ${
                                isDone ? 'bg-accent dark:bg-accent-light' : 'bg-charcoal/15 dark:bg-primary/20'
                            }`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
