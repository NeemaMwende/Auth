// components/HeartCanvas.js
"use client"
import { useEffect, useRef } from 'react';

export default function HeartCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas dimensions and resize handler
    const resizeCanvas = () => {
      const { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Heart shape calculation functions
    const heartPosition = (rad) => [
      Math.pow(Math.sin(rad), 3),
      -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
    ];

    const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
      dx + pos[0] * sx,
      dy + pos[1] * sy,
    ];

    // Set up heart points and particles
    const pointsOrigin = [];
    const rand = Math.random;
    const traceCount = 50;
    const dr = 0.1;
    for (let i = 0; i < Math.PI * 2; i += dr) {
      pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
    }

    const heartPointsCount = pointsOrigin.length;
    const particles = Array.from({ length: heartPointsCount }, () => ({
      x: rand() * canvas.width,
      y: rand() * canvas.height,
      vx: 0,
      vy: 0,
      R: 2,
      speed: rand() + 5,
      q: ~~(rand() * heartPointsCount),
      D: 2 * (~~(rand() * 2)) - 1,
      force: 0.2 * rand() + 0.7,
      trace: Array.from({ length: traceCount }, () => ({ x: 0, y: 0 })),
      color: `hsla(0,${~~(40 * rand() + 60)}%,${~~(60 * rand() + 20)}%,0.3)`,
    }));

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        const q = pointsOrigin[particle.q];
        const dx = particle.trace[0].x - q[0] - canvas.width / 2;
        const dy = particle.trace[0].y - q[1] - canvas.height / 2;
        const length = Math.sqrt(dx * dx + dy * dy);

        // Change direction randomly
        if (length < 10 && rand() > 0.9) {
          particle.q = ~~(rand() * heartPointsCount);
        }

        particle.vx += (-dx / length) * particle.speed;
        particle.vy += (-dy / length) * particle.speed;
        particle.trace[0].x += particle.vx;
        particle.trace[0].y += particle.vy;
        particle.vx *= particle.force;
        particle.vy *= particle.force;

        // Draw particles
        ctx.fillStyle = particle.color;
        for (let k = 0; k < particle.trace.length - 1; k++) {
          const T = particle.trace[k];
          const N = particle.trace[k + 1];
          N.x -= 0.4 * (N.x - T.x);
          N.y -= 0.4 * (N.y - T.y);
          ctx.fillRect(N.x, N.y, particle.R, particle.R);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 w-full h-full bg-black/20"
    />
  );
}
