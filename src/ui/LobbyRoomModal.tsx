import React, { useState } from 'react';
import { Copy, CheckCheck, Users, Clock, Sparkles, Loader2, LogOut, Check, ShieldCheck } from 'lucide-react';

interface LobbyRoomModalProps {
  roomId: string;
  isHost: boolean;
  hostNickname: string;
  guestNickname: string | null;
  themes: string[];
  timerSeconds: number;
  isReady: boolean;
  onToggleReady: () => void;
  onLeaveRoom: () => void;
}

export const LobbyRoomModal: React.FC<LobbyRoomModalProps> = ({
  roomId,
  isHost,
  hostNickname,
  guestNickname,
  themes,
  timerSeconds,
  isReady,
  onToggleReady,
  onLeaveRoom
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOpponentIn = Boolean(guestNickname);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-5 pt-[max(env(safe-area-inset-top),20px)] pb-4 select-none animate-in fade-in duration-200">
      
      {/* Шапка */}
      <header className="flex justify-between items-center pb-3 border-b border-white/20 max-w-sm w-full mx-auto">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-white" />
          <span className="text-sm font-black uppercase tracking-wider text-white">Лобби дуэли</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
          СЕТЬ
        </span>
      </header>

      {/* Код и игроки */}
      <div className="flex-1 overflow-y-auto py-4 flex flex-col justify-center gap-5 max-w-sm w-full mx-auto">
        <div className="p-5 bg-white/5 border border-white/20 flex flex-col items-center text-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            Код комнаты для соперника:
          </span>
          <div className="text-3xl font-mono font-black tracking-widest text-white px-4 py-2 bg-black border border-white/30">
            {roomId}
          </div>
          <button
            onClick={handleCopyCode}
            className="w-full py-2.5 bg-white/10 border border-white/25 text-xs font-bold text-white flex items-center justify-center gap-1.5 active:bg-white active:text-black transition-colors"
          >
            {copied ? <CheckCheck size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Код скопирован!' : 'Скопировать код комнаты'}</span>
          </button>
        </div>

        {/* Список участников */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Участники дуэли:
          </span>

          <div className="p-3 bg-white/5 border border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs font-black text-white">{hostNickname}</span>
                <span className="text-[9px] text-neutral-400 font-mono">Хост</span>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 bg-white/10 text-white border border-white/20">
              В СЕТИ
            </span>
          </div>

          <div className={`p-3 border flex items-center justify-between transition-colors ${
            isOpponentIn ? 'bg-white/5 border-white/15' : 'bg-white/[0.02] border-dashed border-white/15'
          }`}>
            <div className="flex items-center gap-2">
              {isOpponentIn ? <Users size={16} className="text-emerald-400" /> : <Loader2 size={16} className="animate-spin text-neutral-500" />}
              <div className="flex flex-col">
                <span className={`text-xs font-black ${isOpponentIn ? 'text-white' : 'text-neutral-500'}`}>
                  {guestNickname || 'Ожидание соперника...'}
                </span>
                <span className="text-[9px] text-neutral-400 font-mono">
                  {isOpponentIn ? 'Подключен' : 'Отправьте код выше другу'}
                </span>
              </div>
            </div>
            {isOpponentIn && (
              <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ПОДКЛЮЧЕН
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-3 bg-white/5 border border-white/10 text-neutral-300">
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-neutral-400" />
            <span>Тема: {themes.join('+').toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-neutral-400" />
            <span>Ход: {timerSeconds > 0 ? `${timerSeconds}с` : 'Без лимита'}</span>
          </div>
        </div>
      </div>

      {/* Кнопка «ГОТОВ» и Выход */}
      <footer className="pt-3 border-t border-white/20 max-w-sm w-full mx-auto flex flex-col gap-2">
        <button
          onClick={onToggleReady}
          disabled={!isOpponentIn}
          className={`w-full py-4 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            !isOpponentIn 
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : isReady
              ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'bg-white text-black active:bg-neutral-300'
          }`}
        >
          <Check size={16} />
          <span>{isReady ? 'ОЖИДАНИЕ ВТОРОГО ИГРОКА...' : 'Я ГОТОВ!'}</span>
        </button>

        <button
          onClick={onLeaveRoom}
          className="w-full py-3 bg-red-950/40 border border-red-500/40 text-red-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 active:bg-red-900/40"
        >
          <LogOut size={13} />
          <span>Выйти из комнаты</span>
        </button>
      </footer>

    </div>
  );
};
