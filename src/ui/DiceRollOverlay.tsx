import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Сцена и камера
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 7.5);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLight.position.set(0, -1, 2);
    scene.add(pointLight);

    // Пол со светящейся сеткой
    const gridHelper = new THREE.GridHelper(10, 10, 0xffffff, 0x333333);
    gridHelper.position.y = -1.6;
    scene.add(gridHelper);

    // Генерация текстур с никами для 6 граней
    const createFaceTexture = (text: string, num: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      // Фон грани
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, 256, 256);

      // Рамка
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(8, 8, 240, 240);

      // Номер грани
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(String(num), 235, 45);

      // Ник игрока
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const truncated = text.length > 9 ? text.slice(0, 8) + '…' : text;
      ctx.fillText(truncated.toUpperCase(), 128, 128);

      return new THREE.CanvasTexture(canvas);
    };

    // Грани: 1, 3, 5 - Игрок 1; 2, 4, 6 - Игрок 2
    // Порядок материалов Three.js: +X, -X, +Y, -Y, +Z, -Z
    const materials = [
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player1Name, 1), roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player2Name, 2), roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player1Name, 3), roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player2Name, 4), roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player1Name, 5), roughness: 0.2 }), // передняя грань к камере
      new THREE.MeshStandardMaterial({ map: createFaceTexture(player2Name, 6), roughness: 0.2 })
    ];

    const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cube = new THREE.Mesh(boxGeo, materials);
    scene.add(cube);

    // Физика падения куба
    let posY = 7.0;
    let velY = 0;
    const gravity = -18;
    const floorY = -0.85;

    let rotVelX = 14;
    let rotVelY = 16;
    let rotVelZ = 8;

    let isSettled = false;
    let startTime = performance.now();

    let reqId: number;

    const animate = (now: number) => {
      reqId = requestAnimationFrame(animate);
      const dt = 0.016;

      if (!isSettled) {
        velY += gravity * dt;
        posY += velY * dt;

        cube.rotation.x += rotVelX * dt;
        cube.rotation.y += rotVelY * dt;
        cube.rotation.z += rotVelZ * dt;

        // Отскок от пола
        if (posY <= floorY) {
          posY = floorY;
          velY = -velY * 0.52; // демпфирование
          rotVelX *= 0.65;
          rotVelY *= 0.65;
          rotVelZ *= 0.65;

          // Если почти остановился — фиксируем победную грань
          if (Math.abs(velY) < 0.4 && now - startTime > 1600) {
            isSettled = true;
            posY = floorY;

            // Поворачиваем передней гранью нужного игрока к камере
            const isP1 = starterName === player1Name;
            cube.rotation.set(0, isP1 ? 0 : Math.PI, 0);

            setTimeout(() => {
              setWinnerAnnounced(starterName);
              setTimeout(onFinish, 1800);
            }, 300);
          }
        }
        cube.position.y = posY;
      } else {
        // Мягкое покачивание после падения
        cube.position.y = floorY + Math.sin(now * 0.003) * 0.03;
      }

      renderer.render(scene, camera);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
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
  }, [player1Name, player2Name, starterName, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white select-none animate-in fade-in duration-500">
      {/* Шапка */}
      <div className="w-full pt-8 text-center z-10">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
          Жеребьёвка первого хода
        </span>
        <h2 className="text-xl font-black uppercase tracking-wider text-white mt-1">
          Бросок кубика дуэли
        </h2>
      </div>

      {/* Контейнер Three.js */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Оповещение победителя */}
      <div className="w-full pb-12 text-center z-10 px-4">
        {winnerAnnounced ? (
          <div className="bg-white text-black p-4 border border-white shadow-[0_0_30px_rgba(255,255,255,0.4)] animate-in zoom-in-95 duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest block text-neutral-600 font-bold">
              Первый ход достаётся:
            </span>
            <span className="text-xl font-black uppercase tracking-wider block mt-1">
              {winnerAnnounced}
            </span>
          </div>
        ) : (
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest animate-pulse">
            Куб определяет очерёдность...
          </span>
        )}
      </div>
    </div>
  );
};
