import React, { useState } from 'react';
import { Settings, Play, Users, Check } from 'lucide-react';
import { UniverseType } from '../data/characters';

interface MainMenuProps {
  onStartSingle: (universe: UniverseType) => void;
  onStartMulti: (universe: UniverseType) => void;
  currentBg: string;
  onChangeBg: (url: string) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  onStartSingle, 
  onStartMulti, 
  onChangeBg 
}) => {
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseType>('all');
  const [showSettings, setShowSettings] = useState(false);

  const universes: { id: UniverseType; label: string }[] = [
    { id: 'all', label: 'ALL SUPERHEROES' },
    { id: 'marvel', label: 'MARVEL HEROES' },
    { id: 'the_boys', label: 'THE BOYS HEROES' },
    { id: 'invincible', label: 'INVINCIBLE HEROES' },
    { id: 'star_wars', label: 'STAR WARS HEROES' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-5 z-10">
      {/* Шапка с иконкой настроек */}
      <header className="flex justify-between items-center pt-2">
        <h2 className="text-xl font-black tracking-tight text-white drop-shadow-md uppercase">
          WhatTheChar?
        </h2>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-all"
        >
          <Settings size={18} />
        </button>
      </header>

      {/* Меню смены фона без скруглений */}
      {showSettings && (
        <div className="absolute top-16 right-5 w-60 bg-black/90 backdrop-blur-xl border border-white/20 p-4 z-50 text-xs flex flex-col gap-2">
          <p className="font-bold text-neutral-300 uppercase tracking-wider text-[10px]">Выбор фона:</p>
          <button 
            onClick={() => { onChangeBg('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'); setShowSettings(false); }}
            className="p-2 bg-white/10 text-left border border-white/10 hover:bg-white/20"
          >
            Неон Киберпанк
          </button>
          <button 
            onClick={() => { onChangeBg('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000'); setShowSettings(false); }}
            className="p-2 bg-white/10 text-left border border-white/10 hover:bg-white/20"
          >
            Глубокий Космос
          </button>
          <button 
            onClick={() => { onChangeBg(''); setShowSettings(false); }}
            className="p-2 bg-white/10 text-left border border-white/10 text-neutral-400"
          >
            Чистый чёрный
          </button>
        </div>
      )}

      {/* Список выбора вселенных */}
      <div className="flex flex-col gap-1.5 my-auto max-w-sm w-full mx-auto">
        <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400 pl-1">
          Выбор вселенной:
        </span>
        {universes.map(u => (
          <button
            key={u.id}
            onClick={() => setSelectedUniverse(u.id)}
            className={`w-full py-3.5 px-4 text-xs font-bold tracking-wider transition-all duration-150 backdrop-blur-md border flex items-center justify-between ${
              selectedUniverse === u.id
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                : 'bg-white/10 text-white/80 border-white/10 active:bg-white/20'
            }`}
          >
            <span>{u.label}</span>
            {selectedUniverse === u.id && <Check size={14} />}
          </button>
        ))}
      </div>

      {/* Кнопки режимов игры */}
      <div className="flex flex-col gap-2 pb-4 max-w-sm w-full mx-auto">
        <button
          onClick={() => onStartMulti(selectedUniverse)}
          className="w-full py-4 bg-white/10 backdrop-blur-lg border border-white/30 text-white font-black tracking-wider active:bg-white active:text-black transition-all flex items-center justify-center gap-2 text-xs uppercase"
        >
          <Users size={16} />
          Создать комнату
        </button>

        <button
          onClick={() => onStartSingle(selectedUniverse)}
          className="w-full py-4 bg-white text-black font-black tracking-wider active:bg-neutral-300 transition-all flex items-center justify-center gap-2 text-xs uppercase"
        >
          <Play size={16} />
          Одиночная игра (ИИ)
        </button>
      </div>
    </div>
  );
};
