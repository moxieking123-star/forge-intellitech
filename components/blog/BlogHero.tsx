"use client";

import { useEffect, useRef, useState } from 'react';

const BlogHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let width = 0;
    let height = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Floating story particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      drift: number;
      char?: string;
    }

    const createParticles = (): Particle[] => {
      const particles: Particle[] = [];
      const chars = ['✦', '◈', '◇', '○', '∘', '·'];
      
      // Ink drops
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 2 + Math.random() * 6,
          opacity: 0.02 + Math.random() * 0.05,
          speed: 0.1 + Math.random() * 0.25,
          drift: Math.random() * Math.PI * 2,
        });
      }
      
      // Floating characters
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 16 + Math.random() * 28,
          opacity: 0.015 + Math.random() * 0.025,
          speed: 0.05 + Math.random() * 0.1,
          drift: Math.random() * Math.PI * 2,
          char: chars[Math.floor(Math.random() * chars.length)],
        });
      }
      
      return particles;
    };

    let particles = createParticles();

    // Quill/pen path animation
    interface PathPoint {
      x: number;
      y: number;
      age: number;
    }
    
    let pathPoints: PathPoint[] = [];
    let pathAngle = 0;
    const pathCenterX = width * 0.75;
    const pathCenterY = height * 0.5;
    const pathRadius = Math.min(width, height) * 0.15;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Ambient corner glows
      const corners = [
        { x: 0, y: 0, color: '#FF8C42' },
        { x: width, y: 0, color: '#14B8B8' },
        { x: width, y: height, color: '#52B788' },
        { x: 0, y: height, color: '#FFD54F' },
      ];

      corners.forEach((corner, i) => {
        const pulse = Math.sin(time * 0.3 + i * 1.5) * 0.3 + 0.7;
        const size = (width * 0.2) * pulse;
        
        const gradient = ctx.createRadialGradient(
          corner.x, corner.y, 0,
          corner.x, corner.y, size
        );
        gradient.addColorStop(0, corner.color + '12');
        gradient.addColorStop(0.5, corner.color + '06');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Animate particles
      particles.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(time * 0.5 + p.drift) * 0.3;
        
        if (p.y < -p.size) {
          p.y = height + p.size;
          p.x = Math.random() * width;
        }

        const pulse = Math.sin(time * 0.8 + p.drift) * 0.3 + 0.7;
        
        if (p.char) {
          // Floating character
          ctx.save();
          ctx.globalAlpha = p.opacity * pulse;
          ctx.font = `${p.size}px Georgia, serif`;
          ctx.fillStyle = '#FF8C42';
          ctx.textAlign = 'center';
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        } else {
          // Ink drop
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 140, 66, ${p.opacity * pulse})`;
          ctx.fill();
        }
      });

      // Animated quill path (writing effect)
      pathAngle += 0.008;
      const newX = pathCenterX + Math.cos(pathAngle * 2) * pathRadius * Math.sin(pathAngle);
      const newY = pathCenterY + Math.sin(pathAngle * 3) * pathRadius * 0.6;
      
      pathPoints.push({ x: newX, y: newY, age: 0 });
      
      // Draw path with fade
      if (pathPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
        
        for (let i = 1; i < pathPoints.length; i++) {
          pathPoints[i].age += 0.016;
          const opacity = Math.max(0, 1 - pathPoints[i].age / 3);
          
          ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
          ctx.strokeStyle = `rgba(255, 140, 66, ${opacity * 0.15})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(pathPoints[i].x, pathPoints[i].y);
        }
      }
      
      // Remove old path points
      pathPoints = pathPoints.filter(p => p.age < 3);

      // Quill tip glow
      const glowGradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, 30);
      glowGradient.addColorStop(0, 'rgba(255, 140, 66, 0.3)');
      glowGradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(newX, newY, 30, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Central story orb
      const orbX = width * 0.5;
      const orbY = height * 0.5;
      const orbPulse = Math.sin(time * 0.5) * 0.1 + 1;
      const orbSize = 80 * orbPulse;
      
      const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbSize);
      orbGradient.addColorStop(0, 'rgba(20, 184, 184, 0.08)');
      orbGradient.addColorStop(0.5, 'rgba(255, 140, 66, 0.04)');
      orbGradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
      ctx.fillStyle = orbGradient;
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      particles = createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion]);

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-env-bg-primary">
      {/* Animated Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Gradient Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--env-bg-primary) 0%, transparent 50%, var(--env-bg-primary) 100%)'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--env-bg-primary) 80%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container-forge py-20 text-center">
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#FF8C42]" />
          <span className="text-[#FF8C42] text-sm font-medium uppercase tracking-widest">
            Stories & Insights
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#FF8C42]" />
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-env-primary mb-6 leading-tight">
          Stories From{' '}
          <span className="bg-gradient-to-r from-[#FF8C42] via-[#FFD54F] to-[#14B8B8] bg-clip-text text-transparent">
            the Field
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-env-secondary max-w-3xl mx-auto leading-relaxed mb-8">
          Real stories about building Africa's future.{' '}
          <span className="text-[#14B8B8]">
            No corporate speak — just honest thoughts on education, leadership, and what it takes to build from within.
          </span>
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {['Technology', 'Education', 'Innovation', 'Leadership', 'Impact'].map((cat, i) => (
            <span
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 140, 66, 0.08)',
                color: 'var(--env-text-secondary)',
                border: '1px solid rgba(255, 140, 66, 0.15)'
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;