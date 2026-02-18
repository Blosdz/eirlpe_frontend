import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import FullPageParallaxBackground from './components/FullPageParallaxBackground';
import HomePage from './pages/HomePage';
import DominiosPage from './pages/DominiosPage';
import PreciosPage from './pages/PreciosPage';
import FAQPage from './pages/FAQPage';
import TemplateSelectorPage from './pages/TemplateSelectorPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

function App() {
  return (
    <ParallaxProvider>
      <Router>
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-charcoal antialiased transition-colors duration-500 ease-in-out">
          <FullPageParallaxBackground />
          <div className="relative z-10 flex min-h-screen w-full flex-col bg-transparent transition-colors duration-500 ease-in-out">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dominios" element={<DominiosPage />} />
              <Route path="/precios" element={<PreciosPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/templates/:domain" element={<TemplateSelectorPage />} />
              <Route path="/registro/:domain/:template" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ParallaxProvider>
  );
}

export default App;
