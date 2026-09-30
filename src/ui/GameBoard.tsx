import React, { useState, useRef } from 'react';
import { Info, MessageSquare, Send, X, LogOut, Check } from 'lucide-react';
import { Character } from '../data/characters';

interface GameBoardProps {
  characters: Character[];
  onBackToMenu: () => void;
  isAiMode: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ characters, onBackToMenu, isAiMode }) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [infoChar, setInfoChar] = useState<Character | null>(null);
  const [accuseChar, setAccuseChar] = useState<Character | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'you' | 'opponent'; text: string }[]>([
    { sender: 'opponent', text: 'Я загадал персонажа. Задавай вопрос про его внешность или костюм!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true);

  const handleCardClick = (char: Character) => {
    if (!isConfirmed) {
      setSelectedChar(char);
      return;
    }
    setEliminatedIds(prev => 
      prev.includes(char.id) ? prev.filter(id => id !== char.id) : [...prev, char.id]
    );
  };

  const handleTouchStart = (char: Character) => {
    if (!isConfirmed) return;
    longPressTimer.current = setTimeout(() => {
      setAccuseChar(char);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !isMyTurn) return;
    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'you', text: userMsg }]);
    setInputText('');
    setIsMyTurn(false);

    if (isAiMode) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { sender: 'opponent', text: 'Да. Мой вопрос: на твоем герое надет шлем или маска?' }
        ]);
        setIsMyTurn(true);
      }, 1400);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      
      {/* Верхний бар с безопасным отступом сверху */}
      <div className="w-full pt-[max(env(safe-area-inset-top),16px)] pb-2 px-3 bg-black/80 backdrop-blur-xl border-b border-white/20 z-20 flex items-center justify-between">
        {isConfirmed && selectedChar ? (
          <div className="flex items-center gap-2.5">
            <img 
              src={selectedChar.avatar} 
              alt={selectedChar.name} 
              className="w-9 h-9 object-cover border border-white"
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-neutral-400 font-semibold uppercase">Твой выбор:</span>
              <span className="text-xs font-bold leading-tight truncate max-w-[150px]">{selectedChar.name}</span>
            </div>
            <button 
              onClick={() => setInfoChar(selectedChar)}
              className="w-6 h-6 bg-white/20 border border-white/30 flex items-center justify-center active:bg-white active:text-black ml-1"
            >
              <Info size={12} />
            </button>
          </div>
        ) : (
          <span className="text-xs font-black uppercase tracking-wider text-neutral-300">
            Выберите своего персонажа
          </span>
        )}

        <button 
          onClick={onBackToMenu}
          className="p-2 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black"
        >
          <LogOut size={14} />
        </button>
      </div>

      {/* Игровое поле: 24 СТРОГИХ КВАДРАТА (aspect-square) */}
      <div className={`w-full flex-1 px-2 py-1 flex items-center justify-center overflow-hidden ${accuseChar ? 'blur-md' : ''}`}>
        <div className="w-full grid grid-cols-4 gap-1.5 max-w-sm place-content-center">
          {characters.map(char => {
            const isEliminated = eliminatedIds.includes(char.id);
            const isCurrentSelected = selectedChar?.id === char.id;

            return (
              <div
                key={char.id}
                onClick={() => handleCardClick(char)}
                onTouchStart={() => handleTouchStart(char)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(char)}
                onMouseUp={handleTouchEnd}
                className={`relative aspect-square w-full border transition-all duration-150 flex flex-col justify-end p-1 overflow-hidden ${
                  !isConfirmed && isCurrentSelected
                    ? 'border-white ring-2 ring-white scale-95 shadow-[0_0_15px_white]'
                    : isEliminated
                    ? 'opacity-20 grayscale border-transparent bg-neutral-950'
                    : 'border-white/25 active:scale-95 bg-neutral-900'
                }`}
              >
                <img 
                  src={char.avatar} 
                  alt={char.name} 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  onError={(e) => {
                    // Резервный цвет, если локальный файл еще не положили
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <span className="relative z-10 text-[8px] font-black uppercase text-center leading-tight truncate text-white drop-shadow">
                  {char.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Подтверждение стартового выбора */}
      {!isConfirmed && selectedChar && (
        <div className="absolute bottom-0 inset-x-0 bg-black/95 backdrop-blur-2xl border-t border-white/20 p-4 pb-[max(env(safe-area-inset-bottom),16px)] flex flex-col gap-2.5 z-30">
          <div>
            <h3 className="text-base font-black uppercase">{selectedChar.name}</h3>
            <p className="text-[11px] text-neutral-300 line-clamp-2">{selectedChar.shortDesc}</p>
          </div>
          <button
            onClick={() => setIsConfirmed(true)}
            className="w-full py-3.5 bg-white text-black font-black text-xs active:bg-neutral-300 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <Check size={16} />
            Подтвердить выбор
          </button>
        </div>
      )}

      {/* Меню долгого нажатия: Кнопка выбора/угадывания */}
      {accuseChar && (
        <div 
          onClick={() => setAccuseChar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-black border border-white/40 p-5 flex flex-col items-center gap-3 text-center shadow-2xl"
          >
            <img 
              src={accuseChar.avatar} 
              alt={accuseChar.name} 
              className="w-24 h-24 object-cover border border-white"
            />
            <h4 className="text-sm font-black uppercase">{accuseChar.name}</h4>
            <p className="text-[11px] text-neutral-400">Это секретный герой соперника?</p>
            
            <div className="flex gap-2 w-full pt-1">
              <button
                onClick={() => setAccuseChar(null)}
                className="flex-1 py-3 bg-white/10 border border-white/20 text-xs font-bold"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  alert(`Проверка: если соперник выбрал ${accuseChar.name} — ПОБЕДА!`);
                  onBackToMenu();
                }}
                className="flex-1 py-3 bg-white text-black text-xs font-black uppercase"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Окно сведений из Википедии и приметами костюма [i] */}
      {infoChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-5">
          <div className="w-full max-w-sm bg-neutral-950 border border-white/30 p-5 flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-base font-black uppercase">{infoChar.name}</h3>
              <button onClick={() => setInfoChar(null)} className="text-neutral-400 p-1">
                <X size={18} />
              </button>
            </div>
            <img src={infoChar.avatar} alt={infoChar.name} className="w-full h-44 object-cover border border-white/20" />
            
            <div className="p-2.5 bg-white/5 border border-white/10 text-[11px] flex flex-col gap-1">
              <span className="font-bold text-white uppercase text-[9px] tracking-wider">Приметы на картинке:</span>
              <p className="text-neutral-300">Цвета: {infoChar.traits.mainColors.join(', ')}</p>
              <p className="text-neutral-300">Шлем/маска: {infoChar.traits.hasHelmetOrMask ? 'Да' : 'Нет'}</p>
              <p className="text-neutral-300">Плащ: {infoChar.traits.hasCape ? 'Да' : 'Нет'}</p>
              <p className="text-neutral-300">Оружие в руках: {infoChar.traits.hasWeapon ? 'Да' : 'Нет'}</p>
              <p className="text-neutral-400 italic mt-0.5">{infoChar.traits.notes}</p>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">{infoChar.wiki}</p>
          </div>
        </div>
      )}

      {/* Нижняя панель с кнопкой чата под Safe Area */}
      {isConfirmed && (
        <div className="px-3 pt-2 pb-[max(env(safe-area-inset-bottom),12px)] bg-black/90 backdrop-blur-md border-t border-white/20 flex items-center justify-between z-20">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
            {isMyTurn ? '● Ваш ход: задайте вопрос' : '○ Ожидание хода...'}
          </span>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-10 h-10 bg-white text-black border border-white flex items-center justify-center active:bg-neutral-300 transition-colors"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      )}

      {/* Чат диалога ходов */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]">
          <div className="flex justify-between items-center pb-3 border-b border-white/20">
            <span className="text-xs font-black uppercase tracking-wider">Вопросы и ответы раунда</span>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-2">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 text-xs leading-relaxed border ${
                  m.sender === 'you' 
                    ? 'ml-auto bg-white text-black border-white font-medium' 
                    : 'mr-auto bg-white/10 text-white border-white/20'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex gap-1.5 pt-2 border-t border-white/20">
            <input 
              type="text"
              value={inputText}
              disabled={!isMyTurn}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isMyTurn ? "Например: «Твой персонаж в шлеме?»" : "Ждем соперника..."}
              className="flex-1 bg-white/10 border border-white/30 px-3 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white disabled:opacity-40"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isMyTurn || !inputText.trim()}
              className="px-4 py-3 bg-white text-black font-black text-xs active:bg-neutral-300 disabled:opacity-30 flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
