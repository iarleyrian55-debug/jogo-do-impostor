import React, { useState, useEffect } from 'react';
import { Users, UserX, Tag, Play, Edit3 } from 'lucide-react';
import { Button } from '../ui/Button';
import { CATEGORIES, Category } from '../../types';

interface SetupScreenProps {
  playerCount: number;
  setPlayerCount: (n: number) => void;
  impostorCount: number;
  setImpostorCount: (n: number) => void;
  category: Category;
  setCategory: (c: Category) => void;
  customNames: string[];
  setCustomNames: (names: string[]) => void;
  onStart: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  playerCount,
  setPlayerCount,
  impostorCount,
  setImpostorCount,
  category,
  setCategory,
  customNames,
  setCustomNames,
  onStart
}) => {
  const [showNameEdit, setShowNameEdit] = useState(false);

  // Sync custom names array size with player count
  useEffect(() => {
    if (customNames.length !== playerCount) {
      const newNames = Array.from({ length: playerCount }, (_, i) => {
        return customNames[i] || `Jogador ${i + 1}`;
      });
      setCustomNames(newNames);
    }
  }, [playerCount, customNames, setCustomNames]);

  const handleNameChange = (index: number, val: string) => {
    const newNames = [...customNames];
    newNames[index] = val;
    setCustomNames(newNames);
  };

  const incrementPlayers = () => setPlayerCount(Math.min(20, playerCount + 1));
  const decrementPlayers = () => {
    const newCount = Math.max(3, playerCount - 1);
    setPlayerCount(newCount);
    if (impostorCount >= newCount) setImpostorCount(Math.max(1, Math.ceil(newCount / 2) - 1));
  };

  const incrementImpostors = () => setImpostorCount(Math.min(playerCount - 1, impostorCount + 1));
  const decrementImpostors = () => setImpostorCount(Math.max(1, impostorCount - 1));

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-6 animate-fade-in space-y-6 overflow-y-auto bg-black">
      <header className="text-center space-y-2 mt-2">
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white drop-shadow-sm">
          IMPOSTOR
        </h1>
        <div className="h-1 w-24 bg-red-600 mx-auto rounded-full"></div>
      </header>

      <div className="flex-1 space-y-4">
        {/* Player Count */}
        <div className="bg-neutral-900 p-4 rounded-3xl border border-neutral-800 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between mb-3 text-neutral-400">
            <div className="flex items-center gap-2">
               <Users size={18} className="text-white" />
               <span className="font-bold uppercase tracking-wider text-xs">Jogadores</span>
            </div>
            <button 
                onClick={() => setShowNameEdit(!showNameEdit)}
                className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 font-bold transition-colors"
            >
                <Edit3 size={12} /> {showNameEdit ? 'Ocultar Nomes' : 'Editar Nomes'}
            </button>
          </div>
          
          <div className="flex items-center justify-between bg-black rounded-2xl p-2 border border-neutral-800 mb-2">
            <button onClick={decrementPlayers} className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 font-bold text-xl border border-neutral-700">-</button>
            <span className="text-2xl font-black text-white w-12 text-center">{playerCount}</span>
            <button onClick={incrementPlayers} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-500 font-bold text-xl shadow-lg shadow-red-900/50">+</button>
          </div>

          {showNameEdit && (
            <div className="grid grid-cols-2 gap-2 mt-3 animate-in fade-in slide-in-from-top-2">
                {customNames.map((name, idx) => (
                    <input 
                        key={idx}
                        value={name}
                        onChange={(e) => handleNameChange(idx, e.target.value)}
                        className="bg-black border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none w-full transition-colors placeholder-neutral-600"
                        placeholder={`Jogador ${idx + 1}`}
                    />
                ))}
            </div>
          )}
        </div>

        {/* Impostor Count */}
        <div className="bg-neutral-900 p-4 rounded-3xl border border-neutral-800 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-3 text-neutral-400">
            <UserX size={18} className="text-red-500" />
            <span className="font-bold uppercase tracking-wider text-xs">Impostores</span>
          </div>
          <div className="flex items-center justify-between bg-black rounded-2xl p-2 border border-neutral-800">
            <button onClick={decrementImpostors} className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 font-bold text-xl border border-neutral-700">-</button>
            <span className="text-2xl font-black text-red-500 w-12 text-center">{impostorCount}</span>
            <button onClick={incrementImpostors} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-600 text-white hover:bg-red-500 font-bold text-xl shadow-lg shadow-red-900/50">+</button>
          </div>
        </div>

        {/* Category Selection */}
        <div className="bg-neutral-900 p-4 rounded-3xl border border-neutral-800 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-2 mb-3 text-neutral-400">
            <Tag size={18} className="text-white" />
            <span className="font-bold uppercase tracking-wider text-xs">Tema</span>
          </div>
          <div className="grid grid-cols-2 gap-2 h-32 overflow-y-auto pr-1 custom-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  category === cat
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/30 border border-red-500'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 border border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onStart} size="xl" fullWidth className="mt-2 mb-2">
        <Play fill="currentColor" /> Iniciar Jogo
      </Button>
    </div>
  );
};