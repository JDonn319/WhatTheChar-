import React, { useState, useRef, useEffect } from 'react';
import { Info, MessageSquare, Send, X, LogOut, Check, Loader2 } from 'lucide-react';
import { Character } from '../data/characters';
import { GameResultModal } from './GameResultModal';

interface GameBoardProps {
  characters: Character[];
  onBackToMenu: () => void;
  isAiMode: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ characters, onBackToMenu, isAiMode }) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [aiSecretChar, setAiSecretChar] = useState<Character | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [infoChar, setInfoChar] = useState<Character | null>(null);
  const [accuseChar, setAccuseChar] = useState<Character | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Состояние победы / поражения
  const [gameResult, setGameResult] = useState<{
    show: boolean;
    isVictory: boolean;
    reason: string;
  }>({ show: false, isVictory: false, reason: '' });

  // Чат и ход
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'you' | 'opponent'; text: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Инициализация секретного персонажа ИИ в одиночном режиме
  useEffect(() => {
    if (isAiMode && characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const chosen = characters[randomIndex];
      setAiSecretChar(chosen);
      setMessages([
        { sender: 'opponent', text: 'Я загадал персонажа из этих 36! Твой ход — задай вопрос про его внешность или костюм.' }
      ]);
    }
  }, [isAiMode, characters]);

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
    }, 450);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  // Отправка вопроса игрока
  const handleSendMessage = async () => {
    if (!inputText.trim() || !isMyTurn || isAiThinking) return;
    const userMsg = inputText.trim();
    const updatedHistory = [...messages, { sender: 'you' as const, text: userMsg }];
    
    setMessages(updatedHistory);
    setInputText('');
    setIsMyTurn(false);

    if (isAiMode && aiSecretChar) {
      setIsAiThinking(true);
      try {
        const response = await fetch('/api/ai-turn', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            aiSecretChar,
            charactersPool: characters,
            chatHistory: updatedHistory,
            playerQuestion: userMsg
          })
        });

        const data = await response.json();

        // Проверяем, сделал ли ИИ финальную догадку
        if (data.guessId) {
          if (data.guessId === selectedChar?.id) {
            setGameResult({
              show: true,
              isVictory: false,
              reason: `ИИ вычислил вашего персонажа! Это действительно ${selectedChar.name}.`
            });
            setIsAiThinking(false);
            return;
          } else {
            setMessages(prev => [
              ...prev,
              { sender: 'opponent', text: `${data.answer} Я думаю, ты загадал ${data.guessId}... О нет, я ошибся!` }
            ]);
          }
        } else {
          setMessages(prev => [
            ...prev,
            { sender: 'opponent', text: `${data.answer} \n\nМой вопрос: ${data.aiQuestion}` }
          ]);
        }
      } catch (err) {
        setMessages(prev => [
          ...prev,
          { sender: 'opponent', text: 'Да. Мой вопрос: этот персонаж носит маску или шлем?' }
        ]);
      } finally {
        setIsAiThinking(false);
        setIsMyTurn(true);
      }
    }
  };

  // Быстрый ответ на вопрос ИИ
  const handleQuickAnswer = (answer: string) => {
    if (!isMyTurn) return;
    setInputText(answer);
  };

  // Проверка догадки игрока по Long-press
  const handleMakeGuess = () => {
    if (!accuseChar) return;
    const target = isAiMode ? aiSecretChar : null;

    if (target && accuseChar.id === target.id) {
      setGameResult({
        show: true,
        isVictory: true,
        reason: `Вы безошибочно угадали персонажа! Соперник действительно загадал ${target.name}.`
      });
    } else {
      setGameResult({
        show: true,
        isVictory: false,
        reason: `Ошибка! Соперник загадал не ${accuseChar.name}. Победа достаётся сопернику.`
      });
    }
    setAccuseChar(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      
      {/* 1. ВЕРХНИЙ БАР */}
      <div className="w-full pt-[max(env(safe-area-inset-top),14px)] pb-2 px-3 bg-black/85 backdrop-blur-xl border-b border-white/20 z-20 flex items-center justify-between shrink-0">
        {isConfirmed && selectedChar ? (
          <div className="flex items-center gap-2">
            <img 
              src={selectedChar.avatar} 
              alt={selectedChar.name} 
              className="w-8 h-8 object-cover border border-white"
            />
            <div className="flex flex-col">
              <span className="text-[8px] text-neutral-400 font-semibold uppercase">Твой выбор:</span>
              <span className="text-[11px] font-bold leading-tight truncate max-w-[160px]">{selectedChar.name}</span>
            </div>
            <button 
              onClick={() => setInfoChar(selectedChar)}
              className="w-6 h-6 bg-white/20 border border-white/30 flex items-center justify-center active:bg-white active:text-black ml-1"
            >
              <Info size={11} />
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
            {selectedChar ? 'Нажмите «Подтвердить» внизу' : 'Выберите персонажа на поле:'}
          </span>
        )}

        <button 
          onClick={onBackToMenu}
          className="p-1.5 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black"
        >
          <LogOut size={13} />
        </button>
      </div>

      {/* 2. ИГРОВОЕ ПОЛЕ 6 НА 6 (36 КВАДРАТОВ) */}
      <div className={`w-full flex-1 px-1.5 py-1 flex items-center justify-center min-h-0 overflow-hidden ${accuseChar ? 'blur-md' : ''}`}>
        <div className="w-full grid grid-cols-6 gap-1 max-w-sm place-content-center">
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
                className={`relative aspect-square w-full border transition-all duration-150 flex flex-col justify-end p-0.5 overflow-hidden ${
                  !isConfirmed && isCurrentSelected
                    ? 'border-white ring-2 ring-white scale-95 shadow-[0_0_12px_white] z-10'
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
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                <span className="relative z-10 text-[6.5px] font-black uppercase text-center leading-none truncate text-white drop-shadow">
                  {char.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. НИЖНЯЯ ПАНЕЛЬ ПОДТВЕРЖДЕНИЯ (НЕ ПЕРЕКРЫВАЕТ КВАДРАТЫ) */}
      {!isConfirmed && (
        <div className="shrink-0 w-full bg-black/95 border-t border-white/20 p-3 pb-[max(env(safe-area-inset-bottom),14px)] flex flex-col gap-2 z-20">
          {selectedChar ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img 
                    src={selectedChar.avatar} 
                    alt={selectedChar.name} 
                    className="w-7 h-7 object-cover border border-white shrink-0" 
                  />
                  <div className="overflow-hidden">
                    <h3 className="text-xs font-black uppercase truncate">{selectedChar.name}</h3>
                    <p className="text-[10px] text-neutral-400 truncate">{selectedChar.shortDesc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setInfoChar(selectedChar)}
                  className="p-1.5 bg-white/10 border border-white/20 shrink-0 text-neutral-300 ml-2"
                >
                  <Info size={13} />
                </button>
              </div>
              <button
                onClick={() => setIsConfirmed(true)}
                className="w-full py-3 bg-white text-black font-black text-xs active:bg-neutral-300 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                Подтвердить выбор
              </button>
            </>
          ) : (
            <p className="text-[11px] text-center text-neutral-400 py-2">
              Нажмите на любого персонажа выше, чтобы выбрать его
            </p>
          )}
        </div>
      )}

      {/* 4. НИЖНЯЯ ПАНЕЛЬ ХОДА И ЧАТА */}
      {isConfirmed && (
        <div className="shrink-0 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),12px)] bg-black/90 backdrop-blur-md border-t border-white/20 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
              {isAiThinking 
                ? 'ИИ анализирует ход...' 
                : isMyTurn 
                ? '● Ваш ход: задайте вопрос' 
                : '○ Ход соперника...'}
            </span>
            {isAiThinking && <Loader2 size={12} className="animate-spin text-white" />}
          </div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-10 h-10 bg-white text-black border border-white flex items-center justify-center active:bg-neutral-300 transition-colors relative"
          >
            <MessageSquare size={16} />
            {isMyTurn && !isAiThinking && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500" />
            )}
          </button>
        </div>
      )}

      {/* 5. РЕЖИМ ДОЛГОГО НАЖАТИЯ: ВЫБОР / УГАДЫВАНИЕ */}
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
            <p className="text-[11px] text-neutral-400">Это секретный персонаж соперника?</p>
            
            <div className="flex gap-2 w-full pt-1">
              <button
                onClick={() => setAccuseChar(null)}
                className="flex-1 py-3 bg-white/10 border border-white/20 text-xs font-bold"
              >
                Отмена
              </button>
              <button
                onClick={handleMakeGuess}
                className="flex-1 py-3 bg-white text-black text-xs font-black uppercase"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. МОДАЛКА ВИКИПЕДИИ [i] */}
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

      {/* 7. ПОЛНОЭКРАННЫЙ ЧАТ ХОДОВ */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]">
          <div className="flex justify-between items-center pb-3 border-b border-white/20">
            <span className="text-xs font-black uppercase tracking-wider">Диалог раунда с ИИ</span>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`max-w-[85%] p-3 text-xs leading-relaxed border whitespace-pre-line ${
                  m.sender === 'you' 
                    ? 'ml-auto bg-white text-black border-white font-medium' 
                    : 'mr-auto bg-white/10 text-white border-white/20'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isAiThinking && (
              <div className="mr-auto p-3 text-xs bg-white/5 border border-white/10 flex items-center gap-2 text-neutral-400">
                <Loader2 size={12} className="animate-spin" />
                <span>ИИ думает над ответом...</span>
              </div>
            )}
          </div>

          {/* Быстрые кнопки ответа на вопрос соперника */}
          <div className="flex gap-1.5 pb-2">
            <button 
              onClick={() => handleQuickAnswer('Да')}
              className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black"
            >
              Да
            </button>
            <button 
              onClick={() => handleQuickAnswer('Нет')}
              className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black"
            >
              Нет
            </button>
            <button 
              onClick={() => handleQuickAnswer('Не уверен / Частично')}
              className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black"
            >
              Частично
            </button>
          </div>

          <div className="flex gap-1.5 pt-2 border-t border-white/20">
            <input 
              type="text"
              value={inputText}
              disabled={!isMyTurn || isAiThinking}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isAiThinking ? "ИИ размышляет..." : isMyTurn ? "Например: «Твой герой носит плащ?»" : "Ожидание хода..."}
              className="flex-1 bg-white/10 border border-white/30 px-3 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white disabled:opacity-40"
            />
            <button
              onClick={handleSendMessage}
              disabled={!isMyTurn || !inputText.trim() || isAiThinking}
              className="px-4 py-3 bg-white text-black font-black text-xs active:bg-neutral-300 disabled:opacity-30 flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 8. ЭКРАН ПОБЕДЫ / ПОРАЖЕНИЯ */}
      {gameResult.show && (
        <GameResultModal 
          isVictory={gameResult.isVictory}
          reason={gameResult.reason}
          playerChar={selectedChar}
          opponentChar={aiSecretChar}
          onRematch={() => {
            setGameResult({ show: false, isVictory: false, reason: '' });
            setSelectedChar(null);
            setIsConfirmed(false);
            setEliminatedIds([]);
          }}
          onHome={onBackToMenu}
        />
      )}

    </div>
  );
};
