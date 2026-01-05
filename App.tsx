
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Radio, Clock, Menu, X, Info, Heart } from 'lucide-react';
import RadioPlayer from './components/RadioPlayer';
import PrayerTimesComponent from './components/PrayerTimes';
import AdminPanel from './components/AdminPanel';
import DeploymentGuide from './components/DeploymentGuide';

const LOGO_URL = "https://i.postimg.cc/bvxHCLLk/2732x2732.png";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
        {/* Navigation Publique */}
        <nav className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-emerald-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3 text-emerald-500 font-bold text-xl uppercase tracking-tighter">
                  <div className="w-10 h-10 overflow-hidden rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <img src={LOGO_URL} alt="Logo IQRA" className="w-full h-full object-cover" />
                  </div>
                  <span className="hidden sm:inline">Radio Iqra <span className="text-amber-500">BF</span></span>
                </Link>
              </div>

              {/* Desktop Menu - Configuration retirée */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" icon={<Radio className="w-4 h-4" />} label="Direct" />
                  <NavLink to="/priere" icon={<Clock className="w-4 h-4" />} label="Horaires" />
                  <NavLink to="/deployment" icon={<Info className="w-4 h-4" />} label="Aide" />
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu - Configuration retirée */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 border-b border-emerald-900/30 px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" label="Radio en Direct" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/priere" label="Horaires de Prière" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/deployment" label="Mise en ligne" onClick={() => setIsMenuOpen(false)} />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<RadioPlayer />} />
              <Route path="/priere" element={<PrayerTimesComponent />} />
              {/* LIEN SPÉCIAL ADMIN : À garder secret */}
              <Route path="/portal-iqra-secret" element={<AdminPanel />} />
              <Route path="/deployment" element={<DeploymentGuide />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-emerald-900/20 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-emerald-500 font-bold mb-2">RADIO IQRA BF</p>
            <p className="text-gray-500 text-sm mb-4">La voix qui nourrit l'âme au cœur du Burkina Faso.</p>
            <div className="flex justify-center items-center space-x-1 text-gray-600 text-xs">
              <span>Fait avec</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>pour la Oummah</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
        isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-400'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const MobileNavLink: React.FC<{ to: string; label: string; onClick: () => void }> = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-emerald-900/20 hover:text-emerald-400'
      }`}
    >
      {label}
    </Link>
  );
};

export default App;
