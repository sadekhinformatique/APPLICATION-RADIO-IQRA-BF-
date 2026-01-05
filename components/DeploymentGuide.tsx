
import React from 'react';
import { ExternalLink, Globe, Terminal, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

const DeploymentGuide: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn space-y-12 mb-20">
      <header>
        <h1 className="text-4xl font-extrabold mb-4">Guide de Mise en Ligne</h1>
        <p className="text-xl text-gray-400">Suivez ces étapes pour déployer l'application sur différentes plateformes.</p>
      </header>

      <div className="p-6 bg-amber-900/20 border border-amber-800 rounded-2xl flex items-start space-x-4">
        <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />
        <div>
          <h4 className="text-lg font-bold text-amber-400">Solution : Écran Noir sur Netlify</h4>
          <p className="text-gray-400 mt-1">
            Si vous voyez un écran noir, assurez-vous que votre fichier <code className="bg-gray-800 px-1">index.html</code> contient bien la balise <code className="bg-gray-800 px-1">&lt;script type="module" src="./index.tsx"&gt;</code> avant la fermeture du body. Netlify a besoin de ce point d'entrée explicite pour charger l'application React.
          </p>
        </div>
      </div>

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
              Lancez <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code>. Pour un serveur Node.js complet, incluez un fichier <code className="bg-gray-800 px-2 py-1 rounded">server.js</code> utilisant Express et EJS si vous préférez le rendu serveur.
            </Step>
            <Step number={2} title="Configuration Jelastic / Cloud">
              Utilisez l'offre <strong>Jelastic Cloud</strong>. Créez un environnement "Node.js". Connectez votre repo Git ou téléversez l'archive ZIP contenant le build.
            </Step>
            <Step number={3} title="Variables d'environnement">
              Configurez le port (généralement 8080) dans le tableau de bord Infomaniak pour qu'il corresponde à votre config serveur.
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
            <h2 className="text-xl font-bold">Render.com (Web Service)</h2>
          </div>
          <span className="text-xs bg-purple-500 px-2 py-1 rounded font-bold">SIMPLE & GRATUIT</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Connecter GitHub">
              Créez un compte sur Render et liez votre repo.
            </Step>
            <Step number={2} title="New Static Site">
              Pour cette version React, choisissez <strong>Static Site</strong>. 
              <ul className="list-disc list-inside mt-2 text-gray-400 ml-4 space-y-1">
                <li>Build Command: <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code></li>
                <li>Publish Directory: <code className="bg-gray-800 px-2 py-1 rounded">dist</code></li>
              </ul>
            </Step>
            <Step number={3} title="Redirections">
              Dans l'onglet "Redirects", ajoutez une règle : <code className="bg-gray-800 px-1">/* -> /index.html (200)</code>.
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
              Utilisez l'interface Web pour glisser-déposer votre dossier de build (<code className="bg-gray-800 px-2 py-1 rounded">dist</code> ou <code className="bg-gray-800 px-2 py-1 rounded">build</code>).
            </Step>
            <Step number={2} title="Fichier _redirects">
              Placez un fichier nommé <code className="bg-gray-800 px-2 py-1 rounded">_redirects</code> à la racine de votre dossier de déploiement avec le contenu : <code className="bg-gray-800 px-1">/* /index.html 200</code>. Cela évite l'écran blanc au rafraîchissement.
            </Step>
            <Step number={3} title="Configuration DNS">
              Pointez votre domaine. Netlify gère automatiquement le certificat SSL (HTTPS).
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
          <h4 className="text-lg font-bold text-green-400">Succès du déploiement</h4>
          <p className="text-gray-400 mt-1">
            Une fois ces fichiers configurés, votre radio VoxNova sera accessible partout avec une gestion fluide des routes et du lecteur audio.
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
