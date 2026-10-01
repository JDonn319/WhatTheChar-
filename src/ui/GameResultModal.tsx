import React from 'react';
import { Trophy, Skull, RotateCcw, Home } from 'lucide-react';
import { Character } from '../data/characters';

interface GameResultModalProps {
  isVictory: boolean;
  reason: string;
  playerChar: Character | null;
  opponentChar: Character | null;
  onRematch: () => void;
  onHome: () => void;
}

export const GameResultModal: React.FC<GameResultModalProps> = ({
  isVictory,
  reason,
  playerChar,
  opponentChar,
  onRematch,
  onHome
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-5 select-none animate-in fade-in duration-300">
      <div className={`w-full max-w-sm border p-6 flex flex-col items-center text-center gap-4 shadow-2xl ${
        isVictory ? 'border-emerald-500 bg-emerald-950/20' : 'border-red-600 bg-red-950/20'
      }`}>
        
        {/* Иконка статуса */}
        <div className={`w-16 h-16 border flex items-center justify-center ${
          isVictory ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' : 'border-red-500 text-red-500 bg-red-500/10'
        }`}>
          {isVictory ? <Trophy size={32} /> : <Skull size={32} />}
        </div>

        {/* Заголовок */}
        <div>
          <h2 className={`text-2xl font-black uppercase tracking-wider ${
            isVictory ? 'text-emerald-400' : 'text-red-500'
          }`}>
            {isVictory ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ'}
          </h2>
          <p className="text-xs text-neutral-300 mt-1">{reason}</p>
        </div>

        {/* Раскрытие персонажей */}
        <div className="grid grid-cols-2 gap-3 w-full my-2">
          {playerChar && (
            <div className="flex flex-col items-center p-2 border border-white/10 bg-white/5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Твой выбор:</span>
              <img src={playerChar.avatar} alt={playerChar.name} className="w-16 h-16 object-cover border border-white/20" />
              <span className="text-[10px] font-bold mt-1.5 truncate max-w-full text-white">{playerChar.name}</span>
            </div>
          )}

          {opponentChar && (
            <div className="flex flex-col items-center p-2 border border-white/10 bg-white/5">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold mb-1.5">Выбор ИИ:</span>
              <img src={opponentChar.avatar} alt={opponentChar.name} className="w-16 h-16 object-cover border border-white/20" />
              <span className="text-[10px] font-bold mt-1.5 truncate max-w-full text-white">{opponentChar.name}</span>
            </div>
          )}
        </div>

        {/* Кнопки */}
        <div className="flex flex-col gap-2 w-full pt-1">
          <button
            onClick={onRematch}
            className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300 flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} />
            Сыграть снова
          </button>
          <button
            onClick={onHome}
            className="w-full py-3.5 bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider active:bg-white/20 flex items-center justify-center gap-2"
          >
            <Home size={14} />
            В главное меню
          </button>
        </div>

      </div>
    </div>
  );
};
