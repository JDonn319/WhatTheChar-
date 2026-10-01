import React, { useState } from 'react';
import { Settings, Play, Users, Check } from 'lucide-react';
import { UniverseType } from '../data/characters';
import { SettingsModal, AiToneType } from './SettingsModal';
import { RoomCreateModal } from './RoomCreateModal';

interface MainMenuProps {
  onStartSingle: (universe: UniverseType) => void;
  onStartMulti: (config: {
    roomId: string;
    themes: UniverseType[];
    timerSeconds: number;
    password?: string;
    isHost: boolean;
  }) => void;
  currentBg: string;
  onChangeBg: (url: string) => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  nickname: string;
  onSaveNickname: (name: string) => void;
  aiTone: AiToneType;
  onSelectAiTone: (tone: AiToneType) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  onStartSingle, 
  onStartMulti, 
  currentBg,
  onChangeBg,
  selectedModel,
  onSelectModel,
  nickname,
  onSaveNickname,
  aiTone,
  onSelectAiTone
}) => {
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseType>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  const universes: { id: UniverseType; label: string }[] = [
    { id: 'all', label: 'ALL SUPERHEROES' },
    { id: 'marvel', label: 'MARVEL HEROES' },
    { id: 'the_boys', label: 'THE BOYS HEROES' },
    { id: 'invincible', label: 'INVINCIBLE HEROES' },
    { id: 'star_wars', label: 'STAR WARS HEROES' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between px-5 pt-[max(env(safe-area-inset-top),20px)] pb-[max(env(safe-area-inset-bottom),20px)] z-10 box-border">
      
      {/* Шапка */}
      <header className="flex justify-between items-center w-full max-w-sm mx-auto">
        <div className="flex flex-col">
          <h2 className="text-xl font-black tracking-tight text-white uppercase drop-shadow-md">
            WhatTheChar?
          </h2>
          <span className="text-[10px] font-mono text-neutral-400">Игрок: {nickname}</span>
        </div>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-colors"
        >
          <Settings size={18} />
        </button>
      </header>

      {/* Выбор Вселенной */}
      <div className="flex flex-col gap-2 my-auto max-w-sm w-full mx-auto">
        <span className="text-[10px] tracking-widest uppercase font-bold text-neutral-400 pl-1">
          Выберите тему персонажей:
        </span>
        {universes.map(u => (
          <button
            key={u.id}
            onClick={() => setSelectedUniverse(u.id)}
            className={`w-full py-3.5 px-4 text-xs font-bold tracking-wider transition-all backdrop-blur-md border flex items-center justify-between ${
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

      {/* Кнопки старта */}
      <div className="flex flex-col gap-2 max-w-sm w-full mx-auto">
        <button
          onClick={() => setIsRoomModalOpen(true)}
          className="w-full py-4 bg-white/10 backdrop-blur-lg border border-white/30 text-white font-black tracking-wider active:bg-white active:text-black transition-all flex items-center justify-center gap-2 text-xs uppercase"
        >
          <Users size={16} />
          Создать комнату (PvP)
        </button>

        <button
          onClick={() => onStartSingle(selectedUniverse)}
          className="w-full py-4 bg-white text-black font-black tracking-wider active:bg-neutral-300 transition-all flex items-center justify-center gap-2 text-xs uppercase"
        >
          <Play size={16} />
          Одиночная игра (ИИ)
        </button>
      </div>

      {/* Модалка настроек */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={onSelectModel}
        currentBg={currentBg}
        onSelectBg={onChangeBg}
        nickname={nickname}
        onSaveNickname={onSaveNickname}
        aiTone={aiTone}
        onSelectAiTone={onSelectAiTone}
      />

      {/* Модалка создания/входа в комнату */}
      <RoomCreateModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        onStartRoom={(cfg) => {
          setIsRoomModalOpen(false);
          onStartMulti(cfg);
        }}
        nickname={nickname}
      />

    </div>
  );
};
