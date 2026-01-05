
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Radio, Clock, Settings, BookOpen, Menu, X, Info } from 'lucide-react';
import RadioPlayer from './components/RadioPlayer';
import PrayerTimesComponent from './components/PrayerTimes';
import AdminPanel from './components/AdminPanel';
import DeploymentGuide from './components/DeploymentGuide';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2 text-indigo-400 font-bold text-xl">
                  <Radio className="w-8 h-8" />
                  <span>VoxNova</span>
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" icon={<Radio className="w-4 h-4" />} label="Live Radio" />
                  <NavLink to="/priere" icon={<Clock className="w-4 h-4" />} label="Horaires" />
                  <NavLink to="/admin" icon={<Settings className="w-4 h-4" />} label="Admin" />
                  <NavLink to="/deployment" icon={<Info className="w-4 h-4" />} label="Déploiement" />
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 border-b border-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" label="Live Radio" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/priere" label="Horaires de Prière" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/admin" label="Gestion Station" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/deployment" label="Guide Déploiement" onClick={() => setIsMenuOpen(false)} />
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<RadioPlayer />} />
              <Route path="/priere" element={<PrayerTimesComponent />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/deployment" element={<DeploymentGuide />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} radio iqra . Tous droits réservés.</p>
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
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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
        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
};

export default App;
