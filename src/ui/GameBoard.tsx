import React, { useState, useRef, useEffect } from 'react';
import { Info, MessageSquare, Send, X, LogOut, Check, Loader2, Heart, Settings, AlertTriangle } from 'lucide-react';
import { Character } from '../data/characters';
import { GameResultModal } from './GameResultModal';
import { SettingsModal } from './SettingsModal';

interface GameBoardProps {
  characters: Character[];
  onBackToMenu: () => void;
  isAiMode: boolean;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  currentBg: string;
  onChangeBg: (url: string) => void;
  currentUniverse: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  characters, 
  onBackToMenu, 
  isAiMode,
  selectedModel,
  onSelectModel,
  currentBg,
  onChangeBg,
  currentUniverse
}) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [aiSecretChar, setAiSecretChar] = useState<Character | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [infoChar, setInfoChar] = useState<Character | null>(null);
  const [accuseChar, setAccuseChar] = useState<Character | null>(null);
  
  // Окна меню и предупреждений
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // 3 Сердечка жизней
  const [playerLives, setPlayerLives] = useState<number>(3);

  // Окно победы/поражения
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

  // Инициализация секрета ИИ
  const initAiMatch = () => {
    if (isAiMode && characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const chosen = characters[randomIndex];
      setAiSecretChar(chosen);
      setMessages([
        { sender: 'opponent', text: 'Я загадал персонажа из этих 36! Твой первый ход — задай наводящий вопрос.' }
      ]);
    }
  };

  useEffect(() => {
    initAiMatch();
  }, [isAiMode, characters]);

  // Полный сброс для новой игры
  const handleFullRematch = () => {
    setGameResult({ show: false, isVictory: false, reason: '' });
    setSelectedChar(null);
    setIsConfirmed(false);
    setEliminatedIds([]);
    setPlayerLives(3);
    setIsChatOpen(false);
    setInputText('');
    setIsMyTurn(true);
    setIsAiThinking(false);
    initAiMatch();
  };

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
            playerQuestion: userMsg,
            preferredModel: selectedModel,
            universe: currentUniverse
          })
        });

        const data = await response.json();

        if (data.wasSwitched) {
          updatedHistory.push({
            sender: 'opponent',
            text: `[🔄 Резервное переключение на ${data.usedModel} из-за высокой нагрузки]`
          });
        }

        if (data.guessId) {
          if (data.guessId === selectedChar?.id) {
            setGameResult({
              show: true,
              isVictory: false,
              reason: `ИИ вычислил твоего персонажа! Это действительно ${selectedChar.name}.`
            });
            setIsAiThinking(false);
            return;
          } else {
            setMessages([
              ...updatedHistory,
              { sender: 'opponent', text: `${data.answer}\n\nЯ думаю, что ты загадал ${data.guessId}... О нет, я ошибся!` }
            ]);
          }
        } else {
          setMessages([
            ...updatedHistory,
            { sender: 'opponent', text: `${data.answer}\n\nМой вопрос: ${data.aiQuestion}` }
          ]);
        }
      } catch (err) {
        setMessages([
          ...updatedHistory,
          { sender: 'opponent', text: 'Да. Мой вопрос: этот персонаж носит маску или шлем?' }
        ]);
      } finally {
        setIsAiThinking(false);
        setIsMyTurn(true);
      }
    }
  };

  const handleMakeGuess = () => {
    if (!accuseChar) return;
    const target = isAiMode ? aiSecretChar : null;

    if (target && accuseChar.id === target.id) {
      setGameResult({
        show: true,
        isVictory: true,
        reason: `Вы вычислили персонажа соперника! Это действительно ${target.name}.`
      });
      setAccuseChar(null);
    } else {
      const updatedLives = playerLives - 1;
      setPlayerLives(updatedLives);
      setEliminatedIds(prev => [...prev, accuseChar.id]);
      setAccuseChar(null);

      if (updatedLives <= 0) {
        setGameResult({
          show: true,
          isVictory: false,
          reason: `Вы потратили все 3 жизни! Соперник загадал: ${target?.name || 'секретного героя'}.`
        });
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'opponent', text: `Ты ошибся! Я загадал НЕ ${accuseChar.name}. Жизней осталось: ${updatedLives}/3.` }
        ]);
      }
    }
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
              <span className="text-[11px] font-bold leading-tight truncate max-w-[110px]">{selectedChar.name}</span>
            </div>
            <button 
              onClick={() => setInfoChar(selectedChar)}
              className="w-6 h-6 bg-white/20 border border-white/30 flex items-center justify-center active:bg-white active:text-black ml-0.5"
            >
              <Info size={11} />
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
            {selectedChar ? 'Подтвердите выбор снизу' : 'Выберите персонажа:'}
          </span>
        )}

        <div className="flex items-center gap-1.5">
          {isConfirmed && (
            <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10">
              {[1, 2, 3].map((index) => (
                <Heart
                  key={index}
                  size={13}
                  className={`transition-all duration-500 ${
                    index <= playerLives 
                      ? 'text-red-500 fill-red-500 scale-100' 
                      : 'text-neutral-600 fill-neutral-800 scale-75 opacity-30 grayscale'
                  }`}
                />
              ))}
            </div>
          )}

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black"
          >
            <Settings size={13} />
          </button>

          {/* Кнопка выхода с вызовом предупреждения */}
          <button 
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>

      {/* 2. ИГРОВОЕ ПОЛЕ 6 НА 6 */}
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

      {/* 3. НИЖНЯЯ ПАНЕЛЬ СТАРТОВОГО ПОДТВЕРЖДЕНИЯ */}
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
                ? 'ИИ думает...' 
                : isMyTurn 
                ? '● Ваш ход' 
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

      {/* 5. ПОЛНОЭКРАННОЕ ДОСЬЕ [i] С ЦЕЛЫМ ФОТО */}
      {infoChar && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)] select-none animate-in fade-in duration-200">
          <header className="flex justify-between items-center pb-3 border-b border-white/20">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">Досье персонажа</span>
              <h2 className="text-base font-black uppercase text-white truncate max-w-[260px]">{infoChar.name}</h2>
            </div>
            <button 
              onClick={() => setInfoChar(null)}
              className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center active:bg-white active:text-black"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3 my-auto">
            {/* Картинка целиком без обрезки */}
            <div className="w-full flex justify-center bg-neutral-950 border border-white/15 p-2">
              <img 
                src={infoChar.avatar} 
                alt={infoChar.name} 
                className="max-h-[38vh] w-auto object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>

            {/* Сетка примет */}
            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 bg-white/5 border border-white/10">
              <p><span className="text-neutral-400">Цвета:</span> <b className="text-white">{infoChar.traits.mainColors.join(', ')}</b></p>
              <p><span className="text-neutral-400">Шлем/Маска:</span> <b className="text-white">{infoChar.traits.hasHelmetOrMask ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Человек:</span> <b className="text-white">{infoChar.traits.isHuman ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Злодей:</span> <b className="text-white">{infoChar.traits.isVillain ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Плащ:</span> <b className="text-white">{infoChar.traits.hasCape ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Оружие:</span> <b className="text-white">{infoChar.traits.hasWeapon ? 'Да' : 'Нет'}</b></p>
              <p className="col-span-2 text-neutral-300 italic pt-1 border-t border-white/10">{infoChar.traits.notes}</p>
            </div>

            {/* Выписка из биографии */}
            <div className="p-3 bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed font-sans">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Выписка из базы данных:</span>
              {infoChar.wiki}
            </div>
          </div>

          <footer className="pt-2 border-t border-white/20">
            <button
              onClick={() => setInfoChar(null)}
              className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300"
            >
              Закрыть досье
            </button>
          </footer>
        </div>
      )}

      {/* 6. ПРЕДУПРЕЖДЕНИЕ ПЕРЕД ВЫХОДОМ В МЕНЮ */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-5 select-none animate-in fade-in duration-150">
          <div className="w-full max-w-xs bg-neutral-950 border border-white/30 p-5 flex flex-col items-center text-center gap-3 shadow-2xl">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-white">Выход из матча</h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Ваша игра уже начата. Вы уверены, что хотите выйти в главное меню? Текущий прогресс будет потерян.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full pt-2">
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onBackToMenu();
                }}
                className="w-full py-3 bg-red-600 text-white font-black text-xs uppercase tracking-wider active:bg-red-700"
              >
                Уверен
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3 bg-white/10 border border-white/20 text-neutral-300 font-bold text-xs uppercase tracking-wider active:bg-white/20"
              >
                Я передумал
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. РЕЖИМ ВЫБОРА (LONG-PRESS) */}
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
            <p className="text-[11px] text-neutral-400">
              Это секретный персонаж соперника? При ошибке сгорит 1 сердечко (осталось {playerLives}/3).
            </p>
            
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

      {/* 8. ЧАТ РАУНДА */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]">
          <div className="flex justify-between items-center pb-3 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider">Диалог с ИИ</span>
              <div className="flex items-center gap-1 pl-2">
                {[1, 2, 3].map((i) => (
                  <Heart
                    key={i}
                    size={12}
                    className={i <= playerLives ? 'text-red-500 fill-red-500' : 'text-neutral-700 fill-neutral-800'}
                  />
                ))}
              </div>
            </div>
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
                    : m.text.startsWith('[🔄')
                    ? 'mx-auto bg-amber-500/10 text-amber-300 border-amber-500/30 text-[10px]'
                    : m.text.startsWith('[DEV')
                    ? 'mr-auto bg-blue-950/40 text-blue-300 border-blue-500/40 font-mono text-[11px]'
                    : 'mr-auto bg-white/10 text-white border-white/20'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isAiThinking && (
              <div className="mr-auto p-3 text-xs bg-white/5 border border-white/10 flex items-center gap-2 text-neutral-400">
                <Loader2 size={12} className="animate-spin" />
                <span>ИИ размышляет над ходом...</span>
              </div>
            )}
          </div>

          {/* Быстрые ответы */}
          <div className="flex gap-1.5 pb-2">
            <button 
              onClick={() => { if (isMyTurn) setInputText('Да'); }}
              className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black"
            >
              Да
            </button>
            <button 
              onClick={() => { if (isMyTurn) setInputText('Нет'); }}
              className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black"
            >
              Нет
            </button>
            <button 
              onClick={() => { if (isMyTurn) setInputText('Не уверен / Частично'); }}
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
              placeholder={isAiThinking ? "ИИ думает..." : isMyTurn ? "Задайте наводящий вопрос..." : "Ожидание хода..."}
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

      {/* 9. МОДАЛКА НАСТРОЕК */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={onSelectModel}
        currentBg={currentBg}
        onSelectBg={onChangeBg}
      />

      {/* 10. МОДАЛКА РЕЗУЛЬТАТА (ПОБЕДА / ПОРАЖЕНИЕ) С ЧИСТЫМ РЕВАНШЕМ */}
      {gameResult.show && (
        <GameResultModal 
          isVictory={gameResult.isVictory}
          reason={gameResult.reason}
          playerChar={selectedChar}
          opponentChar={aiSecretChar}
          onRematch={handleFullRematch}
          onHome={onBackToMenu}
        />
      )}

    </div>
  );
};
