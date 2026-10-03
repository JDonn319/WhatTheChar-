import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FastForward } from 'lucide-react';

interface DiceRollOverlayProps {
  player1Name: string;
  player2Name: string;
  starterName: string;
  onFinish: () => void;
}

export const DiceRollOverlay: React.FC<DiceRollOverlayProps> = ({
  player1Name,
  player2Name,
  starterName,
  onFinish
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [winnerAnnounced, setWinnerAnnounced] = useState<string | null>(null);
  const isFinishedRef = useRef(false);

  const safeFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    onFinish();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Берем гарантированную ширину экрана, а не контейнера
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Сцена
    const scene = new THREE.Scene();

    // Камера расположена строго по центру поля видимости
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);
    camera.lookAt(0, -0.3, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(4, 8, 6);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 4, 8);
    blueLight.position.set(0, -1.2, 2);
    scene.add(blueLight);

    // Неоновая сетка пола внизу экрана
    const grid = new THREE.GridHelper(8, 8, 0xffffff, 0x444444);
    grid.position.y = -1.2;
    scene.add(grid);

    // Генерация текстур для 6 граней с никами игроков
    const createFaceTexture = (text: string, num: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 10;
      ctx.strokeRect(10, 10, 236, 236);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 32px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(String(num), 230, 48);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const cleanNick = (text || 'ИГРОК').trim();
      const truncated = cleanNick.length > 8 ? cleanNick.slice(0, 7) + '…' : cleanNick;
      ctx.fillText(truncated.toUpperCase(), 128, 130);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Материалы для граней: 1, 3, 5 - Игрок 1; 2, 4, 6 - Игрок 2
    // В Three.js грань material[4] смотрит прямо в камеру при rotation (0, 0, 0)
    const isP1Winner = starterName === player1Name;

    const materials = [
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player1Name, 1), roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player2Name, 2), roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player1Name, 3), roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player2Name, 4), roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(isP1Winner ? player1Name : player2Name, 5), roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(!isP1Winner ? player1Name : player2Name, 6), roughness: 0.1 })
    ];

    const boxGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const cube = new THREE.Mesh(boxGeo, materials);
    
    // Куб стартует строго у верхней границы экрана (y = 2.4), его сразу видно!
    cube.position.set(0, 2.4, 0);
    scene.add(cube);

    const floorY = -0.5;
    const startY = 2.4;
    const duration = 2.0; // 2 секунды на падение и отскоки
    const startTime = performance.now();

    let reqId: number;

    const animate = (now: number) => {
      reqId = requestAnimationFrame(animate);

      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        // Детерминированная физика отскоков:
        // Фаза 1: 0 - 0.45с (Падение)
        // Фаза 2: 0.45 - 0.85с (Отскок 1)
        // Фаза 3: 0.85 - 1.25с (Отскок 2)
        // Фаза 4: 1.25 - 2.0с (Успокоение на полу)
        let currentY = floorY;
        if (elapsed < 0.45) {
          const t = elapsed / 0.45;
          currentY = startY + (floorY - startY) * (t * t);
        } else if (elapsed < 0.85) {
          const t = (elapsed - 0.45) / 0.4;
          currentY = floorY + Math.sin(t * Math.PI) * 0.9;
        } else if (elapsed < 1.25) {
          const t = (elapsed - 0.85) / 0.4;
          currentY = floorY + Math.sin(t * Math.PI) * 0.35;
        } else {
          currentY = floorY;
        }

        cube.position.y = currentY;

        // Вращение в полете, плавно переходящее в 0 (победной гранью к камере)
        const rotDamping = 1 - Math.pow(progress, 2);
        cube.rotation.x += 16 * rotDamping * 0.016;
        cube.rotation.y += 18 * rotDamping * 0.016;
        cube.rotation.z += 10 * rotDamping * 0.016;

        if (progress > 0.8) {
          // Мягко доворачиваем лицевой стороной к камере
          cube.rotation.x = THREE.MathUtils.lerp(cube.rotation.x, 0, 0.2);
          cube.rotation.y = THREE.MathUtils.lerp(cube.rotation.y, 0, 0.2);
          cube.rotation.z = THREE.MathUtils.lerp(cube.rotation.z, 0, 0.2);
        }
      } else {
        // Завершение: кубик стоит на полу
        cube.position.y = floorY;
        cube.rotation.set(0, 0, 0);

        if (!winnerAnnounced) {
          setWinnerAnnounced(starterName || player1Name);
          setTimeout(() => {
            safeFinish();
          }, 1500);
        }
      }

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    // Аварийный таймер: даже если телефон зависнет, игра гарантированно начнется через 3.5 сек
    const emergencyTimer = setTimeout(() => {
      safeFinish();
    }, 3600);

    return () => {
      clearTimeout(emergencyTimer);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      boxGeo.dispose();
      materials.forEach(m => {
        m.map?.dispose();
        m.dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [player1Name, player2Name, starterName]);

  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-between bg-black text-white select-none">
      
      {/* Шапка */}
      <div className="w-full pt-8 text-center z-10">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
          Определение первого хода
        </span>
        <h2 className="text-xl font-black uppercase tracking-wider text-white mt-0.5">
          Жеребьёвка дуэли
        </h2>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Объявление победителя или кнопка пропуска */}
      <div className="w-full pb-8 text-center z-10 px-5 flex flex-col items-center gap-3">
        {winnerAnnounced ? (
          <div className="w-full max-w-xs bg-white text-black p-3.5 border border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-in zoom-in-95 duration-200">
            <span className="text-[9px] font-mono uppercase tracking-widest block text-neutral-600 font-bold">
              Первым ходит:
            </span>
            <span className="text-lg font-black uppercase tracking-wider block mt-0.5">
              {winnerAnnounced}
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest animate-pulse">
            Куб определяет ход...
          </span>
        )}

        {/* Кнопка мгновенного пропуска */}
        <button
          type="button"
          onClick={safeFinish}
          className="py-1.5 px-3 bg-white/10 border border-white/20 text-neutral-400 text-[10px] font-mono uppercase flex items-center gap-1 active:bg-white active:text-black transition-colors"
        >
          <FastForward size={12} />
          <span>Пропустить</span>
        </button>
      </div>

    </div>
  );
};

export default DiceRollOverlay;
