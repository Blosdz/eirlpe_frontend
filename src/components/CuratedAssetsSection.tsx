import AssetCard from './AssetCard';

export default function CuratedAssetsSection() {
    const assets = [
        {
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiYakFhG7bvSPH4HuAqiplXAaLiPf3EktIMzEkrxK7wq5jB7Q3oUe51LQyHpSuhNQn77hRI7LR-hA0ekNSc6vd6LemkLqjn7-u2yJc2Hm18yA16n6RSDl-5wM2iUuwbA2IOSSOQmqGsCrr74uk41W4wTJ4lzs4efCyAHYTS_QGsYUwmD5RpTw6P-rU6RElp5MDsIjhce0DfiHRDXdafsw-18VBIsc8qFTubS7gGfJ_TyzofY7xAqBBQ14G3UPyV6dbgtw3s5l2cSo',
            category: 'Disponible',
            domain: 'consultoria.eirl.pe'
        },
        {
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbIf5O7_d47v0YkykE5n41weihXPbL-wdLAIpyCT4Keaf0NwFalw4_7Ie7IyiZ3kO2N4r2Cto7h_WuG6J3XAoOfzeoL_Wm6M3FhCtet9M4ni7uzxE7uEHf2bOc8QsgQLKLImu1fON-pl_KJZFqyDca4x06apStPfPxOt0OU_2K7XXSsBOVXjVc0nXYFDWhqBRiOITvK382OHq3GEGehw-CvlfykIkY0pCCC3Nqe8gC0bb8E3KrHcHbJTE-u2v1qYz28UzW5NHLGQ',
            category: 'Premium',
            domain: 'abogados.eirl.pe'
        },
        {
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz8M5xXn82i50ChE3dctr5tn_0e7-iwkVX_RZqrTVFpHhwJz4iuWj1hzPtXKxqSFowEmiCWSWE_w1mF2Yst_NYvuxElzbcg8kyYG4jb9wqWzeU5FYsjZZu2s3IlmlQeDfXVgexWSdqsHMzP4-Shg9mp5uBI_LM7VrKkkJaDUr8c3OdoTFdBcL-GjCR41MiceHfcNodtGo6A4vITu3NosA6MkgYu0Ha1ww2H5yLyhXxoWJ11iqypmwktw9AwrwIUElNBI51jSmmeY',
            category: 'Destacado',
            domain: 'arquitectura.eirl.pe'
        },
        {
            imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA3GoJ9ZnLkkBXGRSgY9G2YSG67dHkgT8e-Ky2JNSYRa9bdpRJTfSLruCW_6BphgVmSac23tDwiFdeEGGdsvJs5DwOd2GAW0lMm9W8cwveW8b5m1N95O_kDzTVLmQXhvqqwQ1_v833Pp9mOlqtQQXZJqKPrDL2CQrG0ILPMsBD26daD3YNwavT4SuJ7c-PaLmjmZplr7jGGjXJtqPaJwWtT614F7ztKe6E-BjtKnHNSPYMN5idAi17rZPPLqEbJ5m9k4_im8v0QW0',
            category: 'Disponible',
            domain: 'contadores.eirl.pe'
        }
    ];

    return (
        <section className="py-20 sm:py-24 md:py-28 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-20 bg-primary/92 backdrop-blur-[2px] transition-colors duration-500">
            <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal">Dominios Destacados</h2>
                    <a className="text-charcoal border-b border-charcoal font-bold text-sm sm:text-base tracking-widest uppercase pb-1 hover:opacity-80 transition-opacity shrink-0" href="#">
                        Ver Más Dominios
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                    {assets.map((asset, index) => (
                        <AssetCard key={index} {...asset} />
                    ))}
                </div>
            </div>
        </section>
    );
}
