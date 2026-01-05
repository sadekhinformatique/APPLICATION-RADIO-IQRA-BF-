
import React, { useState, useEffect } from 'react';
/* Added Clock and AlertTriangle to the imports to fix "Cannot find name" errors */
import { MapPin, Loader2, Navigation, Sun, Moon, CloudSun, Clock, AlertTriangle } from 'lucide-react';
import { PrayerTimes } from '../types';

const PrayerTimesComponent: React.FC = () => {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [address, setAddress] = useState<string>("Localisation en cours...");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchTimes(latitude, longitude);
      },
      (err) => {
        setError("Veuillez autoriser l'accès à votre position pour les horaires.");
        setLoading(false);
      }
    );
  };

  const fetchTimes = async (lat: number, lon: number) => {
    try {
      const date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('-');
      const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lon}&method=2`);
      const data = await response.json();
      
      if (data.code === 200) {
        setTimes(data.data.timings);
        setAddress(`${data.data.meta.timezone}`);
      } else {
        setError("Impossible de récupérer les horaires.");
      }
    } catch (e) {
      setError("Erreur lors de la connexion à l'API Aladhan.");
    } finally {
      setLoading(false);
    }
  };

  const getTimeIcon = (key: string) => {
    switch (key) {
      case 'Fajr': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'Sunrise': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Dhuhr': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'Asr': return <CloudSun className="w-5 h-5 text-orange-400" />;
      case 'Maghrib': return <Moon className="w-5 h-5 text-red-400" />;
      case 'Isha': return <Moon className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-400">Récupération de votre position et des horaires...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-900/20 border border-red-800 rounded-2xl text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Erreur</h3>
        <p className="text-gray-400">{error}</p>
        <button 
          onClick={() => { setError(null); setLoading(true); fetchLocation(); }}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">Horaires de Prière</h1>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800 text-sm text-gray-400">
          <MapPin className="w-4 h-4 text-indigo-500" />
          <span>{address}</span>
        </div>
      </header>

      {times && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(times)
            .filter(([key]) => ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key))
            .map(([key, value]) => (
              <div key={key} className="p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-indigo-500 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-indigo-900/30 transition-colors">
                    {getTimeIcon(key)}
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider font-semibold">{key}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-400 transition-colors">Prochainement</span>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-indigo-900/10 border border-indigo-900/30 rounded-2xl">
        <h4 className="font-bold text-indigo-400 mb-2">Méthode de Calcul</h4>
        <p className="text-sm text-gray-400 leading-relaxed">
          Les horaires sont calculés dynamiquement en utilisant l'API Aladhan selon la méthode de l'Union Islamique de l'Amérique du Nord (ISNA) par défaut, ajustée selon votre position GPS précise.
        </p>
      </div>
    </div>
  );
};

export default PrayerTimesComponent;
