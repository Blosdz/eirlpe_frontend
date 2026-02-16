const STEPS = [
    { label: 'Dominio', icon: 'language' },
    { label: 'Template', icon: 'palette' },
    { label: 'Registro', icon: 'person_add' },
];

export default function Stepper({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center justify-center gap-0">
            {STEPS.map((step, i) => {
                const isDone = i < currentStep;
                const isCurrent = i === currentStep;
                const isLast = i === STEPS.length - 1;

                return (
                    <div key={step.label} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <div className={`flex items-center justify-center size-9 sm:size-10 md:size-11 rounded-full border-2 transition-all duration-300 ${
                                isDone
                                    ? 'bg-accent border-accent text-white'
                                    : isCurrent
                                        ? 'border-accent text-accent bg-transparent'
                                        : 'border-charcoal/15 text-charcoal/30 bg-transparent'
                            }`}>
                                {isDone ? (
                                    <span className="material-symbols-outlined text-base sm:text-lg">check</span>
                                ) : (
                                    <span className="material-symbols-outlined text-base sm:text-lg">{step.icon}</span>
                                )}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                                isDone || isCurrent
                                    ? 'text-charcoal'
                                    : 'text-charcoal/30'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                        {!isLast && (
                            <div className={`w-10 sm:w-14 md:w-20 h-px mb-5 sm:mb-6 mx-2 sm:mx-3 transition-colors duration-300 ${
                                isDone ? 'bg-accent' : 'bg-charcoal/15'
                            }`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
