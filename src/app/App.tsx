import React, { useState } from 'react';
import { SplashScreen } from '../ui/SplashScreen';
import { MainMenu } from '../ui/MainMenu';
import { GameBoard } from '../ui/GameBoard';
import { Character, getRandom24, UniverseType } from '../data/characters';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState<'menu' | 'playing'>('menu');
  const [activeCharacters, setActiveCharacters] = useState<Character[]>([]);
  const [isAiMode, setIsAiMode] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000'
  );

  const startSinglePlayer = (universe: UniverseType) => {
    setActiveCharacters(getRandom24(universe));
    setIsAiMode(true);
    setGameState('playing');
  };

  const startMultiplayer = (universe: UniverseType) => {
    setActiveCharacters(getRandom24(universe));
    setIsAiMode(false);
    setGameState('playing');
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden font-sans">
      {backgroundUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-sm scale-105 pointer-events-none transition-all duration-700"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />
      )}

      {isLoading && (
        <SplashScreen onLoaded={() => setIsLoading(false)} />
      )}

      {!isLoading && gameState === 'menu' && (
        <MainMenu 
          onStartSingle={startSinglePlayer}
          onStartMulti={startMultiplayer}
          currentBg={backgroundUrl}
          onChangeBg={setBackgroundUrl}
        />
      )}

      {!isLoading && gameState === 'playing' && (
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
