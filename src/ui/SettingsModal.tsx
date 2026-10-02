import React, { useState } from 'react';
import { X, Cpu, Image as ImageIcon, Activity, Check, User, Smile, Zap, Flame, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

export type AiToneType = 'standard' | 'sarcastic' | 'unhinged';

export interface AiModelOption {
  id: string;
  name: string;
  badge: string;
  desc: string;
}

export const AI_MODELS: AiModelOption[] = [
  { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash-8B', badge: 'Ультра-легкая', desc: 'Минимальная задержка отклика.' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', badge: 'Классическая Flash', desc: 'Стабильная проверенная модель.' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', badge: 'Поколение 2.0', desc: 'Быстрый отклик и хорошее мышление.' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite', badge: 'Свежая Lite', desc: 'Высокая пропускная способность.' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', badge: 'Флагман 3.8', desc: 'Глубокая дедукция и логика.' }
];

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  currentBg: string;
  onSelectBg: (url: string) => void;
  nickname: string;
  onSaveNickname: (name: string) => void;
  aiTone: AiToneType;
  onSelectAiTone: (tone: AiToneType) => void;
  autoFilterEnabled: boolean;
  onToggleAutoFilter: (val: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  currentBg,
  onSelectBg,
  nickname,
  onSaveNickname,
  aiTone,
  onSelectAiTone,
  autoFilterEnabled,
  onToggleAutoFilter
}) => {
  if (!isOpen) return null;

  const [nickInput, setNickInput] = useState(nickname);
  const [nickError, setNickError] = useState('');
  const [showAutoFilterAlert, setShowAutoFilterAlert] = useState(false);

  const bgOptions = [
    { id: 'default', label: 'Неон (По умолчанию)', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000' },
    { id: 'space', label: 'Космос', url: '/background2.jpg' },
    { id: 'meadow', label: 'Поляна', url: '/background3.jpg' },
    { id: 'black', label: 'Чистый чёрный', url: '' }
  ];

  const handleNickChange = (val: string) => {
    setNickInput(val);
    const lettersCount = (val.match(/[a-zA-Z]/g) || []).length;
    const digitsCount = (val.match(/[0-9]/g) || []).length;
    const invalidChars = /[^a-zA-Z0-9]/.test(val);

    if (invalidChars) {
      setNickError('Только латиница и цифры');
    } else if (lettersCount > 8) {
      setNickError('Максимум 8 букв');
    } else if (digitsCount > 2) {
      setNickError('Максимум 2 цифры');
    } else {
      setNickError('');
      if (val.trim()) {
        onSaveNickname(val.trim());
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-5 pt-[max(env(safe-area-inset-top),20px)] pb-[max(env(safe-area-inset-bottom),20px)] select-none animate-in fade-in duration-300">
      
      <header className="flex justify-between items-center pb-4 border-b border-white/20">
        <span className="text-sm font-black uppercase tracking-wider text-white">Параметры игры</span>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-colors"
        >
          <X size={18} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 max-w-sm w-full mx-auto">
        
        {/* Никнейм */}
        <section className="flex flex-col gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <User size={13} />
            Ваш позывной
          </span>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={nickInput}
              onChange={e => handleNickChange(e.target.value)}
              maxLength={10}
              placeholder="До 8 букв и 2 цифр"
              className="w-full bg-white/5 border border-white/25 px-3 py-2.5 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
            {nickError && <span className="text-[10px] text-red-400 font-mono">{nickError}</span>}
          </div>
        </section>

        {/* Автофильтрация со знаком предупреждения */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300">
                Автофильтрация карточек
              </span>
              <button
                onClick={() => setShowAutoFilterAlert(true)}
                className="text-amber-400 p-0.5 hover:scale-110 active:scale-95 transition-transform"
              >
                <AlertTriangle size={13} />
              </button>
            </div>
            
            {/* Тумблер */}
            <button
              onClick={() => onToggleAutoFilter(!autoFilterEnabled)}
              className={`w-11 h-6 p-0.5 border transition-colors flex items-center ${
                autoFilterEnabled ? 'bg-white border-white justify-end' : 'bg-white/10 border-white/20 justify-start'
              }`}
            >
              <div className={`w-4 h-4 transition-colors ${autoFilterEnabled ? 'bg-black' : 'bg-neutral-400'}`} />
            </button>
          </div>
          <p className="text-[9px] text-neutral-500 leading-tight">
            Автоматически гасит неподходящих персонажей на основе ответов «Да» и «Нет» в чате.
          </p>
        </section>

        {/* Тон и поведение ИИ */}
        <section className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Smile size={13} />
            Характер ИИ
          </span>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'standard', label: 'Спокойный', icon: <Zap size={12} />, desc: 'Строгий и вежливый' },
              { id: 'sarcastic', label: 'Сарказм', icon: <Flame size={12} />, desc: 'Подкалывает и язвит' },
              { id: 'unhinged', label: 'Расшатанный', icon: <ShieldAlert size={12} />, desc: 'Зеркалит тон, ругается' }
            ].map(t => {
              const isSelected = aiTone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectAiTone(t.id as AiToneType)}
                  className={`p-2.5 text-left border flex flex-col gap-1 transition-colors ${
                    isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-300 border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {t.icon}
                    <span className="text-[10px] font-black uppercase">{t.label}</span>
                  </div>
                  <span className={`text-[8px] leading-tight ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    {t.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Модели */}
        <section className="flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Cpu size={13} />
            Версия Gemini
          </span>
          <div className="flex flex-col gap-1.5">
            {AI_MODELS.map(m => {
              const isSelected = selectedModel === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModel(m.id)}
                  className={`w-full p-3 text-left border flex flex-col gap-0.5 transition-colors ${
                    isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/15'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-black uppercase">{m.name}</span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 border ${
                      isSelected ? 'bg-black text-white border-black' : 'bg-white/10 text-neutral-300 border-white/20'
                    }`}>
                      {m.badge}
                    </span>
                  </div>
                  <span className={`text-[9px] ${isSelected ? 'text-neutral-700' : 'text-neutral-400'}`}>
                    {m.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Фон */}
        <section className="flex flex-col gap-2 pb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <ImageIcon size={13} />
            Фоновое изображение
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {bgOptions.map(bg => {
              const isSelected = currentBg === bg.url;
              return (
                <button
                  key={bg.id}
                  onClick={() => onSelectBg(bg.url)}
                  className={`p-2.5 text-xs font-bold border transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/15'
                  }`}
                >
                  <span className="truncate text-[11px]">{bg.label}</span>
                  {isSelected && <Check size={13} />}
                </button>
              );
            })}
          </div>
        </section>

      </div>

      <footer className="pt-3 border-t border-white/20 max-w-sm w-full mx-auto">
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300 transition-colors"
        >
          Применить и закрыть
        </button>
      </footer>

      {/* Предупреждение об автофильтрации */}
      {showAutoFilterAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-neutral-950 border border-amber-500/50 p-5 flex flex-col items-center text-center gap-3 shadow-2xl">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black uppercase text-white">Внимание: Автофильтр</h4>
              <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
                Система анализирует чат по ключевым словам («плащ», «маска», «человек», «борода» и др.). При сложных или нестандартных ответах соперника система может ошибиться. Рекомендуется перепроверять доску самостоятельно!
              </p>
            </div>
            <button
              onClick={() => setShowAutoFilterAlert(false)}
              className="w-full py-2.5 bg-white text-black font-black text-xs uppercase active:bg-neutral-300 transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
