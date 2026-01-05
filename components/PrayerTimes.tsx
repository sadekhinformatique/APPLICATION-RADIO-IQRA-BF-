
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Sun, Moon, CloudSun, Clock, AlertTriangle } from 'lucide-react';
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
      setError("La géolocalisation n'est pas supportée.");
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
        // Default to Ouagadougou, Burkina Faso if location fails
        const bfLat = 12.3714;
        const bfLon = -1.5197;
        setAddress("Ouagadougou (Défaut)");
        fetchTimes(bfLat, bfLon);
      }
    );
  };

  const fetchTimes = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lon}&method=3`);
      const data = await response.json();
      
      if (data.code === 200) {
        setTimes(data.data.timings);
        if (address === "Localisation en cours...") {
          setAddress(`${data.data.meta.timezone}`);
        }
      } else {
        setError("Impossible de récupérer les horaires.");
      }
    } catch (e) {
      setError("Erreur de connexion à l'API.");
    } finally {
      setLoading(false);
    }
  };

  const getTimeIcon = (key: string) => {
    switch (key) {
      case 'Fajr': return <Moon className="w-5 h-5 text-emerald-400" />;
      case 'Sunrise': return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Dhuhr': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Asr': return <CloudSun className="w-5 h-5 text-emerald-500" />;
      case 'Maghrib': return <Moon className="w-5 h-5 text-red-400" />;
      case 'Isha': return <Moon className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
        <p className="text-emerald-500 font-bold tracking-widest animate-pulse">PRÉPARATION DES HORAIRES...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-20">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6">Horaires de Prière</h1>
        <div className="inline-flex items-center space-x-3 px-6 py-3 bg-emerald-900/20 rounded-full border border-emerald-900/30 text-emerald-400">
          <MapPin className="w-5 h-5" />
          <span className="font-bold tracking-wide">{address}</span>
        </div>
      </header>

      {times && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(times)
            .filter(([key]) => ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].includes(key))
            .map(([key, value]) => (
              <div key={key} className="p-8 bg-gray-900 border border-gray-800 rounded-3xl hover:border-emerald-500/50 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   {getTimeIcon(key)}
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-800 rounded-2xl group-hover:bg-emerald-900/30 transition-colors">
                    {getTimeIcon(key)}
                  </div>
                  <h3 className="text-gray-500 text-sm uppercase tracking-[0.2em] font-black">{key}</h3>
                </div>
                <p className="text-4xl font-black text-white">{value}</p>
              </div>
            ))}
        </div>
      )}

      <div className="mt-16 p-10 bg-emerald-900/5 border border-emerald-900/20 rounded-[2.5rem] flex items-start space-x-6">
        <div className="hidden sm:block p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
          <Clock className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-bold text-emerald-500 text-lg mb-2 uppercase tracking-wide">Note Spirituelle</h4>
          <p className="text-gray-400 leading-relaxed italic">
            "Certes, la Salat demeure, pour les croyants, une prescription à des temps déterminés." (Coran, 4:103). 
            Ces horaires sont fournis à titre indicatif selon votre position géographique au Burkina Faso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesComponent;
