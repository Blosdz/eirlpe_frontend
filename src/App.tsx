import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CuratedAssetsSection from './components/CuratedAssetsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-charcoal antialiased">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CuratedAssetsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
