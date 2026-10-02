import React, { useState, useRef, useEffect } from 'react';
import { 
  Info, MessageSquare, Send, X, LogOut, Check, Loader2, Heart, 
  Settings, AlertTriangle, XCircle, RotateCcw, Copy, CheckCheck, 
  Clock, Sparkles 
} from 'lucide-react';
import { Character } from '../data/characters';
import { GameResultModal } from './GameResultModal';
import { SettingsModal, AiToneType } from './SettingsModal';
import { ConfettiEffect, ScreenCrackEffect } from './GameEffects';
import { supabase } from '../lib/supabase';

interface GameBoardProps {
  characters: Character[];
  onBackToMenu: () => void;
  isAiMode: boolean;
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  currentBg: string;
  onChangeBg: (url: string) => void;
  currentUniverse: string;
  nickname: string;
  onSaveNickname: (name: string) => void;
  aiTone: AiToneType;
  onSelectAiTone: (tone: AiToneType) => void;
  autoFilterEnabled: boolean;
  onToggleAutoFilter: (val: boolean) => void;
  multiplayerConfig?: {
    roomId: string;
    isHost: boolean;
    timerSeconds: number;
  } | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({ 
  characters, 
  onBackToMenu, 
  isAiMode,
  selectedModel,
  onSelectModel,
  currentBg,
  onChangeBg,
  currentUniverse,
  nickname,
  onSaveNickname,
  aiTone,
  onSelectAiTone,
  autoFilterEnabled,
  onToggleAutoFilter,
  multiplayerConfig
}) => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [opponentChar, setOpponentChar] = useState<Character | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [wrongAccusedIds, setWrongAccusedIds] = useState<string[]>([]);

  const [infoChar, setInfoChar] = useState<Character | null>(null);
  const [accuseChar, setAccuseChar] = useState<Character | null>(null);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  // Жизни игрока (красные) и ИИ (голубые)
  const [playerLives, setPlayerLives] = useState<number>(3);
  const [aiLives, setAiLives] = useState<number>(3);

  // Окно результата
  const [gameResult, setGameResult] = useState<{
    show: boolean;
    isVictory: boolean;
    reason: string;
  }>({ show: false, isVictory: false, reason: '' });

  // Чат
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; sender: 'you' | 'opponent'; text: string; senderName?: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [serverBusyError, setServerBusyError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isDevMode, setIsDevMode] = useState(false);

  const [opponentNickname, setOpponentNickname] = useState<string>('Соперник');
  const [timeLeft, setTimeLeft] = useState<number>(multiplayerConfig?.timerSeconds || 0);

