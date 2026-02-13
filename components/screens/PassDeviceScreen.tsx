import React from 'react';
import { Smartphone, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PassDeviceScreenProps {
  playerName: string;
  onReady: () => void;
}

export const PassDeviceScreen: React.FC<PassDeviceScreenProps> = ({ playerName, onReady }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8 animate-fade-in bg-black">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative bg-neutral-900 p-8 rounded-full border-4 border-neutral-800 shadow-2xl">
            <Smartphone size={64} className="text-red-500 animate-bounce" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-500 mb-2">Passe o celular para</h2>
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-8 break-words w-full">
          {playerName}
        </h1>

        <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 w-full mb-8">
          <p className="text-sm text-neutral-400">
            Quando você estiver com o celular na mão, e ninguém mais estiver olhando, toque no botão abaixo.
          </p>
        </div>
      </div>

      <Button onClick={onReady} size="xl" fullWidth className="max-w-xs mb-8" variant="primary">
        Eu sou {playerName} <ChevronRight />
      </Button>
    </div>
  );
};