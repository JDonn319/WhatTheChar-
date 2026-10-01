import React, { useState } from 'react';
import { SplashScreen } from '../ui/SplashScreen';
import { MainMenu } from '../ui/MainMenu';
import { GameBoard } from '../ui/GameBoard';
import { TransitionLoader } from '../ui/TransitionLoader';
import { Character, CHARACTERS_DB, getRandom36, UniverseType } from '../data/characters';
import { AiToneType } from '../ui/SettingsModal';
import { supabase } from '../lib/supabase';

// Генерация случайного ника (латиница + до 2 цифр)
const generateRandomNick = () => {
  const prefixes = ['Hero', 'Shadow', 'Viper', 'Ghost', 'Rogue', 'Falcon', 'Nova', 'Titan'];
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const num = Math.floor(Math.random() * 90 + 10);
  return `${p}${num}`;
};

export const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
  const [activeUniverse, setActiveUniverse] = useState<string>('all');
  const [isAiMode, setIsAiMode] = useState(false);

  // Мультиплеерные данные
  const [multiplayerConfig, setMultiplayerConfig] = useState<{
    roomId: string;
    isHost: boolean;
    timerSeconds: number;
  } | null>(null);

  // Никнейм
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('wtc_nickname') || generateRandomNick();
  });

  const handleSaveNickname = (name: string) => {
    setNickname(name);
    localStorage.setItem('wtc_nickname', name);
  };

  // Тон ИИ
  const [aiTone, setAiTone] = useState<AiToneType>(() => {
    return (localStorage.getItem('wtc_ai_tone') as AiToneType) || 'standard';
  });

  const handleSelectAiTone = (tone: AiToneType) => {
    setAiTone(tone);
    localStorage.setItem('wtc_ai_tone', tone);
  };

  // Модель ИИ
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.1-flash-lite');

  // Фон
  const [backgroundUrl, setBackgroundUrl] = useState<string>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
  );

  // Старт одиночной игры с ИИ
  const startSinglePlayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setActiveUniverse(universe);
    setIsAiMode(true);
    setMultiplayerConfig(null);
    setIsTransitioning(true);
  };

  // Старт онлайн-комнаты на двоих
  const startMultiplayer = async (config: {
    roomId: string;
    themes: UniverseType[];
    timerSeconds: number;
    password?: string;
    isHost: boolean;
  }) => {
    if (!supabase) {
      alert('Ошибка: Supabase не подключен. Проверьте переменные VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY на Vercel.');
      return;
    }

    if (config.isHost) {
      // 1. ХОСТ: формирует 36 персонажей и создает запись комнаты в базе
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
        guest_lives: 3
      });

      if (error) {
        alert(`Не удалось создать комнату: ${error.message}`);
        return;
      }

      setActiveCharacters(selected36);
      setActiveUniverse(config.themes.join('+'));
      setIsAiMode(false);
      setMultiplayerConfig({
        roomId: config.roomId,
        isHost: true,
        timerSeconds: config.timerSeconds
      });
      setIsTransitioning(true);

    } else {
      // 2. ГОСТЬ: находит комнату по коду и забирает те же 36 персонажей
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

      // Присоединяемся
      await supabase
        .from('rooms')
        .update({
          guest_nickname: nickname,
          status: 'picking'
        })
        .eq('id', config.roomId);

      setActiveCharacters(room.characters);
      setActiveUniverse(room.themes ? room.themes.join('+') : 'all');
      setIsAiMode(false);
      setMultiplayerConfig({
        roomId: config.roomId,
        isHost: false,
        timerSeconds: room.timer_seconds || 0
      });
      setIsTransitioning(true);
    }
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans">
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 blur-[2px] scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url("${backgroundUrl}")` }}
        />
      )}

      {/* Загрузка PWA */}
      {isAppLoading && (
        <SplashScreen onLoaded={() => setIsAppLoading(false)} />
      )}

      {/* Кэширование картинок перед матчем */}
      {isTransitioning && (
        <TransitionLoader 
          characters={activeCharacters}
          onComplete={() => {
            setIsTransitioning(false);
            setGameState('playing');
          }}
        />
      )}

      {/* Главное меню */}
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
        />
      )}

      {/* Игровое поле (Одиночное или Мультиплеер) */}
      {!isAppLoading && !isTransitioning && gameState === 'playing' && (
        <GameBoard 
          characters={activeCharacters}
          isAiMode={isAiMode}
          onBackToMenu={() => {
            setMultiplayerConfig(null);
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
          multiplayerConfig={multiplayerConfig}
        />
      )}
    </main>
  );
};

export default App;
