import React, { useEffect, useState } from 'react';
import { CHARACTERS_DB } from '../data/characters';

interface SplashScreenProps {
  onLoaded: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const assetsToLoad = [
      '/WhatTheLogo.png',
      ...CHARACTERS_DB.map(c => c.avatar)
    ];

    let loadedCount = 0;
    const total = assetsToLoad.length;

    const checkItem = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / total) * 100);
      setProgress(currentPct);

      if (loadedCount >= total) {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onLoaded, 500);
        }, 300);
      }
    };

    assetsToLoad.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = checkItem;
      img.onerror = checkItem;
    });
  }, [onLoaded]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-black transition-opacity duration-500 p-6 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full flex justify-center pt-4">
        <span className="text-[10px] font-black tracking-widest uppercase opacity-40">
          iOS Standalone Edition
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <img 
          src="/WhatTheLogo.png" 
          alt="WhatTheChar? Logo" 
          className="w-64 h-64 object-contain active:scale-95 transition-transform"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
          WhatTheChar?
        </h1>
      </div>

      {/* Острая черная полоса загрузки без скруглений */}
      <div className="w-full max-w-xs flex flex-col gap-2 pb-6">
        <div className="w-full h-2 bg-neutral-200 p-0 border border-neutral-300">
          <div 
            className="h-full bg-black transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
          <span>Loading character assets</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
