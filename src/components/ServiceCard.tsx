interface ServiceCardProps {
    number: string;
    title: string;
    description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
    return (
        <article className="group relative flex gap-5 sm:gap-6 p-6 sm:p-8 md:p-10 rounded-2xl bg-white/70 border border-border-beige/80 hover:bg-white:bg-background-dark/60 hover:border-accent/20:border-accent-light/25 hover:shadow-lg hover:shadow-accent/5:shadow-accent/10 transition-all duration-500">
            <div className="w-1 shrink-0 self-stretch rounded-full bg-accent/20 group-hover:bg-accent:bg-accent-light transition-colors duration-300" />

            <div className="flex-1 min-w-0">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal/30 tabular-nums">{number}</span>
                <h4 className="mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-charcoal tracking-tight">{title}</h4>
                <p className="mt-3 sm:mt-4 text-muted-beige text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
            </div>
        </article>
    );
}
