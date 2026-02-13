import React from 'react';
import { User, UserX, Ghost } from 'lucide-react';

export const ChaseBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
      <style>
        {`
          @keyframes runRight {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(120vw); }
          }
          @keyframes runLeft {
            0% { transform: translateX(120vw) scaleX(-1); }
            100% { transform: translateX(-100px) scaleX(-1); }
          }
          .lane-1 { top: 15%; animation: runRight 15s linear infinite; }
          .lane-2 { top: 45%; animation: runLeft 20s linear infinite; animation-delay: -5s; }
          .lane-3 { top: 80%; animation: runRight 18s linear infinite; animation-delay: -10s; }
        `}
      </style>

      {/* Lane 1 */}
      <div className="absolute lane-1 flex items-center gap-12 opacity-30">
        <div className="flex gap-4">
            {/* Civilians are Neutral Grey */}
            <User size={32} className="text-neutral-600 animate-bounce" style={{ animationDuration: '1s' }} />
            <User size={32} className="text-neutral-600 animate-bounce" style={{ animationDuration: '1.2s' }} />
            <User size={32} className="text-neutral-600 animate-bounce" style={{ animationDuration: '0.9s' }} />
        </div>
        {/* Impostor is Red */}
        <Ghost size={36} className="text-red-600 animate-pulse drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
      </div>

      {/* Lane 2 */}
      <div className="absolute lane-2 flex items-center gap-16 opacity-20">
        <div className="flex gap-4">
            <User size={24} className="text-neutral-500 animate-bounce" style={{ animationDuration: '1.1s' }} />
            <User size={24} className="text-neutral-500 animate-bounce" style={{ animationDuration: '1.3s' }} />
        </div>
        <UserX size={28} className="text-red-700 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]" />
      </div>

      {/* Lane 3 */}
      <div className="absolute lane-3 flex items-center gap-8 opacity-25">
        <div className="flex gap-4">
            <User size={40} className="text-neutral-700 animate-bounce" style={{ animationDuration: '0.8s' }} />
            <User size={40} className="text-neutral-700 animate-bounce" style={{ animationDuration: '1s' }} />
            <User size={40} className="text-neutral-700 animate-bounce" style={{ animationDuration: '1.1s' }} />
            <User size={40} className="text-neutral-700 animate-bounce" style={{ animationDuration: '0.9s' }} />
        </div>
        <Ghost size={44} className="text-red-500 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.9)]" />
      </div>
    </div>
  );
};