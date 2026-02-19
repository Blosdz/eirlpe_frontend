interface ServiceCardProps {
    number: string;
    title: string;
    description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
    return (
        <article className="service-card group relative flex gap-5 sm:gap-6 p-6 sm:p-8 md:p-10 rounded-2xl bg-white/70 dark:!bg-surface-dark border border-border-beige/80 dark:!border-primary/35 hover:bg-white dark:hover:!bg-surface-dark dark:hover:border-accent-light/50 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-accent/10 transition-all duration-500">
            <div className="w-1 shrink-0 self-stretch rounded-full bg-accent/20 dark:!bg-primary-bright/30 dark:group-hover:bg-accent-light group-hover:bg-accent transition-colors duration-300" />

            <div className="flex-1 min-w-0">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal/30 dark:!text-primary-bright tabular-nums">{number}</span>
                <h4 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-charcoal dark:!text-primary-bright tracking-tight">{title}</h4>
                <p className="mt-3 sm:mt-4 text-muted-beige dark:!text-primary-bright text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
            </div>
        </article>
    );
}
