import React, { useState, useEffect } from 'react';
import { Eye, CheckCircle, Lock } from 'lucide-react';
import { Button } from '../ui/Button';

interface RevealRoleScreenProps {
  word: string;
  playerName: string;
  category: string;
  onNext: () => void;
  viewingTime: number; // in seconds
}

export const RevealRoleScreen: React.FC<RevealRoleScreenProps> = ({
  word,
  playerName,
  category,
  onNext,
  viewingTime
}) => {
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(viewingTime);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    let timer: any;
    if (revealed && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (revealed && timeLeft === 0) {
      setCanClose(true);
    }
    return () => clearInterval(timer);
  }, [revealed, timeLeft]);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-black">
      <style>{`
        @keyframes revealPop {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-reveal-pop {
          animation: revealPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      
      {!revealed ? (
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs space-y-8 animate-fade-in">
          <div className="space-y-4">
             <h2 className="text-xl text-neutral-400 font-medium">{playerName}</h2>
             <p className="text-3xl font-bold text-white leading-tight">
               Toque e segure para ver sua palavra
             </p>
          </div>
          
          <button
            onMouseDown={handleReveal}
            onTouchStart={handleReveal}
            className="w-48 h-48 rounded-full bg-neutral-900 border-8 border-neutral-800 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.2)] active:scale-95 transition-all duration-200 active:border-red-600 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600/10 opacity-0 group-active:opacity-100 transition-opacity" />
            <Lock size={64} className="text-neutral-600 group-active:text-red-500 transition-colors" />
          </button>
          
          <p className="text-sm text-neutral-500">Mantenha segredo!</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs animate-reveal-pop">
          
          <div className="mb-6">
            <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              {category}
            </span>
          </div>

          <div className="bg-neutral-900 p-8 rounded-3xl border-2 border-red-600/30 w-full mb-8 shadow-[0_0_50px_rgba(220,38,38,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent"></div>
            <h2 className="text-lg font-bold text-red-500 mb-2 uppercase tracking-wide">Sua Palavra</h2>
            <h1 className="text-4xl font-black text-white drop-shadow-lg">{word}</h1>
            <p className="text-xs text-neutral-400 mt-4">Memorize e aja naturalmente.</p>
          </div>

          {!canClose ? (
             <div className="w-16 h-16 rounded-full border-4 border-neutral-800 flex items-center justify-center bg-neutral-900">
               <span className="text-2xl font-bold text-white">{timeLeft}</span>
             </div>
          ) : (
             <Button onClick={onNext} variant="success" size="xl" fullWidth className="animate-bounce">
               <CheckCircle /> Entendi
             </Button>
          )}
        </div>
      )}
    </div>
  );
};