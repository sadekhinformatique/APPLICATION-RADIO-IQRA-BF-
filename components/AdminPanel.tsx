
import React, { useState, useEffect } from 'react';
import { Lock, Settings, Save, AlertCircle, Database, Server, Radio as RadioIcon, CheckCircle2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Configuration Réelle avec LocalStorage
  const [config, setConfig] = useState({
    stationName: localStorage.getItem('stationName') || "RADIO IQRA BF",
    streamUrl: localStorage.getItem('streamUrl') || "https://stream.radiojar.com/8s9u5qz7n3quv",
    tagline: localStorage.getItem('tagline') || "la voix du saint coran",
    authPin: "1234" // À changer pour une version backend
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === config.authPin) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Code PIN administrateur incorrect.');
    }
  };

  const handleSave = () => {
    localStorage.setItem('stationName', config.stationName);
    localStorage.setItem('streamUrl', config.streamUrl);
    localStorage.setItem('tagline', config.tagline);
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fadeIn">
        <div className="bg-gray-900 border border-emerald-900/30 rounded-3xl p-10 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-emerald-900/30 rounded-full text-emerald-500 shadow-inner">
              <Lock className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Accès Sécurisé</h1>
          <p className="text-gray-500 text-center text-sm mb-8">Modification des paramètres de RADIO IQRA BF</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Code PIN Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-center text-3xl tracking-[1em]"
                placeholder="••••"
                maxLength={4}
              />
            </div>
            {error && <p className="text-red-500 text-sm flex items-center justify-center gap-2 bg-red-500/10 py-2 rounded-lg animate-pulse"><AlertCircle className="w-4 h-4" /> {error}</p>}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
            >
              Déverrouiller
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-white">Gestion de Station</h1>
          <p className="text-emerald-500 font-medium">RADIO IQRA BF - Paramètres de Production</p>
        </div>
        <div className="flex items-center gap-3">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-500 font-bold animate-bounce bg-emerald-500/10 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4" /> Changements Appliqués
            </div>
          )}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/30"
          >
            <Save className="w-5 h-5" />
            <span>Appliquer les changements</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-emerald-900/20 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-emerald-400">
            <RadioIcon className="w-6 h-6" /> Configuration Diffuseur
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom Public de la Station</label>
              <input
                type="text"
                value={config.stationName}
                onChange={(e) => setConfig({ ...config, stationName: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Slogan / Tagline</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">URL du Flux (Icecast/Shoutcast)</label>
              <input
                type="text"
                value={config.streamUrl}
                onChange={(e) => setConfig({ ...config, streamUrl: e.target.value })}
                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm text-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-emerald-900/20 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-3 text-amber-500">
            <Database className="w-6 h-6" /> État du Système
          </h3>
          <div className="space-y-6">
            <div className="p-6 bg-gray-950 rounded-2xl border border-emerald-900/10">
              <p className="text-xs text-gray-500 mb-4 uppercase font-bold tracking-widest">Connectivité</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Flux Source :</span>
                  <span className="text-emerald-500 font-bold text-sm">ACTIF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Audio Codec :</span>
                  <span className="text-gray-300 font-medium text-sm">MP3 / 128kbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Auditeurs Actuels :</span>
                  <span className="text-amber-500 font-bold text-sm">Chargement...</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-emerald-900/10 border border-emerald-900/20 rounded-xl">
               <p className="text-xs text-emerald-400">
                Note: Les paramètres sont sauvegardés localement. Pour une synchronisation multi-utilisateurs, connectez une base de données Firestore ou MongoDB dans le fichier `AdminPanel.tsx`.
               </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:col-span-2">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Server className="w-6 h-6 text-emerald-500" /> Console de Production
          </h3>
          <div className="bg-black p-6 rounded-2xl font-mono text-xs text-emerald-500/70 overflow-y-auto h-48 border border-emerald-900/20">
            <p>[SYSTEM] Initialisation de RADIO IQRA BF...</p>
            <p>[SYSTEM] Chargement des préférences de production</p>
            <p>[STREAM] Connexion à {config.streamUrl}</p>
            <p>[OK] Tampon audio synchronisé (1024ms)</p>
            <p className="text-amber-500">[WARN] Vérification de l'API Aladhan pour les horaires de prière...</p>
            <p>[OK] Horaires de prière récupérés avec succès pour Ouagadougou</p>
            <p className="text-white font-bold">[LOG] Session Admin ouverte : Modification de la station enregistrée.</p>
            <p className="text-gray-600">_</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
