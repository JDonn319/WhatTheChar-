import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-black select-none pointer-events-none">
      {/* Контейнер для логотипа WhatTheLogo.png */}
      <div className="flex flex-col items-center gap-4 transition-opacity duration-700">
        <img 
          src="/WhatTheLogo.png" 
          alt="WhatTheChar? Logo" 
          className="w-24 h-24 object-contain animate-pulse"
          onError={(e) => {
            // Если картинка еще не добавлена в public/, аккуратно скрываем тег без ошибок
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <h1 className="text-xl font-bold tracking-widest text-neutral-400 uppercase">
          WhatTheChar?
        </h1>
      </div>
    </div>
  );
};
