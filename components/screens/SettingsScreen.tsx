import React from 'react';
import { Volume2, VolumeX, Smartphone, Timer, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsScreenProps {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
  vibrationEnabled: boolean;
  toggleVibration: () => void;
  viewingTime: number;
  setViewingTime: (seconds: number) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isMusicPlaying,
  toggleMusic,
  vibrationEnabled,
  toggleVibration,
  viewingTime,
  setViewingTime,
  onBack
}) => {
  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 animate-fade-in bg-black">
      
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors">
            <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
      </div>

      <div className="flex-1 space-y-6">
        
        {/* Audio Toggle */}
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${isMusicPlaying ? 'bg-red-500/20 text-red-500' : 'bg-neutral-800 text-neutral-500'}`}>
                    {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
                </div>
                <div>
                    <h3 className="font-bold text-white">Música de Fundo</h3>
                    <p className="text-xs text-neutral-500">Ativar ou desativar sons</p>
                </div>
            </div>
            <div 
                onClick={toggleMusic}
                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isMusicPlaying ? 'bg-red-600' : 'bg-neutral-700'}`}
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isMusicPlaying ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>

        {/* Vibration Toggle */}
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${vibrationEnabled ? 'bg-white/10 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                    <Smartphone size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-white">Vibração</h3>
                    <p className="text-xs text-neutral-500">Feedback tátil ao tocar</p>
                </div>
            </div>
            <div 
                onClick={toggleVibration}
                className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${vibrationEnabled ? 'bg-white/20' : 'bg-neutral-700'}`}
            >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${vibrationEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
        </div>

        {/* Timer Setting */}
        <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-red-500/20 text-red-500">
                    <Timer size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-white">Tempo de Visualização</h3>
                    <p className="text-xs text-neutral-500">Tempo para ver a palavra secreta</p>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
                {[3, 5, 10].map(seconds => (
                    <button
                        key={seconds}
                        onClick={() => setViewingTime(seconds)}
                        className={`py-3 rounded-xl font-bold transition-all ${
                            viewingTime === seconds 
                            ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                            : 'bg-black text-neutral-400 border border-neutral-800 hover:border-neutral-600'
                        }`}
                    >
                        {seconds}s
                    </button>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};