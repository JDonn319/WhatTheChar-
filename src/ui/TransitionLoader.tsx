import React, { useEffect, useState } from 'react';
import { Character } from '../data/characters';

interface TransitionLoaderProps {
  characters: Character[];
  onComplete: () => void;
}

export const TransitionLoader: React.FC<TransitionLoaderProps> = ({ characters, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = characters.length;

    if (total === 0) {
      onComplete();
      return;
    }

    const checkOne = () => {
      loaded++;
      setProgress(Math.round((loaded / total) * 100));
      if (loaded >= total) {
        setTimeout(onComplete, 300);
      }
    };

    characters.forEach(c => {
      const img = new Image();
      img.src = c.avatar;
      img.onload = checkOne;
      img.onerror = checkOne;
    });
  }, [characters, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-6 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-xs flex flex-col items-center gap-4 text-center">
        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">
          Подготовка 36 персонажей
        </span>
        <div className="w-full h-1.5 bg-neutral-900 border border-white/20">
          <div 
            className="h-full bg-white transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-neutral-500 uppercase">
          Кэширование изображений: {progress}%
        </span>
      </div>
    </div>
  );
};
