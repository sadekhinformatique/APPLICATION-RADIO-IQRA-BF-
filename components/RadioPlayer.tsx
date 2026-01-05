
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, BookOpen, Quote, Users, Heart, ShieldCheck } from 'lucide-react';

const LOGO_URL = "https://i.postimg.cc/bvxHCLLk/2732x2732.png";

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [status, setStatus] = useState<'online' | 'fallback' | 'loading' | 'error'>('loading');
  
  const [config, setConfig] = useState({
    stationName: localStorage.getItem('stationName') || "RADIO IQRA BF",
    streamUrl: localStorage.getItem('streamUrl') || "https://stream.zeno.fm/ztmkyozjspltv.m3u",
    tagline: localStorage.getItem('tagline') || "la voix du saint coran"
  });

  const FALLBACK_PLAYLIST = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    checkStream();
    const handleStorage = () => {
      setConfig({
        stationName: localStorage.getItem('stationName') || "RADIO IQRA BF",
        streamUrl: localStorage.getItem('streamUrl') || "https://stream.zeno.fm/ztmkyozjspltv.m3u",
        tagline: localStorage.getItem('tagline') || "la voix du saint coran"
      });
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const checkStream = async () => {
    setStatus('loading');
    try {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 8000);
      await fetch(config.streamUrl, { method: 'HEAD', mode: 'no-cors', signal: controller.signal });
      setStatus('online');
    } catch (e) {
      setStatus('fallback');
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setStatus('fallback'));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  return (
    <div className="flex flex-col items-center space-y-12 animate-fadeIn pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-500 drop-shadow-sm">
          {config.stationName}
        </h1>
        <p className="text-emerald-500/80 text-xl font-medium tracking-widest uppercase">{config.tagline}</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Visual Player */}
        <div className="relative group aspect-square rounded-[3rem] overflow-hidden bg-gray-900 border border-emerald-900/30 shadow-2xl flex flex-col items-center justify-center p-8 transition-all hover:border-emerald-500/50">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden mb-8 border-4 border-emerald-500/20 shadow-xl transition-all duration-700 ${isPlaying ? 'scale-105 rotate-1' : 'scale-100 rotate-0'}`}>
            <img src={LOGO_URL} alt="RADIO IQRA" className="w-full h-full object-cover" />
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                <Play className="w-16 h-16 text-white/80" />
              </div>
            )}
          </div>

          <div className="text-center mb-8 z-10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className={`flex h-2.5 w-2.5 rounded-full ${status === 'online' && isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-gray-600'}`}></span>
              <span className={`text-xs font-bold uppercase tracking-[0.2em] ${status === 'online' ? 'text-emerald-500' : 'text-amber-500'}`}>
                {status === 'online' ? 'Radio en Direct' : 'Mode Secours'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Qualité Audio Digitale</h2>
          </div>

          <div className="flex flex-col items-center w-full space-y-8 z-10">
            <button
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-900/40 transition-all active:scale-95 group/btn"
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 ml-1 text-white fill-white" />}
            </button>

            <div className="flex items-center space-x-4 w-full max-w-xs px-4">
              <button onClick={() => setIsMuted(!isMuted)} className="text-emerald-500 hover:text-emerald-400">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0" max="1" step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-grow h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <audio
            ref={audioRef}
            src={status === 'online' ? config.streamUrl : FALLBACK_PLAYLIST[0]}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted={isMuted}
          />
        </div>

        <div className="space-y-6">
          <div className="p-8 bg-emerald-900/10 border border-emerald-900/20 rounded-[2.5rem] relative shadow-lg">
            <Quote className="absolute -top-4 -left-4 w-10 h-10 text-emerald-800 opacity-30" />
            <h3 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6" /> À propos de IQRA TV
            </h3>
            <div className="space-y-5 text-gray-300 leading-relaxed text-sm md:text-base">
              <p className="font-bold text-white text-lg border-l-4 border-amber-500 pl-4">
                RADIO IQRA TV – La Voix de saint coran
              </p>
              <p>
                Basée au cœur du <strong>Burkina Faso</strong>, RADIO IQRA TV est une station islamique dédiée à la diffusion des enseignements authentiques de l'Islam, dans un esprit de paix, de fraternité et d'éducation spirituelle.
              </p>
              <p>
                Fidèle à sa mission, notre radio-télévision tire son nom de l'impératif divin <strong>"Iqra" (Lis)</strong>, qui rappelle l'importance de la connaissance dans l'épanouissement de la foi et de la société.
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-[2.5rem] space-y-6">
            <h4 className="font-black text-white uppercase tracking-wider text-sm">Nos Programmes Clés</h4>
            <div className="grid grid-cols-1 gap-4">
              <ProgramItem 
                icon={<BookOpen className="w-5 h-5" />} 
                title="L'éducation religieuse" 
                desc="Tafsir du Coran, Hadiths, et cours sur les piliers de l’Islam." 
              />
              <ProgramItem 
                icon={<Users className="w-5 h-5" />} 
                title="Programmes culturels" 
                desc="Partage de la diversité culturelle musulmane du Burkina Faso et d'ailleurs." 
              />
              <ProgramItem 
                icon={<Heart className="w-5 h-5" />} 
                title="Soutien communautaire" 
                desc="Informations locales, conseils sociaux, et initiatives caritatives." 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Icons - Settings remplacé par Protection/Auth */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
        <FeatureCard icon={<BookOpen />} title="Tafsir" desc="Exégèse Coranique" />
        <FeatureCard icon={<Quote />} title="Hadiths" desc="Sagesse Prophétique" />
        <FeatureCard icon={<Music />} title="Nasheeds" desc="Poésie Spirituelle" />
        <FeatureCard icon={<ShieldCheck />} title="Fiable" desc="Source Authentique" />
      </div>
    </div>
  );
};

const ProgramItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-emerald-900/10 transition-colors border border-transparent hover:border-emerald-500/20">
    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500 shrink-0">
      {icon}
    </div>
    <div>
      <h5 className="font-bold text-white text-sm">{title}</h5>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="p-6 bg-gray-900 border border-gray-800 rounded-3xl flex flex-col items-center text-center space-y-3 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
    <div className="text-emerald-500 bg-emerald-500/10 p-4 rounded-full">{icon}</div>
    <div>
      <h5 className="font-bold text-white text-sm">{title}</h5>
      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);

export default RadioPlayer;
