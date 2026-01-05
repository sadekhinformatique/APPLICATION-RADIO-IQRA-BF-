
import React from 'react';
import { ExternalLink, Globe, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-12 mb-20">
      <header>
        <h1 className="text-4xl font-extrabold mb-4">Guide de Mise en Ligne</h1>
        <p className="text-xl text-gray-400">Suivez ces étapes pour déployer l'application sur différentes plateformes.</p>
      </header>

      {/* Infomaniak */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-indigo-600 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6" />
            <h2 className="text-xl font-bold">Infomaniak (PaaS / Cloud VPS)</h2>
          </div>
          <span className="text-xs bg-indigo-500 px-2 py-1 rounded font-bold">RECOMMANDÉ NODE.JS</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Préparer le package">
              Lancez <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code> pour générer les fichiers statiques si vous utilisez un hébergement Web standard. Pour Node.js, préparez votre <code className="bg-gray-800 px-2 py-1 rounded">server.js</code>.
            </Step>
            <Step number={2} title="Configuration Jelastic / Cloud">
              Utilisez l'offre <strong>Jelastic Cloud</strong>. Créez un environnement "Node.js". Connectez votre repo Git ou téléversez l'archive ZIP.
            </Step>
            <Step number={3} title="Variables d'environnement">
              Configurez le port (généralement 8080/3000) et les clés API dans le tableau de bord Infomaniak.
            </Step>
          </div>
          <a href="https://www.infomaniak.com/fr/hebergement/paas-jelastic" target="_blank" className="inline-flex items-center text-indigo-400 hover:underline">
            Documentation Infomaniak Jelastic <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      {/* Render */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-purple-600 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6" />
            <h2 className="text-xl font-bold">Render.com (Auto-deploy)</h2>
          </div>
          <span className="text-xs bg-purple-500 px-2 py-1 rounded font-bold">SIMPLE & GRATUIT</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Connecter GitHub">
              Créez un compte sur Render et liez votre compte GitHub/GitLab.
            </Step>
            <Step number={2} title="New Static Site">
              Choisissez <strong>Static Site</strong> pour cette version React. 
              <ul className="list-disc list-inside mt-2 text-gray-400 ml-4 space-y-1">
                <li>Build Command: <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code></li>
                <li>Publish Directory: <code className="bg-gray-800 px-2 py-1 rounded">dist</code> (ou build)</li>
              </ul>
            </Step>
            <Step number={3} title="Headers Redirect">
              Si vous utilisez React Router (non-hash), ajoutez une règle de redirection 404 vers index.html.
            </Step>
          </div>
          <a href="https://render.com/docs/deploy-react" target="_blank" className="inline-flex items-center text-purple-400 hover:underline">
            Guide Render pour React <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      {/* Netlify */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-teal-600 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileCode className="w-6 h-6" />
            <h2 className="text-xl font-bold">Netlify (CDN Rapide)</h2>
          </div>
          <span className="text-xs bg-teal-500 px-2 py-1 rounded font-bold">DRAG & DROP</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Netlify CLI">
              Installez l'outil CLI ou utilisez l'interface Web. Faites un glisser-déposer du dossier <code className="bg-gray-800 px-2 py-1 rounded">dist</code>.
            </Step>
            <Step number={2} title="_redirects">
              Créez un fichier <code className="bg-gray-800 px-2 py-1 rounded">_redirects</code> à la racine du dossier build avec le contenu : <code className="bg-gray-800 px-1">/* /index.html 200</code>.
            </Step>
            <Step number={3} title="Configuration DNS">
              Pointez votre nom de domaine personnalisé vers les serveurs DNS de Netlify.
            </Step>
          </div>
          <a href="https://docs.netlify.com/routing/redirects/" target="_blank" className="inline-flex items-center text-teal-400 hover:underline">
            Règles de redirection Netlify <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      <div className="p-8 bg-green-900/10 border border-green-900/30 rounded-3xl flex items-start space-x-4">
        <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
        <div>
          <h4 className="text-lg font-bold text-green-400">Astuce pour le Fallback Audio</h4>
          <p className="text-gray-400 mt-1">
            Sur Infomaniak (Node.js), assurez-vous que le dossier contenant vos MP3 de secours a les bonnes permissions de lecture. Si vous utilisez Netlify/Render (Statique), placez vos fichiers MP3 dans le dossier <code className="bg-gray-800 px-1 text-gray-200">public</code> pour qu'ils soient accessibles via URL directe.
          </p>
        </div>
      </div>
    </div>
  );
};

const Step: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <div className="flex space-x-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-gray-300">
      {number}
    </div>
    <div className="flex-grow">
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <div className="text-gray-400 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  </div>
);

export default DeploymentGuide;
