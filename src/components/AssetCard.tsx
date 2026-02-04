interface AssetCardProps {
    imageUrl: string;
    category: string;
    domain: string;
}

export default function AssetCard({ imageUrl, category, domain }: AssetCardProps) {
    return (
        <div className="aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer relative bg-white border border-charcoal/5">
            <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url("${imageUrl}")` }}
            />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-charcoal/80 to-transparent">
                <p className="text-primary/70 text-xs font-bold uppercase tracking-widest">{category}</p>
                <h5 className="text-white text-xl font-serif">{domain}</h5>
            </div>
        </div>
    );
}
