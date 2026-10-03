import React, { useState, useEffect } from 'react';
import { SplashScreen } from '../ui/SplashScreen';
import { MainMenu } from '../ui/MainMenu';
import { GameBoard } from '../ui/GameBoard';
import { TransitionLoader } from '../ui/TransitionLoader';
import { LobbyRoomModal } from '../ui/LobbyRoomModal';
import { Character, CHARACTERS_DB, getRandom36, UniverseType } from '../data/characters';
import { AiToneType } from '../ui/SettingsModal';
import { supabase } from '../lib/supabase';

const generateRandomNick = () => {
  const prefixes = ['Hero', 'Shadow', 'Viper', 'Ghost', 'Rogue', 'Falcon', 'Nova', 'Titan'];
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(Math.random() * 90 + 10);
  return `${p}${num}`;
};

export const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'lobby' | 'playing'>('menu');
  const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
  const [activeUniverse, setActiveUniverse] = useState<string>('all');
  const [isAiMode, setIsAiMode] = useState(false);

  // Мультиплеер
  const [multiConfig, setMultiConfig] = useState<{
    roomId: string;
    isHost: boolean;
    hostNickname: string;
    guestNickname: string | null;
    themes: string[];
    timerSeconds: number;
  } | null>(null);

  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('wtc_nickname') || generateRandomNick();
  });

  const handleSaveNickname = (name: string) => {
    setNickname(name);
    localStorage.setItem('wtc_nickname', name);
  };

  const [aiTone, setAiTone] = useState<AiToneType>(() => {
    return (localStorage.getItem('wtc_ai_tone') as AiToneType) || 'standard';
  });

  const handleSelectAiTone = (tone: AiToneType) => {
    setAiTone(tone);
    localStorage.setItem('wtc_ai_tone', tone);
  };

  const [autoFilterEnabled, setAutoFilterEnabled] = useState<boolean>(() => {
    return localStorage.getItem('wtc_autofilter') === 'true';
  });

  const handleToggleAutoFilter = (val: boolean) => {
    setAutoFilterEnabled(val);
    localStorage.setItem('wtc_autofilter', String(val));
  };

  const [selectedModel, setSelectedModel] = useState<string>('gemini-1.5-flash-8b');

  const [backgroundUrl, setBackgroundUrl] = useState<string>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
  );

  const startSinglePlayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setActiveUniverse(universe);
    setIsAiMode(true);
    setMultiConfig(null);
    setIsTransitioning(true);
  };

  const startMultiplayer = async (config: {
    roomId: string;
    themes: UniverseType[];
    timerSeconds: number;
    password?: string;
    isHost: boolean;
  }) => {
    if (!supabase) {
      alert('Ошибка: Supabase не подключен.');
      return;
    }

    if (config.isHost) {
      let pool = CHARACTERS_DB;
      if (!config.themes.includes('all')) {
        pool = CHARACTERS_DB.filter(c => config.themes.includes(c.universe));
      }
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected36 = shuffled.slice(0, 36);

      const { error } = await supabase.from('rooms').insert({
        id: config.roomId,
        host_nickname: nickname,
        password: config.password || null,
        themes: config.themes,
        timer_seconds: config.timerSeconds,
        characters: selected36,
        status: 'waiting',
        current_turn: 'host',
        host_lives: 3,
        guest_lives: 3,
        host_char_id: null,
        guest_char_id: null
      });

      if (error) {
        alert(`Не удалось создать комнату: ${error.message}`);
        return;
      }

      setActiveCharacters(selected36);
      setActiveUniverse(config.themes.join('+'));
      setIsAiMode(false);

      setMultiConfig({
        roomId: config.roomId,
        isHost: true,
        hostNickname: nickname,
        guestNickname: null,
        themes: config.themes,
        timerSeconds: config.timerSeconds
      });

      setGameState('lobby');
    } else {
      const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', config.roomId)
        .single();

      if (error || !room) {
        alert('Комната с таким кодом не найдена!');
        return;
      }

      if (room.password && room.password !== config.password) {
        alert('Неверный пароль комнаты!');
        return;
      }

      if (room.guest_nickname && room.guest_nickname !== nickname) {
        alert('В этой комнате уже играют двое!');
        return;
      }

      await supabase
        .from('rooms')
        .update({ guest_nickname: nickname })
        .eq('id', config.roomId);

      setActiveCharacters(room.characters);
      setActiveUniverse(room.themes ? room.themes.join('+') : 'all');
      setIsAiMode(false);

      setMultiConfig({
        roomId: config.roomId,
        isHost: false,
        hostNickname: room.host_nickname,
        guestNickname: nickname,
        themes: room.themes || ['all'],
        timerSeconds: room.timer_seconds || 0
      });

      setGameState('lobby');
    }
  };

  // Прослушка перехода из лобби к выбору героев
  useEffect(() => {
    if (gameState !== 'lobby' || !multiConfig || !supabase) return;

    const channel = supabase
      .channel(`lobby_events_${multiConfig.roomId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'rooms', filter: `id=eq.${multiConfig.roomId}` },
        (payload: any) => {
          const r = payload.new;
          if (r.guest_nickname) {
            setMultiConfig(prev => prev ? { ...prev, guestNickname: r.guest_nickname } : null);
          }

          // Хост нажал «К выбору персонажей» -> статус стал picking
          if (r.status === 'picking') {
            setGameState('playing');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameState, multiConfig]);

  const handleHostStartPicking = async () => {
    if (!multiConfig || !supabase) return;
    await supabase.from('rooms').update({ status: 'picking' }).eq('id', multiConfig.roomId);
    setGameState('playing');
  };

  const handleLeaveLobby = async () => {
    if (multiConfig && supabase) {
      if (multiConfig.isHost) {
        await supabase.from('rooms').delete().eq('id', multiConfig.roomId);
      } else {
        await supabase.from('rooms').update({ guest_nickname: null }).eq('id', multiConfig.roomId);
      }
    }
    setMultiConfig(null);
    setGameState('menu');
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans transition-all">
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 blur-[2px] scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url("${backgroundUrl}")` }}
        />
      )}

      {isAppLoading && <SplashScreen onLoaded={() => setIsAppLoading(false)} />}

      {isTransitioning && (
        <TransitionLoader 
          characters={activeCharacters}
          onComplete={() => {
            setIsTransitioning(false);
            setGameState('playing');
          }}
        />
      )}

      {!isAppLoading && !isTransitioning && gameState === 'menu' && (
        <MainMenu 
          onStartSingle={startSinglePlayer}
          onStartMulti={startMultiplayer}
          currentBg={backgroundUrl}
          onChangeBg={setBackgroundUrl}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          nickname={nickname}
          onSaveNickname={handleSaveNickname}
          aiTone={aiTone}
          onSelectAiTone={handleSelectAiTone}
          autoFilterEnabled={autoFilterEnabled}
          onToggleAutoFilter={handleToggleAutoFilter}
        />
      )}

      {!isAppLoading && gameState === 'lobby' && multiConfig && (
        <LobbyRoomModal
          roomId={multiConfig.roomId}
          isHost={multiConfig.isHost}
          hostNickname={multiConfig.hostNickname}
          guestNickname={multiConfig.guestNickname}
          themes={multiConfig.themes}
          timerSeconds={multiConfig.timerSeconds}
          onProceedToGame={handleHostStartPicking}
          onLeaveRoom={handleLeaveLobby}
        />
      )}

      {!isAppLoading && !isTransitioning && gameState === 'playing' && (
        <GameBoard 
          characters={activeCharacters}
          isAiMode={isAiMode}
          onBackToMenu={() => {
            setMultiConfig(null);
            setGameState('menu');
          }}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          currentBg={backgroundUrl}
          onChangeBg={setBackgroundUrl}
          currentUniverse={activeUniverse}
          nickname={nickname}
          onSaveNickname={handleSaveNickname}
          aiTone={aiTone}
          onSelectAiTone={handleSelectAiTone}
          autoFilterEnabled={autoFilterEnabled}
          onToggleAutoFilter={handleToggleAutoFilter}
          multiplayerConfig={multiConfig}
        />
      )}
    </main>
  );
};

export default App;
