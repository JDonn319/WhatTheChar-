import React, { useState } from 'react';
import { SplashScreen } from '../ui/SplashScreen';
import { MainMenu } from '../ui/MainMenu';
import { GameBoard } from '../ui/GameBoard';
import { TransitionLoader } from '../ui/TransitionLoader';
import { Character, getRandom36, UniverseType } from '../data/characters';

export const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
  const [activeUniverse, setActiveUniverse] = useState<UniverseType>('all');
  const [isAiMode, setIsAiMode] = useState(false);
  
  // Модель по умолчанию
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3.1-flash-lite');

  // Фоновое изображение (дефолтное)
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

  const startMultiplayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setActiveUniverse(universe);
    setIsAiMode(false);
    setIsTransitioning(true);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans">
      {/* 
        Исправленный контейнер фонового изображения:
        - Увеличена яркость до opacity-50 (картинка больше не уходит в глухой черный цвет)
        - Корректная подгрузка картинок из /public/background2.jpg и /public/background3.jpg
      */}
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 blur-[2px] scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url("${backgroundUrl}")` }}
        />
      )}

      {/* Первичная загрузка игры */}
      {isAppLoading && (
        <SplashScreen onLoaded={() => setIsAppLoading(false)} />
      )}

      {/* Кэширование 36 карточек при переходе в матч */}
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
        />
      )}

      {/* Игровое поле */}
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
        />
      )}
    </main>
  );
};

export default App;
