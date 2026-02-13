import React from 'react';
import { RotateCcw, Home } from 'lucide-react';
import { Button } from '../ui/Button';
import { Player } from '../../types';

interface ResultScreenProps {
  players: Player[];
  normalWord: string;
  impostorWord: string;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ players, normalWord, impostorWord, onRestart, onHome }) => {
  const impostors = players.filter(p => p.isImpostor);

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in bg-black overflow-y-auto">
      <div className="flex-1 flex flex-col items-center w-full max-w-md mx-auto space-y-6 pt-4">
        
        <div className="grid grid-cols-2 gap-4 w-full">
            <div className="text-center space-y-2">
                <h2 className="text-neutral-400 text-xs uppercase tracking-widest font-bold">Palavra dos Civis</h2>
                <div className="bg-neutral-900 rounded-xl px-2 py-4 border border-neutral-700 shadow-lg">
                    <h1 className="text-xl font-black text-white break-words">
                        {normalWord}
                    </h1>
                </div>
            </div>
            <div className="text-center space-y-2">
                <h2 className="text-red-500 text-xs uppercase tracking-widest font-bold">Palavra Impostora</h2>
                <div className="bg-neutral-900 rounded-xl px-2 py-4 border border-red-600/50 shadow-lg shadow-red-900/10">
                    <h1 className="text-xl font-black text-white break-words">
                        {impostorWord}
                    </h1>
                </div>
            </div>
        </div>

        <div className="w-full space-y-4">
            <h3 className="text-center text-red-500 font-bold uppercase tracking-wider text-sm border-b border-red-900/30 pb-2 mb-2">
                Identidades Reveladas
            </h3>
            
            <div className="grid gap-3">
                {impostors.map(imp => (
                    <div key={imp.id} className="bg-red-950/20 border border-red-600/30 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/30 shrink-0">
                                !
                            </div>
                            <span className="text-lg font-bold text-white truncate">{imp.name}</span>
                        </div>
                        <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded shrink-0">IMPOSTOR</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="w-full bg-neutral-900 rounded-2xl p-4 border border-neutral-800 text-center">
            <p className="text-neutral-400 text-xs leading-relaxed">
                Neste modo, o impostor recebe uma palavra parecida, mas diferente. Ele ganha se convencer o grupo de que sua palavra é a correta!
            </p>
        </div>

      </div>

      <div className="mt-6 space-y-3">
        <Button onClick={onRestart} size="lg" fullWidth variant="primary">
          <RotateCcw /> Jogar Novamente
        </Button>
        <Button onClick={onHome} size="lg" fullWidth variant="secondary">
          <Home /> Menu Inicial
        </Button>
      </div>
    </div>
  );
};