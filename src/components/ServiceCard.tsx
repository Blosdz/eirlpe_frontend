interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
    return (
        <div className="group space-y-6 p-8 rounded-2xl border border-border-beige bg-white hover:border-charcoal/20 transition-all duration-500">
            <div className="size-14 rounded-full bg-primary flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <div className="space-y-3">
                <h4 className="text-xl font-bold text-charcoal">{title}</h4>
                <p className="text-muted-beige leading-relaxed">{description}</p>
            </div>
            <div className="pt-4 flex items-center text-charcoal font-bold text-sm tracking-widest uppercase gap-2 cursor-pointer group-hover:gap-4 transition-all">
                Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
        </div>
    );
}