  // Реф самого контейнера скролла сообщений (без сдвига экрана!)
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Безопасный внутренний автоскролл списка сообщений
  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollChatToBottom();
      const timer = setTimeout(scrollChatToBottom, 60);
      return () => clearTimeout(timer);
    }
  }, [isChatOpen, messages, isAiThinking]);

  // Мультиплеер сокеты
  useEffect(() => {
    if (isAiMode || !multiplayerConfig || !supabase) return;

    const roomId = multiplayerConfig.roomId;
    const isHost = multiplayerConfig.isHost;
    const myRole = isHost ? 'host' : 'guest';

    const roomChannel = supabase
      .channel(`sync_room_${roomId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
        (payload: any) => {
          const room = payload.new;

          if (isHost && room.guest_nickname) setOpponentNickname(room.guest_nickname);
          if (!isHost && room.host_nickname) setOpponentNickname(room.host_nickname);

          if (room.host_char_id && room.guest_char_id && room.status === 'playing') {
            const oppId = isHost ? room.guest_char_id : room.host_char_id;
            const oppHero = characters.find(c => c.id === oppId);
            if (oppHero) setOpponentChar(oppHero);
            setIsMyTurn(room.current_turn === myRole);
          }

          const myLives = isHost ? room.host_lives : room.guest_lives;
          setPlayerLives(myLives);

          if (room.winner) {
            const won = room.winner === myRole;
            setGameResult({
              show: true,
              isVictory: won,
              reason: room.finish_reason || (won ? 'Вы победили!' : 'Вы проиграли!')
            });
          }
        }
      )
      .subscribe();

    const messagesChannel = supabase
      .channel(`sync_msgs_${roomId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_messages', filter: `room_id=eq.${roomId}` },
        (payload: any) => {
          const msg = payload.new;
          const isMe = msg.sender === myRole;

          setMessages(prev => {
            if (prev.some(m => m.id === String(msg.id) || (m.sender === 'you' && isMe && m.text === msg.text))) {
              return prev;
            }
            return [
              ...prev,
              {
                id: String(msg.id),
                sender: isMe ? 'you' : 'opponent',
                text: msg.text || '',
                senderName: msg.sender_name
              }
            ];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(roomChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [isAiMode, multiplayerConfig, characters, isConfirmed]);

  // Таймер
  useEffect(() => {
    if (!isConfirmed || isAiMode || !multiplayerConfig?.timerSeconds) return;

    setTimeLeft(multiplayerConfig.timerSeconds);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (isMyTurn && supabase && multiplayerConfig) {
            const nextTurn = multiplayerConfig.isHost ? 'guest' : 'host';
            supabase.from('rooms').update({ current_turn: nextTurn }).eq('id', multiplayerConfig.roomId);
          }
          return multiplayerConfig.timerSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMyTurn, isConfirmed, isAiMode, multiplayerConfig]);

  // Старт одиночной игры с ИИ
  useEffect(() => {
    if (isAiMode && characters.length > 0) {
      const chosen = characters[Math.floor(Math.random() * characters.length)];
      setOpponentChar(chosen);
      setMessages([
        { id: 'init', sender: 'opponent', text: 'Я загадал персонажа! Задай свой наводящий вопрос (в формате Да/Нет).' }
      ]);
    }
  }, [isAiMode, characters]);

  // Отправка сообщений
  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = (textOverride !== undefined ? textOverride : inputText).trim();
    if (!textToSend || !isMyTurn || isAiThinking || isSendingMessage) return;

    setIsSendingMessage(true);
    setInputText('');

    const tempId = `msg_${Date.now()}`;
    const newMsgObj = { id: tempId, sender: 'you' as const, text: textToSend };
    const updatedHistory = [...messages, newMsgObj];
    setMessages(updatedHistory);

    if (isAiMode) {
      setServerBusyError(null);
      setIsMyTurn(false);

      if (opponentChar) {
        setIsAiThinking(true);
        try {
          const response = await fetch('/api/ai-turn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              aiSecretChar: opponentChar,
              charactersPool: characters,
              chatHistory: updatedHistory,
              playerQuestion: textToSend,
              preferredModel: selectedModel,
              universe: currentUniverse,
              isDevMode,
              aiTone
            })
          });

          const data = await response.json();

          if (response.status === 503 || data.isBusy) {
            setServerBusyError(data.error || 'Серверы перегружены.');
            setIsAiThinking(false);
            setIsMyTurn(true);
            setIsSendingMessage(false);
            return;
          }

          if (data.toggledDevMode !== undefined) {
            setIsDevMode(data.toggledDevMode);
          }

          if (data.eliminatedCandidateIds && Array.isArray(data.eliminatedCandidateIds)) {
            setEliminatedIds(prev => Array.from(new Set([...prev, ...data.eliminatedCandidateIds])));
          }

          if (data.guessId) {
            if (data.guessId === selectedChar?.id) {
              setGameResult({
                show: true,
                isVictory: false,
                reason: `ИИ вычислил твоего персонажа! Это ${selectedChar.name}.`
              });
              setIsAiThinking(false);
              setIsSendingMessage(false);
              return;
            } else {
              setAiLives(prev => {
                const nextLives = prev - 1;
                if (nextLives <= 0) {
                  setGameResult({
                    show: true,
                    isVictory: true,
                    reason: `ИИ ошибся 3 раза и потерял все жизни! Победа за вами!`
                  });
                }
                return Math.max(0, nextLives);
              });

              setMessages(prev => [
                ...prev,
                { id: `ai_${Date.now()}`, sender: 'opponent', text: `${data.answer || ''}\n\nЯ думаю, что ты загадал ${data.guessId}... О нет, я ошибся!` }
              ]);
            }
          } else {
            const replyText = data.aiQuestion 
              ? `${data.answer || ''}\n\nМой вопрос: ${data.aiQuestion}` 
              : (data.answer || '');

            setMessages(prev => [...prev, { id: `ai_${Date.now()}`, sender: 'opponent', text: replyText }]);
          }
        } catch (err: any) {
          setServerBusyError('Ошибка соединения с сервером.');
        } finally {
          setIsAiThinking(false);
          setIsMyTurn(true);
          setIsSendingMessage(false);
        }
      }
    } else {
      if (!supabase || !multiplayerConfig) {
        setIsSendingMessage(false);
        return;
      }

      const myRole = multiplayerConfig.isHost ? 'host' : 'guest';
      const nextRole = multiplayerConfig.isHost ? 'guest' : 'host';

      try {
        const { error: msgErr } = await supabase.from('room_messages').insert({
          room_id: multiplayerConfig.roomId,
          sender: myRole,
          sender_name: nickname,
          text: textToSend
        });

        if (msgErr) throw msgErr;

        await supabase.from('rooms').update({
          current_turn: nextRole
        }).eq('id', multiplayerConfig.roomId);

        setIsMyTurn(false);
      } catch (e: any) {
        alert('Не удалось отправить сообщение. Попробуйте еще раз.');
        setMessages(prev => prev.filter(m => m.id !== tempId));
      } finally {
        setIsSendingMessage(false);
      }
    }
  };

  const handleFullRematch = async () => {
    setGameResult({ show: false, isVictory: false, reason: '' });
    setSelectedChar(null);
    setIsConfirmed(false);
    setEliminatedIds([]);
    setWrongAccusedIds([]);
    setPlayerLives(3);
    setAiLives(3);
    setIsChatOpen(false);
    setInputText('');
    setIsMyTurn(true);
    setIsAiThinking(false);
    setServerBusyError(null);
    setIsDevMode(false);

    if (isAiMode) {
      const chosen = characters[Math.floor(Math.random() * characters.length)];
      setOpponentChar(chosen);
      setMessages([
        { id: 'init', sender: 'opponent', text: 'Новая игра! Задай свой наводящий вопрос (в формате Да/Нет).' }
      ]);
    } else if (multiplayerConfig && supabase) {
      await supabase.from('rooms').update({
        host_char_id: null,
        guest_char_id: null,
        status: 'picking',
        host_lives: 3,
        guest_lives: 3,
        winner: null,
        finish_reason: null,
        current_turn: 'host'
      }).eq('id', multiplayerConfig.roomId);
    }
  };

  const handleMakeGuess = async () => {
    if (!accuseChar) return;

    if (isAiMode) {
      if (opponentChar && accuseChar.id === opponentChar.id) {
        setGameResult({
          show: true,
          isVictory: true,
          reason: `Вы вычислили персонажа соперника! Это действительно ${opponentChar.name}.`
        });
        setAccuseChar(null);
      } else {
        const updatedLives = playerLives - 1;
        setPlayerLives(updatedLives);
        setWrongAccusedIds(prev => [...prev, accuseChar.id]);
        setAccuseChar(null);

        if (updatedLives <= 0) {
          setGameResult({
            show: true,
            isVictory: false,
            reason: `Вы потратили все 3 жизни! Соперник загадал: ${opponentChar?.name || 'секретного героя'}.`
          });
        } else {
          setMessages(prev => [
            ...prev,
            { id: `err_${Date.now()}`, sender: 'opponent', text: `Ты ошибся! Это не ${accuseChar.name}. Твоих жизней осталось: ${updatedLives}/3.` }
          ]);
        }
      }
    } else {
      if (!supabase || !multiplayerConfig) return;
      const myRole = multiplayerConfig.isHost ? 'host' : 'guest';
      const enemyRole = multiplayerConfig.isHost ? 'guest' : 'host';

      const { data: room } = await supabase.from('rooms').select('*').eq('id', multiplayerConfig.roomId).single();
      const enemySecretId = multiplayerConfig.isHost ? room.guest_char_id : room.host_char_id;

      if (accuseChar.id === enemySecretId) {
        await supabase.from('rooms').update({
          winner: myRole,
          finish_reason: `Игрок ${nickname} верно угадал персонажа ${accuseChar.name}!`
        }).eq('id', multiplayerConfig.roomId);
      } else {
        const currentLives = myRole === 'host' ? room.host_lives : room.guest_lives;
        const newLives = currentLives - 1;
        const livesField = myRole === 'host' ? 'host_lives' : 'guest_lives';
        setWrongAccusedIds(prev => [...prev, accuseChar.id]);

        if (newLives <= 0) {
          await supabase.from('rooms').update({
            [livesField]: 0,
            winner: enemyRole,
            finish_reason: `У игрока ${nickname} закончились все 3 жизни!`
          }).eq('id', multiplayerConfig.roomId);
        } else {
          await supabase.from('rooms').update({ [livesField]: newLives }).eq('id', multiplayerConfig.roomId);
        }
      }
      setAccuseChar(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-black text-white select-none transition-colors duration-300">
      
      {/* ЭФФЕКТЫ: Конфетти при триумфе или раскол стекла при поражении */}
      {gameResult.show && gameResult.isVictory && <ConfettiEffect />}
      {gameResult.show && !gameResult.isVictory && <ScreenCrackEffect />}

      {/* 1. ВЕРХНИЙ БАР */}
      <div className="w-full pt-[max(env(safe-area-inset-top),14px)] pb-2 px-3 bg-black/85 backdrop-blur-xl border-b border-white/20 z-20 flex items-center justify-between shrink-0 transition-all">
        {isConfirmed && selectedChar ? (
          <div className="flex items-center gap-2">
            <img 
              src={selectedChar.avatar} 
              alt={selectedChar.name} 
              className="w-8 h-8 object-cover border border-white transition-transform active:scale-95"
            />
            <div className="flex flex-col">
              <span className="text-[8px] text-neutral-400 font-semibold uppercase">Твой герой:</span>
              <span className="text-[11px] font-bold leading-tight truncate max-w-[95px]">{selectedChar.name}</span>
            </div>
            <button 
              onClick={() => {
                setAccuseChar(null);
                setInfoChar(selectedChar);
              }}
              className="w-6 h-6 bg-white/20 border border-white/30 flex items-center justify-center active:bg-white active:text-black ml-0.5 transition-all"
            >
              <Info size={11} />
            </button>
          </div>
        ) : (
          <span className="text-[11px] font-black uppercase tracking-wider text-neutral-300">
            {selectedChar ? 'Подтвердите выбор' : 'Выберите персонажа:'}
          </span>
        )}

        <div className="flex items-center gap-1.5">
          {autoFilterEnabled && isConfirmed && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <Sparkles size={10} />
              АВТО
            </span>
          )}

          {isConfirmed && (
            <div className="flex items-center gap-1 px-1.5 py-1 bg-white/5 border border-white/10">
              {[1, 2, 3].map(i => (
                <Heart
                  key={i}
                  size={12}
                  className={`transition-all duration-300 ${
                    i <= playerLives 
                      ? 'text-red-500 fill-red-500 scale-100' 
                      : 'text-neutral-700 fill-neutral-900 scale-75 opacity-25'
                  }`}
                />
              ))}
            </div>
          )}

          {isConfirmed && isAiMode && (
            <div className="flex items-center gap-1 px-1.5 py-1 bg-sky-950/30 border border-sky-500/20">
              {[1, 2, 3].map(i => (
                <Heart
                  key={i}
                  size={12}
                  className={`transition-all duration-300 ${
                    i <= aiLives 
                      ? 'text-sky-400 fill-sky-400 scale-100' 
                      : 'text-neutral-700 fill-neutral-900 scale-75 opacity-25'
                  }`}
                />
              ))}
            </div>
          )}

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black transition-all"
          >
            <Settings size={13} />
          </button>

          <button 
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 bg-white/10 border border-white/20 flex items-center justify-center text-neutral-300 active:bg-white active:text-black transition-all"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>

      {/* 2. ИГРОВОЕ ПОЛЕ 6 НА 6 */}
      <div className={`w-full flex-1 px-1.5 py-1 flex items-center justify-center min-h-0 overflow-hidden transition-all duration-300 ${accuseChar ? 'blur-md scale-[0.98]' : ''}`}>
        <div className="w-full grid grid-cols-6 gap-1 max-w-sm place-content-center">
          {characters.map(char => {
            const isWrong = wrongAccusedIds.includes(char.id);
            const isEliminated = eliminatedIds.includes(char.id);
            const isCurrentSelected = selectedChar?.id === char.id;

            return (
              <div
                key={char.id}
                onClick={() => {
                  if (wrongAccusedIds.includes(char.id)) return;
                  if (!isConfirmed) setSelectedChar(char);
                  else setEliminatedIds(prev => prev.includes(char.id) ? prev.filter(id => id !== char.id) : [...prev, char.id]);
                }}
                onTouchStart={() => {
                  if (!isConfirmed || wrongAccusedIds.includes(char.id)) return;
                  longPressTimer.current = setTimeout(() => setAccuseChar(char), 450);
                }}
                onTouchEnd={() => { if (longPressTimer.current) clearTimeout(longPressTimer.current); }}
                onMouseDown={() => {
                  if (!isConfirmed || wrongAccusedIds.includes(char.id)) return;
                  longPressTimer.current = setTimeout(() => setAccuseChar(char), 450);
                }}
                onMouseUp={() => { if (longPressTimer.current) clearTimeout(longPressTimer.current); }}
                className={`relative aspect-square w-full border transition-all duration-300 ease-out flex flex-col justify-end p-0.5 overflow-hidden ${
                  !isConfirmed && isCurrentSelected
                    ? 'border-white ring-2 ring-white scale-95 shadow-[0_0_15px_white] z-10'
                    : isWrong
                    ? 'border-red-600 bg-red-950/70 ring-2 ring-red-600 opacity-80 cursor-not-allowed'
                    : isEliminated
                    ? 'opacity-20 grayscale border-transparent bg-neutral-950 scale-95'
                    : 'border-white/25 hover:scale-[1.02] active:scale-90 bg-neutral-900'
                }`}
              >
                <img 
                  src={char.avatar} 
                  alt={char.name} 
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-300 ${isWrong ? 'sepia saturate-200 hue-rotate-[320deg]' : ''}`}
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />

                {isWrong && (
                  <div className="absolute top-1 right-1 z-20 text-red-500 bg-black/90 p-0.5 border border-red-500/50 animate-pulse">
                    <XCircle size={10} />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                <span className={`relative z-10 text-[6.5px] font-black uppercase text-center leading-none truncate drop-shadow transition-colors ${isWrong ? 'text-red-400' : 'text-white'}`}>
                  {char.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. СТАРТОВОЕ ПОДТВЕРЖДЕНИЕ ВЫБОРА (БЕЗ СЕЙФ-ЗОНЫ СНИЗУ) */}
      {!isConfirmed && (
        <div className="shrink-0 w-full bg-black/95 border-t border-white/20 p-3 pb-3 flex flex-col gap-2 z-20 animate-in slide-in-from-bottom duration-300">
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
                  onClick={() => {
                    setAccuseChar(null);
                    setInfoChar(selectedChar);
                  }}
                  className="p-1.5 bg-white/10 border border-white/20 shrink-0 text-neutral-300 ml-2 active:bg-white active:text-black transition-colors"
                >
                  <Info size={13} />
                </button>
              </div>
              <button
                onClick={() => {
                  if (isAiMode) setIsConfirmed(true);
                  else {
                    if (supabase && multiplayerConfig) {
                      const f = multiplayerConfig.isHost ? 'host_char_id' : 'guest_char_id';
                      supabase.from('rooms').update({ [f]: selectedChar.id }).eq('id', multiplayerConfig.roomId);
                    }
                    setIsConfirmed(true);
                  }
                }}
                className="w-full py-3 bg-white text-black font-black text-xs active:bg-neutral-300 transition-transform active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Check size={14} />
                Подтвердить выбор
              </button>
            </>
          ) : (
            <p className="text-[11px] text-center text-neutral-400 py-2">
              Нажмите на любого персонажа выше
            </p>
          )}
        </div>
      )}

      {/* 4. НИЖНЯЯ ПАНЕЛЬ ХОДА (БЕЗ СЕЙФ-ЗОНЫ СНИЗУ) */}
      {isConfirmed && (
        <div className="shrink-0 px-3 pt-2 pb-2 bg-black/90 backdrop-blur-md border-t border-white/20 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
              {isAiMode ? (
                isAiThinking ? 'ИИ думает...' : isDevMode ? 'DEV UNLOCKED' : isMyTurn ? '● Ваш ход' : '○ Ход соперника...'
              ) : (
                isMyTurn ? `● Ваш ход (${nickname})` : `○ Ход соперника (${opponentNickname})...`
              )}
            </span>
            {isAiThinking && <Loader2 size={12} className="animate-spin text-white" />}
          </div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-10 h-10 bg-white text-black border border-white flex items-center justify-center active:scale-95 transition-all relative shadow-lg"
          >
            <MessageSquare size={16} />
            {isMyTurn && !isAiThinking && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 animate-pulse" />
            )}
          </button>
        </div>
      )}

      {/* 5. ПОЛНОЭКРАННОЕ ДОСЬЕ [i] (ТОЛЬКО КНОПКА СНИЗУ) */}
      {infoChar && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-3 select-none animate-in fade-in duration-300">
          <header className="pb-3 border-b border-white/20">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">Досье персонажа</span>
            <h2 className="text-base font-black uppercase text-white truncate max-w-full">{infoChar.name}</h2>
          </header>

          <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3 my-auto">
            <div className="w-full flex justify-center bg-neutral-950 border border-white/15 p-2">
              <img 
                src={infoChar.avatar} 
                alt={infoChar.name} 
                className="max-h-[38vh] w-auto object-contain transition-transform"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] p-3 bg-white/5 border border-white/10">
              <p><span className="text-neutral-400">Раса / Вид:</span> <b className="text-white">{infoChar.traits.race}</b></p>
              <p><span className="text-neutral-400">Фракция:</span> <b className="text-white">{infoChar.traits.fraction}</b></p>
              <p><span className="text-neutral-400">Шлем/Маска:</span> <b className="text-white">{infoChar.traits.hasHelmetOrMask ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Плащ:</span> <b className="text-white">{infoChar.traits.hasCape ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Оружие:</span> <b className="text-white">{infoChar.traits.hasWeapon ? 'Да' : 'Нет'}</b></p>
              <p><span className="text-neutral-400">Борода / Усы:</span> <b className="text-white">{infoChar.traits.hasBeard ? 'Да' : 'Нет'}</b></p>
              <p className="col-span-2"><span className="text-neutral-400">Цвета:</span> <b className="text-white">{infoChar.traits.mainColors.join(', ')}</b></p>
              <p className="col-span-2 border-t border-white/10 pt-1.5"><span className="text-neutral-400">Силы:</span> <b className="text-neutral-200">{infoChar.traits.powers}</b></p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed font-sans">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Архивная выписка:</span>
              {infoChar.wiki}
            </div>
          </div>

          <footer className="pt-2 border-t border-white/20">
            <button
              onClick={() => setInfoChar(null)}
              className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-wider active:bg-neutral-300 transition-colors"
            >
              Закрыть досье
            </button>
          </footer>
        </div>
      )}

      {/* 6. ПРЕДУПРЕЖДЕНИЕ ПРИ ВЫХОДЕ */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-5 select-none animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-neutral-950 border border-white/30 p-5 flex flex-col items-center text-center gap-3 shadow-2xl">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-white">Выход из матча</h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Ваша игра уже начата, вы уверены что хотите выйти? Прогресс раунда будет сброшен.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full pt-2">
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onBackToMenu();
                }}
                className="w-full py-3 bg-red-600 text-white font-black text-xs uppercase tracking-wider active:bg-red-700 transition-colors"
              >
                Уверен
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="w-full py-3 bg-white/10 border border-white/20 text-neutral-300 font-bold text-xs uppercase tracking-wider active:bg-white/20 transition-colors"
              >
                Я передумал
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ОКНО УГАДЫВАНИЯ С КНОПКОЙ [i] */}
      {accuseChar && (
        <div 
          onClick={() => setAccuseChar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs bg-black border border-white/40 p-5 flex flex-col items-center gap-3 text-center shadow-2xl"
          >
            <div className="relative">
              <img 
                src={accuseChar.avatar} 
                alt={accuseChar.name} 
                className="w-24 h-24 object-cover border border-white"
              />
              <button
                onClick={() => {
                  const target = accuseChar;
                  setAccuseChar(null);
                  setInfoChar(target);
                }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-white text-black font-black border border-black flex items-center justify-center shadow-md active:bg-neutral-300 transition-colors"
              >
                <Info size={14} />
              </button>
            </div>

            <h4 className="text-sm font-black uppercase">{accuseChar.name}</h4>
            <p className="text-[11px] text-neutral-400">
              Это секретный персонаж соперника? При ошибке персонаж станет красным и сгорит 1 сердечко ({playerLives}/3).
            </p>
            
            <div className="flex gap-2 w-full pt-1">
              <button
                onClick={() => setAccuseChar(null)}
                className="flex-1 py-3 bg-white/10 border border-white/20 text-xs font-bold transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleMakeGuess}
                className="flex-1 py-3 bg-white text-black text-xs font-black uppercase transition-colors"
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. ИСПРАВЛЕННЫЙ ЧАТ: БЕЗ ВЫЛЕТОВ И БЕЗ БАГОВ СКРОЛЛА SAFARI */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] bg-neutral-950 text-white flex flex-col justify-between p-4 pt-[max(env(safe-area-inset-top),16px)] pb-3">
          
          {/* Шапка чата с крестиком закрытия */}
          <div className="flex justify-between items-center pb-3 border-b border-white/20 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                {isAiMode ? 'Диалог с ИИ' : `Дуэль: ${nickname} vs ${opponentNickname}`}
              </span>
              {isDevMode && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  DEV
                </span>
              )}
              <div className="flex items-center gap-1 pl-2">
                {[1, 2, 3].map(i => (
                  <Heart
                    key={i}
                    size={12}
                    className={i <= playerLives ? 'text-red-500 fill-red-500' : 'text-neutral-700 fill-neutral-800'}
                  />
                ))}
              </div>
            </div>
            
            {/* Рабочая кнопка выхода из чата */}
            <button 
              type="button"
              onClick={() => setIsChatOpen(false)}
              className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center active:bg-white active:text-black transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Контейнер сообщений: внутренний скролл, не трогающий экран iPhone */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5 min-h-0"
          >
            {messages.map((m, idx) => {
              const msgText = m.text || '';
              return (
                <div 
                  key={m.id || idx} 
                  className={`group relative max-w-[85%] p-3 text-xs leading-relaxed border whitespace-pre-line transition-all ${
                    m.sender === 'you' 
                      ? 'ml-auto bg-white text-black border-white font-medium' 
                      : msgText.startsWith('[Резерв')
                      ? 'mx-auto bg-amber-500/10 text-amber-300 border-amber-500/30 text-[10px]'
                      : msgText.startsWith('[DEV')
                      ? 'mr-auto bg-blue-950/40 text-blue-300 border-blue-500/40 font-mono text-[11px]'
                      : 'mr-auto bg-white/10 text-white border-white/20'
                  }`}
                >
                  {!isAiMode && m.senderName && (
                    <span className="block text-[9px] font-mono opacity-50 uppercase mb-1">
                      {m.senderName}
                    </span>
                  )}
                  {msgText}

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(msgText);
                      setCopiedIndex(idx);
                      setTimeout(() => setCopiedIndex(null), 1500);
                    }}
                    className={`mt-1.5 pt-1 border-t flex items-center gap-1 text-[9px] font-mono opacity-60 hover:opacity-100 ${
                      m.sender === 'you' ? 'border-black/20 text-black' : 'border-white/20 text-neutral-400'
                    }`}
                  >
                    {copiedIndex === idx ? <CheckCheck size={11} /> : <Copy size={11} />}
                    <span>{copiedIndex === idx ? 'Скопировано' : 'Копировать'}</span>
                  </button>
                </div>
              );
            })}

            {isAiThinking && (
              <div className="mr-auto p-3 text-xs bg-white/5 border border-white/10 flex items-center gap-2 text-neutral-400 animate-pulse">
                <Loader2 size={12} className="animate-spin" />
                <span>ИИ размышляет над ходом...</span>
              </div>
            )}

            {serverBusyError && (
              <div className="p-3 bg-red-950/40 border border-red-500/40 flex flex-col gap-2 text-xs text-red-300">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-400 shrink-0" />
                  <span>{serverBusyError}</span>
                </div>
                <button
                  onClick={() => {
                    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'you')?.text;
                    if (lastUserMsg) handleSendMessage(lastUserMsg);
                  }}
                  className="py-2 bg-white text-black font-black text-[10px] uppercase flex items-center justify-center gap-1.5 active:bg-neutral-300 transition-colors"
                >
                  <RotateCcw size={12} />
                  Повторить попытку
                </button>
              </div>
            )}
          </div>

          {/* Нижняя часть чата: кнопки быстрых ответов и ввод */}
          <div className="shrink-0 flex flex-col gap-2 pt-2 border-t border-white/20">
            <div className="flex gap-1.5">
              <button 
                type="button"
                onClick={() => handleSendMessage('Да')}
                disabled={!isMyTurn || isAiThinking || isSendingMessage}
                className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black disabled:opacity-30 transition-colors"
              >
                Да
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage('Нет')}
                disabled={!isMyTurn || isAiThinking || isSendingMessage}
                className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black disabled:opacity-30 transition-colors"
              >
                Нет
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage('Не уверен / Частично')}
                disabled={!isMyTurn || isAiThinking || isSendingMessage}
                className="flex-1 py-1.5 bg-white/10 border border-white/20 text-[10px] font-bold uppercase active:bg-white active:text-black disabled:opacity-30 transition-colors"
              >
                Частично
              </button>
            </div>

            <div className="flex gap-1.5">
              <input 
                type="text"
                value={inputText}
                disabled={!isMyTurn || isAiThinking || isSendingMessage}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isAiThinking ? "ИИ думает..." : "Задайте наводящий вопрос..."}
                className="flex-1 bg-white/10 border border-white/30 px-3 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!isMyTurn || !inputText.trim() || isAiThinking || isSendingMessage}
                className="px-4 py-3 bg-white text-black font-black text-xs active:bg-neutral-300 disabled:opacity-30 flex items-center justify-center transition-all"
              >
                <Send size={14} />
              </button>
            </div>
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
        nickname={nickname}
        onSaveNickname={onSaveNickname}
        aiTone={aiTone}
        onSelectAiTone={onSelectAiTone}
        autoFilterEnabled={autoFilterEnabled}
        onToggleAutoFilter={onToggleAutoFilter}
      />

      {/* 10. МОДАЛКА РЕЗУЛЬТАТА */}
      {gameResult.show && (
        <GameResultModal 
          isVictory={gameResult.isVictory}
          reason={gameResult.reason}
          playerChar={selectedChar}
          opponentChar={opponentChar}
          onRematch={handleFullRematch}
          onHome={onBackToMenu}
        />
      )}

    </div>
  );
};

export default GameBoard;
