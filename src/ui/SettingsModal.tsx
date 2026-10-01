import React from 'react';
import { X, Cpu, Image as ImageIcon, Activity, Check } from 'lucide-react';

export interface AiModelOption {
  id: string;
  name: string;
  badge: string;
  desc: string;
}

export const AI_MODELS: AiModelOption[] = [
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash-Lite',
    badge: 'Ультра-быстрая',
    desc: 'Огромный запас мощности серверов. Практически исключает ошибку «Занято».'
  },
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash',
    badge: 'Флагман + Мышление',
    desc: 'Глубокая логика и дедукция, но в часы пик может быть перегружена.'
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    badge: 'Сбалансированная',
    desc: 'Оптимальный баланс между скоростью ответов и логикой.'
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash-Lite',
    badge: 'Легкая',
    desc: 'Быстрая рабочая модель с хорошей скоростью генерации.'
  }
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  currentBg: string;
  onSelectBg: (url: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  currentBg,
  onSelectBg
}) => {
  if (!isOpen) return null;

  const bgOptions = [
    {
      id: 'default',
      label: 'По умолчанию (Неон)',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
    },
    {
      id: 'space',
      label: 'Космос',
      url: '/background2.png'
    },
    {
      id: 'meadow',
      label: 'Поляна',
      url: '/background3.png'
    },
    {
      id: 'black',
      label: 'Чистый чёрный',
      url: ''
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-5 pt-[max(env(safe-area-inset-top),20px)] pb-[max(env(safe-area-inset-bottom),20px)] select-none animate-in fade-in duration-200">
      
      <header className="flex justify-between items-center pb-4 border-b border-white/20">
        <span className="text-sm font-black uppercase tracking-wider text-white">Параметры игры</span>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-colors"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto py-5 flex flex-col gap-6 max-w-sm w-full mx-auto">
        
        {/* 1. Блок монитора тарифа */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-400">
            <Activity size={14} className="text-emerald-400" />
            <span>Тариф и квоты ИИ</span>
          </div>

          <div className="p-4 bg-white/5 border border-white/15 flex flex-col gap-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Google AI Studio</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                АКТИВЕН (FREE)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10 text-[10px] font-mono text-neutral-300">
              <div>• Лимит: <span className="text-white font-bold">15 RPM</span></div>
              <div>• Сутки: <span className="text-white font-bold">1,500 RPD</span></div>
            </div>

            <p className="text-[10px] text-neutral-400 leading-relaxed border-t border-white/10 pt-2">
              🛡️ При исчерпании лимита или перегрузке игра автоматически переключается на свободную резервную модель.
            </p>
          </div>
        </section>

        {/* 2. Выбор модели ИИ */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-400">
            <Cpu size={14} />
            <span>Версия Gemini</span>
          </div>

          <div className="flex flex-col gap-2">
            {AI_MODELS.map((m) => {
              const isSelected = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModel(m.id)}
                  className={`w-full p-3.5 text-left border transition-all flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                      : 'bg-white/5 text-white border-white/15 active:bg-white/15'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase tracking-wide">{m.name}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 border ${
                      isSelected
                        ? 'bg-black text-white border-black'
                        : 'bg-white/10 text-neutral-300 border-white/20'
                    }`}>
                      {m.badge}
                    </span>
                  </div>
                  <p className={`text-[10px] leading-snug ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    {m.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Выбор фона */}
        <section className="flex flex-col gap-2 pb-2">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-400">
            <ImageIcon size={14} />
            <span>Фоновое изображение</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {bgOptions.map((bg) => {
              const isSelected = currentBg === bg.url;
              return (
                <button
                  key={bg.id}
                  onClick={() => onSelectBg(bg.url)}
                  className={`p-3 text-xs font-bold border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-white border-white/15 active:bg-white/15'
                  }`}
                >
                  <span className="truncate">{bg.label}</span>
                  {isSelected && <Check size={14} className="shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </section>

      </div>

      <footer className="pt-3 border-t border-white/20 max-w-sm w-full mx-auto">
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300"
        >
          Применить и закрыть
        </button>
      </footer>

    </div>
  );
};
