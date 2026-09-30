import React, { useEffect, useState } from 'react';
import { SplashScreen } from '../ui/SplashScreen.tsx';

export const App: React.FC = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(true);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return (
    <main className="w-screen h-[100dvh] bg-black text-white overflow-hidden relative">
      {/* Предупреждение при повороте в горизонтальный режим */}
      {!isPortrait ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black p-6 text-center">
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
            Пожалуйста, поверните устройство вертикально
          </p>
        </div>
      ) : (
        /* Основной вертикальный контейнер */
        <div className="w-full h-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
          <SplashScreen />
        </div>
      )}
    </main>
  );
};

export default App;
