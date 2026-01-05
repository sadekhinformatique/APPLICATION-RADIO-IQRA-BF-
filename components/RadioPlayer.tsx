
import React, { useState, useRef, useEffect } from 'react';
/* Added Clock and Settings to the imports to fix "Cannot find name" errors */
import { Play, Pause, Volume2, VolumeX, AlertTriangle, Music, Clock, Settings } from 'lucide-react';

const DEFAULT_STREAM = "https://stream.zeno.fm/ztmkyozjspltv.m3u"; // Example stream
const FALLBACK_PLAYLIST = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
];

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [status, setStatus] = useState<'online' | 'fallback' | 'loading' | 'error'>('loading');
  const [currentUrl, setCurrentUrl] = useState(DEFAULT_STREAM);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    checkStream();
  }, []);

  const checkStream = async () => {
    setStatus('loading');
    try {
      const response = await fetch(DEFAULT_STREAM, { method: 'HEAD', mode: 'no-cors' });
      // Since it's often a stream, no-cors HEAD might not be enough to truly verify availability
      // but in a real Node/EJS app this check would be server-side. 
      // Here we assume it's online but will switch if audio element errors.
      setStatus('online');
      setCurrentUrl(DEFAULT_STREAM);
    } catch (e) {
      switchToFallback();
    }
  };

  const switchToFallback = () => {
    console.warn("Main stream down, switching to fallback playlist...");
    setStatus('fallback');
    const randomTrack = FALLBACK_PLAYLIST[Math.floor(Math.random() * FALLBACK_PLAYLIST.length)];
    setCurrentUrl(randomTrack);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => {
        console.error("Playback failed", e);
        switchToFallback();
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const handleAudioError = () => {
    if (status !== 'fallback') {
      switchToFallback();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
          VoxNova Live
        </h1>
        <p className="text-gray-400 text-lg">La voix qui vous accompagne partout.</p>
      </div>

      {/* Main Player Visualizer Area */}
      <div className="relative group w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 shadow-2xl flex flex-col items-center justify-center p-8 transition-transform hover:scale-[1.02]">
        <div className={`absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
        
        {/* Animated Visualizer Skeleton */}
        <div className="flex items-end space-x-1 h-24 mb-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-2 bg-indigo-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2 opacity-30'}`}
              style={{ height: isPlaying ? `${Math.random() * 100}%` : '8px', animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {status === 'online' && <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>}
            {status === 'fallback' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
            <span className={`text-sm font-bold uppercase tracking-wider ${status === 'online' ? 'text-green-500' : 'text-amber-500'}`}>
              {status === 'online' ? 'Direct' : status === 'fallback' ? 'Mode Secours' : 'Vérification...'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">{status === 'online' ? 'VoxNova Main Stream' : 'Playlist Locale'}</h2>
          <p className="text-gray-500 text-sm italic">Qualité Audio: 128kbps Stereo</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center w-full space-y-6">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 ml-1 fill-white" />}
          </button>

          <div className="flex items-center space-x-4 w-full px-4">
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-grow h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          src={currentUrl}
          onError={handleAudioError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          muted={isMuted}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
         <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center space-x-4">
            <div className="p-3 bg-indigo-900/30 rounded-full text-indigo-400">
               <Music className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-semibold">Titres récents</h3>
               <p className="text-xs text-gray-500">Liste des musiques passées</p>
            </div>
         </div>
         <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center space-x-4">
            <div className="p-3 bg-purple-900/30 rounded-full text-purple-400">
               <Clock className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-semibold">Grille Horaire</h3>
               <p className="text-xs text-gray-500">Programmes de la journée</p>
            </div>
         </div>
         <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl flex items-center space-x-4">
            <div className="p-3 bg-amber-900/30 rounded-full text-amber-400">
               <Settings className="w-6 h-6" />
            </div>
            <div>
               <h3 className="font-semibold">Support</h3>
               <p className="text-xs text-gray-500">Assistance technique 24/7</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
