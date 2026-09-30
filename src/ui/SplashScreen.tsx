import React, { useEffect, useState } from 'react';
import { CHARACTERS_DB } from '../data/characters';

interface SplashScreenProps {
  onLoaded: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Список всех файлов для предзагрузки
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
        // Небольшая задержка для завершения анимации полоски
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onLoaded, 600);
        }, 400);
      }
    };

    assetsToLoad.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = checkItem;
      img.onerror = checkItem; // Если файл не найден, не вешаем загрузку
    });
  }, [onLoaded]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-black transition-opacity duration-700 p-8 select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full flex justify-center pt-8">
        <span className="text-xs font-black tracking-widest uppercase opacity-40">
          iOS Edition
        </span>
      </div>

      {/* Огромный логотип в центре экрана */}
      <div className="flex flex-col items-center justify-center gap-6">
        <img 
          src="/WhatTheLogo.png" 
          alt="WhatTheChar? Logo" 
          className="w-56 h-56 object-contain drop-shadow-sm active:scale-95 transition-transform"
          onError={(e) => {
            // Если логотип еще не загрузили в public/, показываем резервный значок
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <h1 className="text-3xl font-black tracking-tighter text-black uppercase">
          WhatTheChar?
        </h1>
      </div>

      {/* Черная шкала загрузки в самом низу экрана */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 pb-8">
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden p-[1px]">
          <div 
            className="h-full bg-black rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
          <span>Loading assets</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
