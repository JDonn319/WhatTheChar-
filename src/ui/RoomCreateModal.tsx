import React, { useState } from 'react';
import { X, Users, Lock, Clock, Sparkles, LogIn, Plus, AlertCircle } from 'lucide-react';
import { UniverseType } from '../data/characters';

interface RoomCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRoom: (config: {
    roomId: string;
    themes: UniverseType[];
    timerSeconds: number;
    password?: string;
    isHost: boolean;
  }) => void;
  nickname: string;
}

export const RoomCreateModal: React.FC<RoomCreateModalProps> = ({
  isOpen,
  onClose,
  onStartRoom,
  nickname
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'create' | 'join'>('create');
  
  const [themeMode, setThemeMode] = useState<'all' | 'single' | 'double'>('all');
  const [selectedSingleTheme, setSelectedSingleTheme] = useState<UniverseType>('marvel');
  const [selectedDoubleThemes, setSelectedDoubleThemes] = useState<UniverseType[]>(['marvel', 'the_boys']);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [password, setPassword] = useState<string>('');

  const [joinRoomCode, setJoinRoomCode] = useState<string>('');
  const [joinPassword, setJoinPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const universes: { id: UniverseType; label: string }[] = [
    { id: 'marvel', label: 'Marvel' },
    { id: 'the_boys', label: 'The Boys' },
    { id: 'invincible', label: 'Invincible' },
    { id: 'star_wars', label: 'Star Wars' }
  ];

  const handleToggleDoubleTheme = (u: UniverseType) => {
    if (selectedDoubleThemes.includes(u)) {
      if (selectedDoubleThemes.length > 1) {
        setSelectedDoubleThemes(selectedDoubleThemes.filter(t => t !== u));
      }
    } else {
      if (selectedDoubleThemes.length < 2) {
        setSelectedDoubleThemes([...selectedDoubleThemes, u]);
      } else {
        setSelectedDoubleThemes([selectedDoubleThemes[1], u]);
      }
    }
  };

  const handleCreate = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    let themes: UniverseType[] = [];

    if (themeMode === 'all') themes = ['all'];
    else if (themeMode === 'single') themes = [selectedSingleTheme];
    else themes = selectedDoubleThemes;

    onStartRoom({
      roomId: code,
      themes,
      timerSeconds,
      password: password.trim() || undefined,
      isHost: true
    });
  };

  const handleJoin = () => {
    if (!joinRoomCode.trim()) {
      setErrorMsg('Введите 6-значный код комнаты');
      return;
    }
    onStartRoom({
      roomId: joinRoomCode.trim().toUpperCase(),
      themes: ['all'],
      timerSeconds: 0,
      password: joinPassword.trim() || undefined,
      isHost: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-5 pt-[max(env(safe-area-inset-top),20px)] pb-3 select-none animate-in fade-in duration-200">
      
      {/* Шапка */}
      <header className="flex justify-between items-center pb-4 border-b border-white/20">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-white" />
          <span className="text-sm font-black uppercase tracking-wider text-white">Дуэль на двоих (PvP)</span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-colors"
        >
          <X size={18} />
        </button>
      </header>

      {/* Вкладки */}
      <div className="flex border border-white/20 max-w-sm w-full mx-auto my-3">
        <button
          onClick={() => { setTab('create'); setErrorMsg(''); }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
            tab === 'create' ? 'bg-white text-black' : 'bg-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Plus size={14} />
          Создать лобби
        </button>
        <button
          onClick={() => { setTab('join'); setErrorMsg(''); }}
          className={`flex-1 py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
            tab === 'join' ? 'bg-white text-black' : 'bg-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <LogIn size={14} />
          Войти по коду
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 flex flex-col gap-5 max-w-sm w-full mx-auto">
        {tab === 'create' ? (
          <>
            <section className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                <Sparkles size={12} />
                Набор персонажей
              </span>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setThemeMode('all')}
                  className={`py-2.5 text-[10px] font-black uppercase border transition-colors ${
                    themeMode === 'all' ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/15'
                  }`}
                >
                  Все герои
                </button>
                <button
                  onClick={() => setThemeMode('single')}
                  className={`py-2.5 text-[10px] font-black uppercase border transition-colors ${
                    themeMode === 'single' ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/15'
                  }`}
                >
                  1 Тема
                </button>
                <button
                  onClick={() => setThemeMode('double')}
                  className={`py-2.5 text-[10px] font-black uppercase border transition-colors ${
                    themeMode === 'double' ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/15'
                  }`}
                >
                  Тема + Тема
                </button>
              </div>

              {themeMode === 'single' && (
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  {universes.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setSelectedSingleTheme(u.id)}
                      className={`py-2 px-3 text-[11px] font-bold border text-left truncate ${
                        selectedSingleTheme === u.id ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/10'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              )}

              {themeMode === 'double' && (
                <div className="grid grid-cols-2 gap-1.5 pt-2">
                  {universes.map(u => {
                    const isSelected = selectedDoubleThemes.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        onClick={() => handleToggleDoubleTheme(u.id)}
                        className={`py-2 px-3 text-[11px] font-bold border text-left flex justify-between items-center ${
                          isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/10'
                        }`}
                      >
                        <span className="truncate">{u.label}</span>
                        {isSelected && <span className="text-[9px] font-black">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                <Clock size={12} />
                Ограничение на ход
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { sec: 0, label: 'Без лимита' },
                  { sec: 30, label: '30 сек' },
                  { sec: 60, label: '60 сек' },
                  { sec: 90, label: '90 сек' }
                ].map(t => (
                  <button
                    key={t.sec}
                    onClick={() => setTimerSeconds(t.sec)}
                    className={`py-2 text-[10px] font-bold border transition-colors ${
                      timerSeconds === t.sec ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/15'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                <Lock size={12} />
                Пароль комнаты (необязательно)
              </span>
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Оставьте пустым для открытого входа..."
                className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </section>
          </>
        ) : (
          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Код комнаты соперника:
              </span>
              <input
                type="text"
                value={joinRoomCode}
                onChange={e => setJoinRoomCode(e.target.value.toUpperCase())}
                placeholder="Например: WT492A"
                maxLength={8}
                className="w-full bg-white/5 border border-white/30 px-3 py-3 text-sm font-mono tracking-widest uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                Пароль комнаты (если установлен):
              </span>
              <input
                type="password"
                value={joinPassword}
                onChange={e => setJoinPassword(e.target.value)}
                placeholder="Введите пароль..."
                className="w-full bg-white/5 border border-white/20 px-3 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="pt-2 border-t border-white/20 max-w-sm w-full mx-auto flex flex-col gap-2">
        <div className="text-[10px] font-mono text-neutral-400 text-center">
          Игрок: <span className="text-white font-bold">{nickname}</span>
        </div>
        {tab === 'create' ? (
          <button
            onClick={handleCreate}
            className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300 transition-colors"
          >
            Создать комнату и начать
          </button>
        ) : (
          <button
            onClick={handleJoin}
            className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300 transition-colors"
          >
            Войти в дуэль
          </button>
        )}
      </footer>

    </div>
  );
};
