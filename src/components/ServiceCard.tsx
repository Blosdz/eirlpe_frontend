interface ServiceCardProps {
    number: string;
    title: string;
    description: string;
}

export default function ServiceCard({ number, title, description }: ServiceCardProps) {
    return (
        <article className="group relative flex gap-5 p-6 md:p-8 rounded-2xl bg-white/70 border border-border-beige/80 hover:bg-white hover:border-charcoal/15 hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-300">
            {/* Barra de acento */}
            <div className="w-0.5 shrink-0 self-stretch rounded-full bg-charcoal/15 group-hover:bg-charcoal/30 transition-colors" />

            <div className="flex-1 min-w-0">
                <span className="font-serif text-2xl text-charcoal/30 tabular-nums">{number}</span>
                <h4 className="mt-2 text-lg md:text-xl font-bold text-charcoal tracking-tight">{title}</h4>
                <p className="mt-3 text-muted-beige text-[15px] leading-relaxed">{description}</p>
            </div>
        </article>
    );
}
