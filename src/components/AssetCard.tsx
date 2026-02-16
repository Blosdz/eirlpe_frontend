interface AssetCardProps {
    imageUrl: string;
    category: string;
    domain: string;
}

export default function AssetCard({ imageUrl, category, domain }: AssetCardProps) {
    return (
        <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer relative bg-white border border-charcoal/5 transition-colors duration-500">
            <div
                className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url("${imageUrl}")` }}
            />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-8 w-full bg-gradient-to-t from-charcoal/80 to-transparent">
                <p className="text-primary/70 text-xs sm:text-sm font-bold uppercase tracking-widest">{category}</p>
                <h5 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif mt-1">{domain}</h5>
            </div>
        </div>
    );
}
