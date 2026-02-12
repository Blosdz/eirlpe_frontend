interface ServiceCardProps {
    number: string;
    title: string;
    description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
    return (
        <article className="group relative flex gap-5 sm:gap-6 p-6 sm:p-8 md:p-10 rounded-2xl bg-white/70 dark:bg-charcoal/30 border border-border-beige/80 dark:border-primary/10 hover:bg-white dark:hover:bg-charcoal/50 hover:border-charcoal/15 dark:hover:border-primary/20 hover:shadow-lg hover:shadow-charcoal/5 dark:hover:shadow-black/20 transition-all duration-500">
            <div className="w-1 shrink-0 self-stretch rounded-full bg-charcoal/15 dark:bg-primary/30 group-hover:bg-charcoal/30 dark:group-hover:bg-primary/50 transition-colors duration-300" />

            <div className="flex-1 min-w-0">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal/30 dark:text-primary/40 tabular-nums">{number}</span>
                <h4 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-charcoal dark:text-primary tracking-tight">{title}</h4>
                <p className="mt-3 sm:mt-4 text-muted-beige dark:text-primary/70 text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
            </div>
        </article>
    );
}
