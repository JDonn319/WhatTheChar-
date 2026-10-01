import React, { useState, useEffect } from 'react';
import { SplashScreen } from '../ui/SplashScreen';
import { MainMenu } from '../ui/MainMenu';
import { GameBoard } from '../ui/GameBoard';
import { TransitionLoader } from '../ui/TransitionLoader';
import { Character, CHARACTERS_DB, getRandom36, UniverseType } from '../data/characters';
import { AiToneType } from '../ui/SettingsModal';

// Генерация рандомного ника по правилам (до 8 латинских букв + до 2 цифр)
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

  // Никнейм
  const [nickname, setNickname] = useState<string>(() => {
    return localStorage.getItem('wtc_nickname') || generateRandomNick();
  });

  const handleSaveNickname = (name: string) => {
    setNickname(name);
    localStorage.setItem('wtc_nickname', name);
  };

  // Тон ИИ (стандартный, саркастичный, расшатанный)
  const [aiTone, setAiTone] = useState<AiToneType>(() => {
    return (localStorage.getItem('wtc_ai_tone') as AiToneType) || 'standard';
  });

  const handleSelectAiTone = (tone: AiToneType) => {
    setAiTone(tone);
    localStorage.setItem('wtc_ai_tone', tone);
  };

  // Модель
  const [selectedModel, setSelectedModel] = useState<string>('gemini-1.5-flash-8b');

  // Фоновое изображение
  const [backgroundUrl, setBackgroundUrl] = useState<string>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
  );

  const startSinglePlayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setActiveUniverse(universe);
    setIsAiMode(true);
    setIsTransitioning(true);
  };

  const startMultiplayer = (config: {
    roomId: string;
    themes: UniverseType[];
    timerSeconds: number;
    password?: string;
    isHost: boolean;
  }) => {
    let pool = CHARACTERS_DB;
    if (!config.themes.includes('all')) {
      pool = CHARACTERS_DB.filter(c => config.themes.includes(c.universe));
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const chars = shuffled.slice(0, 36);

    setActiveCharacters(chars);
    setActiveUniverse(config.themes.join('+'));
    setIsAiMode(false);
    setIsTransitioning(true);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans">
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 blur-[2px] scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url("${backgroundUrl}")` }}
        />
      )}

      {isAppLoading && (
        <SplashScreen onLoaded={() => setIsAppLoading(false)} />
      )}

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
        />
      )}

      {!isAppLoading && !isTransitioning && gameState === 'playing' && (
        <GameBoard 
          characters={activeCharacters}
          isAiMode={isAiMode}
          onBackToMenu={() => setGameState('menu')}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          currentBg={backgroundUrl}
          onChangeBg={setBackgroundUrl}
          currentUniverse={activeUniverse}
          nickname={nickname}
          onSaveNickname={handleSaveNickname}
          aiTone={aiTone}
          onSelectAiTone={handleSelectAiTone}
        />
      )}
    </main>
  );
};

export default App;
