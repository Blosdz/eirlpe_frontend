import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import CuratedAssetsSection from '../components/CuratedAssetsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <HeroSection />
                <ServicesSection />
                <CuratedAssetsSection />
                <FAQSection />
            </main>
            <Footer />
        </>
    );
}
