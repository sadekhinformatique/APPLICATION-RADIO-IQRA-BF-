
import React, { useState } from 'react';
import { Lock, Settings, Save, AlertCircle, Database, Server, Radio as RadioIcon } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Configuration Mock
  const [config, setConfig] = useState({
    stationName: "VoxNova Radio",
    streamUrl: "https://stream.radiojar.com/8s9u5qz7n3quv",
    fallbackFolder: "/public/fallback/mp3",
    authPin: "1234"
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === config.authPin) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe administrateur incorrect.');
    }
  };

  const handleSave = () => {
    alert("Configuration sauvegardée ! (Simulation)");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fadeIn">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-indigo-900/30 rounded-full text-indigo-500">
              <Lock className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Accès Administrateur</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Code PIN Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-center text-2xl tracking-widest"
                placeholder="••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all active:scale-95"
            >
              Se Connecter
            </button>
          </form>
          <p className="mt-6 text-xs text-gray-500 text-center">
            Par défaut, le code est <code className="text-indigo-400">1234</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Panneau de Configuration</h1>
          <p className="text-gray-400">Gérez les paramètres de diffusion et les flux de secours.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <RadioIcon className="w-5 h-5 text-indigo-500" /> Streaming Principal
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nom de la Radio</label>
              <input
                type="text"
                value={config.stationName}
                onChange={(e) => setConfig({ ...config, stationName: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">URL du Flux (Icecast/Shoutcast)</label>
              <input
                type="text"
                value={config.streamUrl}
                onChange={(e) => setConfig({ ...config, streamUrl: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" /> Flux de Secours (Auto-Fallback)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Dossier des fichiers locaux</label>
              <input
                type="text"
                value={config.fallbackFolder}
                onChange={(e) => setConfig({ ...config, fallbackFolder: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              />
            </div>
            <div className="p-4 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wider">État du Service</p>
              <div className="flex items-center justify-between">
                <span className="text-green-500 font-medium">Prêt pour basculement</span>
                <span className="text-xs text-gray-400">12 fichiers détectés</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:col-span-2">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-500" /> Logs du Serveur
          </h3>
          <div className="bg-black/50 p-4 rounded-xl font-mono text-xs text-gray-500 overflow-y-auto h-40">
            <p>[INFO] 2023-10-27 10:15:22 - Serveur Node.js démarré sur le port 3000</p>
            <p>[INFO] 2023-10-27 10:15:23 - Connexion au flux principal réussie</p>
            <p className="text-indigo-400">[WEB] 2023-10-27 11:02:45 - Accès Admin autorisé pour IP 192.168.1.1</p>
            <p>[DEBUG] 2023-10-27 11:05:01 - Ping Aladhan API: 200 OK</p>
            <p className="text-gray-400">...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
