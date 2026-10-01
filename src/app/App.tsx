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
  const [isAiMode, setIsAiMode] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
  );

  const startSinglePlayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setIsAiMode(true);
    setIsTransitioning(true);
  };

  const startMultiplayer = (universe: UniverseType) => {
    const chars = getRandom36(universe);
    setActiveCharacters(chars);
    setIsAiMode(false);
    setIsTransitioning(true);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans">
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}

      {/* Первичная загрузка приложения */}
      {isAppLoading && (
        <SplashScreen onLoaded={() => setIsAppLoading(false)} />
      )}

      {/* Предзагрузка 36 карточек при переходе в матч */}
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
        />
      )}

      {/* Игровое поле */}
      {!isAppLoading && !isTransitioning && gameState === 'playing' && (
        <GameBoard 
          characters={activeCharacters}
          isAiMode={isAiMode}
          onBackToMenu={() => setGameState('menu')}
        />
      )}
    </main>
  );
};

export default App;
