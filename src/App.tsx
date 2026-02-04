import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DominiosPage from './pages/DominiosPage';
import PreciosPage from './pages/PreciosPage';
import FAQPage from './pages/FAQPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-display text-charcoal antialiased">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dominios" element={<DominiosPage />} />
          <Route path="/precios" element={<PreciosPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
