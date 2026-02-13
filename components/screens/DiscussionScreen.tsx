import React, { useState } from 'react';
import { Eye, MessageCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface DiscussionScreenProps {
  onReveal: () => void;
  category: string;
}

export const DiscussionScreen: React.FC<DiscussionScreenProps> = ({ onReveal, category }) => {
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className="flex flex-col h-full p-6 animate-fade-in bg-black">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 text-center">
        
        <div className="bg-neutral-900 p-6 rounded-full shadow-2xl shadow-red-900/10 mb-4 border border-neutral-800">
          <MessageCircle size={48} className="text-red-500" />
        </div>

        <h1 className="text-4xl font-black text-white">Hora do Debate!</h1>
        
        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 w-full max-w-sm shadow-lg">
          <p className="text-neutral-300 leading-relaxed">
            Todos receberam suas funções. Discutam entre si, façam perguntas e tentem descobrir quem é o impostor!
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
            <button 
                onClick={() => setShowCategory(!showCategory)}
                className="w-full bg-black hover:bg-neutral-900 p-4 rounded-xl border border-neutral-700 transition-all flex flex-col items-center justify-center gap-2 group"
            >
                <span className="text-xs uppercase font-bold text-neutral-500 group-hover:text-neutral-400">Tema da Partida</span>
                {showCategory ? (
                    <span className="text-xl font-bold text-red-500 animate-in fade-in">{category}</span>
                ) : (
                    <span className="text-sm font-medium text-neutral-400 flex items-center gap-2">
                        <Eye size={16} /> Toque para lembrar o tema
                    </span>
                )}
            </button>
        </div>

        <div className="flex items-center gap-2 text-orange-500 bg-orange-950/20 px-4 py-2 rounded-lg border border-orange-900/30">
            <AlertTriangle size={18} />
            <span className="text-sm font-medium">Cuidado com o que fala!</span>
        </div>

      </div>

      <div className="mt-6">
        <Button onClick={onReveal} variant="danger" size="xl" fullWidth>
          Revelar Impostor(es)
        </Button>
      </div>
    </div>
  );
};