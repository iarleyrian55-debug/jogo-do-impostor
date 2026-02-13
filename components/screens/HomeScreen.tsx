import React from 'react';
import { Play, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChaseBackground } from '../ui/ChaseBackground';

interface HomeScreenProps {
  onStart: () => void;
  onSettings: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, onSettings }) => {
  return (
    <div className="relative flex flex-col h-full items-center justify-center p-6 overflow-hidden bg-black">
      <ChaseBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm space-y-12 z-10">
        
        {/* Title Section */}
        <div className="text-center space-y-4 animate-in slide-in-from-top duration-700">
          <div className="inline-block bg-neutral-900/90 backdrop-blur-md p-8 rounded-3xl border-2 border-red-600/50 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
             <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-white to-red-600 drop-shadow-sm leading-tight tracking-tighter">
               JOGO DO<br/>IMPOSTOR
             </h1>
          </div>
          <p className="text-red-500 font-bold tracking-[0.3em] uppercase text-xs bg-black/80 inline-block px-4 py-2 rounded-full border border-red-900/50 shadow-lg">
            Modo Espião
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-4 animate-in slide-in-from-bottom duration-700 delay-200">
          <Button onClick={onStart} size="xl" fullWidth className="h-20 text-2xl shadow-red-900/40 border-b-4 border-red-800 active:border-b-0 active:translate-y-1">
            <Play fill="currentColor" size={32} /> JOGAR
          </Button>

          <Button onClick={onSettings} variant="secondary" size="lg" fullWidth className="border-b-4 border-neutral-950 active:border-b-0 active:translate-y-1">
            <Settings size={24} /> CONFIGURAÇÕES
          </Button>
        </div>
        
      </div>

      <div className="mt-8 text-neutral-600 text-xs text-center font-medium">
        Jogo Local • Offline • Multijogador
      </div>
    </div>
  );
};