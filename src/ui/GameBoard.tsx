import React, { useState, useRef } from 'react';
import { Character } from '../data/characters';

interface GameBoardProps {
  characters: Character[];
  onBackToMenu: () => void;
  isAiMode: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ characters, onBackToMenu, isAiMode }) => {
  // Выбор своего персонажа
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Состояния карточек на поле (вычеркнутые)
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  // Досье персонажа [i]
  const [infoChar, setInfoChar] = useState<Character | null>(null);

  // Режим выбора/угадывания персонажа по Long-press
  const [accuseChar, setAccuseChar] = useState<Character | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Чат
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'you' | 'opponent'; text: string }[]>([
    { sender: 'opponent', text: 'Я загадал персонажа. Твой ход! Задавай вопрос.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true);

  // Одиночный клик: затемнение
  const handleCardClick = (char: Character) => {
    if (!isConfirmed) {
      setSelectedChar(char);
      return;
    }
    setEliminatedIds(prev => 
      prev.includes(char.id) ? prev.filter(id => id !== char.id) : [...prev, char.id]
    );
  };

  // Обработка долгого зажатия на iOS (Long press)
  const handleTouchStart = (char: Character) => {
    if (!isConfirmed) return;
    longPressTimer.current = setTimeout(() => {
      setAccuseChar(char);
    }, 550);
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

    // Заглушка хода соперника / ИИ
    if (isAiMode) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { sender: 'opponent', text: 'Да. Теперь мой вопрос: твой герой носит костюм?' }
        ]);
        setIsMyTurn(true);
      }, 1500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      
      {/* Верхний бар после подтверждения */}
      {isConfirmed && selectedChar && (
        <div className="w-full flex items-center justify-between p-3 bg-white/10 backdrop-blur-xl border-b border-white/10 z-20">
          <div className="flex items-center gap-3">
            <img 
              src={selectedChar.avatar} 
              alt={selectedChar.name} 
              className="w-10 h-10 rounded-full object-cover border border-white"
            />
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-400 font-semibold uppercase">Твой персонаж:</span>
              <span className="text-xs font-bold leading-tight">{selectedChar.name}</span>
            </div>
            <button 
              onClick={() => setInfoChar(selectedChar)}
              className="w-6 h-6 rounded-full bg-white/20 text-[11px] font-bold flex items-center justify-center ml-1 active:scale-90"
            >
              i
            </button>
          </div>
          
          <button 
            onClick={onBackToMenu}
            className="text-xs text-neutral-400 font-semibold px-2 py-1 bg-white/5 rounded-lg active:scale-95"
          >
            Выход
          </button>
        </div>
      )}

      {/* Игровая сетка (24 квадратика) */}
      <div className={`w-full flex-1 p-2 grid grid-cols-4 grid-rows-6 gap-2 overflow-hidden ${accuseChar ? 'blur-md' : ''}`}>
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
              className={`relative rounded-xl overflow-hidden border transition-all duration-200 flex flex-col justify-end p-1 ${
                !isConfirmed && isCurrentSelected
                  ? 'border-white ring-2 ring-white scale-95 shadow-[0_0_15px_white]'
                  : isEliminated
                  ? 'opacity-25 grayscale border-transparent'
                  : 'border-white/20 active:scale-95 bg-neutral-900'
              }`}
            >
              <img 
                src={char.avatar} 
                alt={char.name} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <span className="relative z-10 text-[9px] font-bold text-center leading-tight truncate text-white drop-shadow">
                {char.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Окно подтверждения начального выбора персонажа */}
      {!isConfirmed && selectedChar && (
        <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-2xl border-t border-white/20 p-5 flex flex-col gap-3 z-30 animate-in fade-in slide-in-from-bottom duration-300">
          <div>
            <h3 className="text-lg font-black">{selectedChar.name}</h3>
            <p className="text-xs text-neutral-300 mt-1 line-clamp-2">{selectedChar.shortDesc}</p>
          </div>
          <button
            onClick={() => setIsConfirmed(true)}
            className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-sm active:scale-95 transition-transform"
          >
            ПОДТВЕРДИТЬ ВЫБОР
          </button>
        </div>
      )}

      {/* Окно долгого нажатия: Кнопка "ВЫБРАТЬ (УГАДАТЬ)" */}
      {accuseChar && (
        <div 
          onClick={() => setAccuseChar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-black/80 backdrop-blur-2xl border border-white/30 rounded-3xl p-6 flex flex-col items-center gap-4 text-center"
          >
            <img 
              src={accuseChar.avatar} 
              alt={accuseChar.name} 
              className="w-28 h-28 rounded-2xl object-cover border-2 border-white shadow-2xl"
            />
            <h4 className="text-base font-bold">{accuseChar.name}</h4>
            <p className="text-xs text-neutral-400">Это тайный персонаж соперника?</p>
            
            <div className="flex gap-2 w-full pt-2">
              <button
                onClick={() => setAccuseChar(null)}
                className="flex-1 py-3 bg-white/10 rounded-xl text-xs font-bold"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  alert(`Проверка: если соперник выбрал ${accuseChar.name} — ПОБЕДА!`);
                  onBackToMenu();
                }}
                className="flex-1 py-3 bg-white text-black rounded-xl text-xs font-extrabold"
              >
                ВЫБРАТЬ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модалка досье из Википедии [i] */}
      {infoChar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
          <div className="w-full max-w-sm bg-neutral-900 border border-white/20 rounded-3xl p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-black">{infoChar.name}</h3>
              <button onClick={() => setInfoChar(null)} className="text-neutral-400 text-lg">✕</button>
            </div>
            <img src={infoChar.avatar} alt={infoChar.name} className="w-full h-44 rounded-xl object-cover" />
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">{infoChar.wiki}</p>
          </div>
        </div>
      )}

      {/* Кнопка открытия полноэкранного мессенджера */}
      {isConfirmed && (
        <div className="p-3 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between z-20">
          <span className="text-[11px] text-neutral-400">
            {isMyTurn ? 'Ваш ход: задайте вопрос' : 'Ход соперника...'}
          </span>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow-lg active:scale-90 transition-transform"
          >
            💬
          </button>
        </div>
      )}

      {/* Полноэкранный чат-мессенджер */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-4 animate-in slide-in-from-bottom duration-300">
          {/* Шапка чата */}
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-sm font-bold">Чат раунда</span>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'you' 
                    ? 'ml-auto bg-white text-black rounded-tr-none font-medium' 
                    : 'mr-auto bg-white/10 text-white rounded-tl-none border border-white/10'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Поле ввода вопроса (только в свой ход) */}
          <div className="flex gap-2 pt-2 border-t border-white/10">
            <input 
              type="text"
              value={inputText}
              disabled={!isMyTurn}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isMyTurn ? "Напишите вопрос..." : "Ожидание ответа соперника..."}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white disabled:opacity-40"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isMyTurn || !inputText.trim()}
              className="px-5 py-3 rounded-xl bg-white text-black font-extrabold text-xs active:scale-95 disabled:opacity-30"
            >
              Отправить
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
