// components/GalleryHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

const GalleryHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    const colors = ['#FF8C42', '#14B8B8', '#52B788', '#FFD54F', '#A855F7'];

    // Photo frames floating
    interface PhotoFrame {
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      rotationSpeed: number;
      floatPhase: number;
      floatSpeed: number;
      color: string;
      depth: number;
    }

    const frames: PhotoFrame[] = [];

    const createFrames = () => {
      frames.length = 0;
      const frameCount = width < 600 ? 8 : 12;
      
      for (let i = 0; i < frameCount; i++) {
        const size = 40 + Math.random() * 60;
        frames.push({
          x: Math.random() * width,
          y: Math.random() * height,
          width: size,
          height: size * (0.7 + Math.random() * 0.4),
          rotation: (Math.random() - 0.5) * 0.3,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          floatPhase: Math.random() * Math.PI * 2,
          floatSpeed: 0.5 + Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          depth: 0.5 + Math.random() * 0.5,
        });
      }
    };

    createFrames();

    // Sparkles/memories
    interface Sparkle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
    }

    const sparkles: Sparkle[] = [];

    // Floating film strip
    interface FilmStrip {
      x: number;
      y: number;
      length: number;
      angle: number;
      speed: number;
    }

    const filmStrips: FilmStrip[] = [];
    for (let i = 0; i < 3; i++) {
      filmStrips.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 100 + Math.random() * 50,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.3,
      });
    }

    let time = 0;

    const drawFrame = (frame: PhotoFrame) => {
      const floatY = Math.sin(time * frame.floatSpeed + frame.floatPhase) * 8;
      const floatX = Math.cos(time * frame.floatSpeed * 0.7 + frame.floatPhase) * 4;
      
      ctx.save();
      ctx.translate(frame.x + floatX, frame.y + floatY);
      ctx.rotate(frame.rotation + Math.sin(time + frame.floatPhase) * 0.02);
      ctx.globalAlpha = 0.3 + frame.depth * 0.4;

      // Frame shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(4, 4, frame.width, frame.height);

      // Frame background
      ctx.fillStyle = frame.color + '20';
      ctx.fillRect(0, 0, frame.width, frame.height);

      // Frame border
      ctx.strokeStyle = frame.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, frame.width, frame.height);

      // Inner content area
      const padding = 6;
      ctx.fillStyle = frame.color + '10';
      ctx.fillRect(padding, padding, frame.width - padding * 2, frame.height - padding * 2);

      // Decorative lines (like photo content)
      ctx.strokeStyle = frame.color + '30';
      ctx.lineWidth = 1;
      const lineCount = Math.floor((frame.height - padding * 2) / 10);
      for (let i = 0; i < lineCount; i++) {
        const ly = padding + 8 + i * 10;
        const lw = (Math.sin(i + time) * 0.3 + 0.7) * (frame.width - padding * 2 - 10);
        ctx.beginPath();
        ctx.moveTo(padding + 5, ly);
        ctx.lineTo(padding + 5 + lw, ly);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawFilmStrip = (strip: FilmStrip) => {
      ctx.save();
      ctx.translate(strip.x, strip.y);
      ctx.rotate(strip.angle);
      ctx.globalAlpha = 0.15;

      // Film strip body
      ctx.fillStyle = '#FF8C42';
      ctx.fillRect(-strip.length / 2, -15, strip.length, 30);

      // Perforations
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      const holeCount = Math.floor(strip.length / 20);
      for (let i = 0; i < holeCount; i++) {
        const hx = -strip.length / 2 + 10 + i * 20;
        ctx.fillRect(hx, -12, 6, 4);
        ctx.fillRect(hx, 8, 6, 4);
      }

      // Frame boxes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < holeCount - 1; i++) {
        const fx = -strip.length / 2 + 15 + i * 20;
        ctx.strokeRect(fx, -6, 14, 12);
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Background grid
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw film strips
      filmStrips.forEach((strip) => {
        strip.x += Math.cos(strip.angle) * strip.speed;
        strip.y += Math.sin(strip.angle) * strip.speed;

        // Wrap around
        if (strip.x < -strip.length) strip.x = width + strip.length;
        if (strip.x > width + strip.length) strip.x = -strip.length;
        if (strip.y < -30) strip.y = height + 30;
        if (strip.y > height + 30) strip.y = -30;

        drawFilmStrip(strip);
      });

      // Sort frames by depth for proper layering
      frames.sort((a, b) => a.depth - b.depth);

      // Draw frames
      frames.forEach((frame) => {
        frame.rotation += frame.rotationSpeed;
        drawFrame(frame);

        // Occasionally create sparkle
        if (Math.random() < 0.005) {
          sparkles.push({
            x: frame.x + Math.random() * frame.width,
            y: frame.y + Math.random() * frame.height,
            size: 2 + Math.random() * 3,
            opacity: 1,
            color: frame.color,
            life: 1,
          });
        }
      });

      // Draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sparkle = sparkles[i];
        sparkle.life -= 0.02;
        sparkle.y -= 0.5;

        if (sparkle.life <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        // Draw star shape
        ctx.save();
        ctx.translate(sparkle.x, sparkle.y);
        ctx.rotate(time * 2);
        ctx.globalAlpha = sparkle.life;
        ctx.fillStyle = sparkle.color;

        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const angle = (j / 4) * Math.PI * 2;
          const outerR = sparkle.size * sparkle.life;
          const innerR = outerR * 0.4;
          ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
          ctx.lineTo(Math.cos(angle + Math.PI / 4) * innerR, Math.sin(angle + Math.PI / 4) * innerR);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Central focus indicator
      const cx = width * 0.5;
      const cy = height * 0.5;
      const focusPulse = Math.sin(time * 2) * 0.2 + 0.8;

      ctx.beginPath();
      ctx.arc(cx, cy, 80 * focusPulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.1)';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.lineDashOffset = time * 20;
      ctx.stroke();
      ctx.setLineDash([]);

      // Corner brackets
      const bracketSize = 30;
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.2)';
      ctx.lineWidth = 2;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy - 60 + bracketSize);
      ctx.lineTo(cx - 60, cy - 60);
      ctx.lineTo(cx - 60 + bracketSize, cy - 60);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(cx + 60 - bracketSize, cy - 60);
      ctx.lineTo(cx + 60, cy - 60);
      ctx.lineTo(cx + 60, cy - 60 + bracketSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy + 60 - bracketSize);
      ctx.lineTo(cx - 60, cy + 60);
      ctx.lineTo(cx - 60 + bracketSize, cy + 60);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(cx + 60 - bracketSize, cy + 60);
      ctx.lineTo(cx + 60, cy + 60);
      ctx.lineTo(cx + 60, cy + 60 - bracketSize);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      createFrames();
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#A855F7]/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <span 
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full"
              style={{ 
                color: '#FF8C42',
                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                border: '1px solid rgba(255, 140, 66, 0.2)'
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#FF8C42] animate-pulse" />
              Our Journey in Frames
            </span>

            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--hero-text)' }}
            >
              Moments That{' '}
              <span 
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #FF8C42, #A855F7, #14B8B8)' }}
              >
                Define Our Mission
              </span>
            </h1>

            <p 
              className="text-lg sm:text-xl leading-relaxed mb-8"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              Every image tells a story of young Nigerians discovering their potential, 
              communities embracing technology, and{' '}
              <span className="font-semibold" style={{ color: 'var(--hero-text)' }}>
                a vision becoming reality.
              </span>
            </p>

            {/* Quick Stats */}
            <div 
              className="inline-flex items-center gap-6 px-6 py-4 rounded-2xl"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {[
                { value: '3', label: 'Collections' },
                { value: '20+', label: 'Photos' },
                { value: '2025', label: 'Since' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-[#FF8C42]">{stat.value}</p>
                  <p className="text-xs text-env-tertiary uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div className="relative h-[350px] lg:h-[450px] order-first lg:order-last">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GalleryHero;