
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
            Si vous voyez un écran noir, assurez-vous que votre fichier <code className="bg-gray-800 px-1">index.html</code> contient bien la balise <code className="bg-gray-800 px-1">&lt;script type="module" src="./index.tsx"&gt;</code> avant la fermeture du body.
          </p>
        </div>
      </div>

      {/* Infomaniak */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-emerald-600 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6" />
            <h2 className="text-xl font-bold">Infomaniak (Cloud VPS)</h2>
          </div>
          <span className="text-xs bg-emerald-500 px-2 py-1 rounded font-bold uppercase">Production BF</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Build du projet">
              Lancez <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code> localement pour générer le dossier <code className="bg-gray-800 px-2 py-1 rounded">dist</code>.
            </Step>
            <Step number={2} title="Transfert FTP">
              Connectez-vous à votre espace Infomaniak et déposez le contenu du dossier <code className="bg-gray-800 px-2 py-1 rounded">dist</code> à la racine web de votre hébergement.
            </Step>
            <Step number={3} title="Certificat SSL">
              Activez Let's Encrypt dans le manager Infomaniak pour sécuriser la connexion au flux radio.
            </Step>
          </div>
          <a href="https://www.infomaniak.com/fr/hebergement/hebergement-web" target="_blank" className="inline-flex items-center text-emerald-400 hover:underline">
            Documentation Infomaniak <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </section>

      {/* Netlify */}
      <section className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-teal-600 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileCode className="w-6 h-6" />
            <h2 className="text-xl font-bold">Netlify</h2>
          </div>
          <span className="text-xs bg-teal-500 px-2 py-1 rounded font-bold uppercase">Statique</span>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <Step number={1} title="Dépôt Git">
              Liez votre projet GitHub à Netlify.
            </Step>
            <Step number={2} title="Fichier _redirects">
              Placez un fichier nommé <code className="bg-gray-800 px-2 py-1 rounded">_redirects</code> dans <code className="bg-gray-800 px-2 py-1 rounded">public/</code> avec : <code className="bg-gray-800 px-1">/* /index.html 200</code>.
            </Step>
            <Step number={3} title="Build Settings">
              Command: <code className="bg-gray-800 px-2 py-1 rounded">npm run build</code>, Directory: <code className="bg-gray-800 px-2 py-1 rounded">dist</code>.
            </Step>
          </div>
        </div>
      </section>

      <div className="p-8 bg-green-900/10 border border-green-900/30 rounded-3xl flex items-start space-x-4">
        <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
        <div>
          <h4 className="text-lg font-bold text-green-400">Application Prête</h4>
          <p className="text-gray-400 mt-1">
            Votre station <strong>RADIO IQRA BF</strong> est maintenant configurée avec ses visuels officiels et sa description de production.
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
