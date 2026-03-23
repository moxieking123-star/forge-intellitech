// components/AboutHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const AboutHero = () => {
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

    const colors = {
      orange: '#FF8C42',
      teal: '#14B8B8',
      green: '#52B788',
      yellow: '#FFD54F',
      purple: '#A855F7',
    };

    // African continent shape (simplified points)
    const africaPoints = [
      { x: 0.5, y: 0.1 }, { x: 0.65, y: 0.15 }, { x: 0.7, y: 0.25 },
      { x: 0.75, y: 0.4 }, { x: 0.7, y: 0.55 }, { x: 0.65, y: 0.7 },
      { x: 0.55, y: 0.85 }, { x: 0.45, y: 0.9 }, { x: 0.35, y: 0.75 },
      { x: 0.3, y: 0.6 }, { x: 0.25, y: 0.45 }, { x: 0.3, y: 0.3 },
      { x: 0.35, y: 0.2 }, { x: 0.45, y: 0.12 },
    ];

    // Nodes representing key locations/impact areas
    interface ImpactNode {
      x: number;
      y: number;
      size: number;
      color: string;
      pulsePhase: number;
      label: string;
    }

    const impactNodes: ImpactNode[] = [
      { x: 0.5, y: 0.35, size: 20, color: colors.orange, pulsePhase: 0, label: 'Lagos' },
      { x: 0.55, y: 0.5, size: 12, color: colors.teal, pulsePhase: 1, label: 'Growth' },
      { x: 0.45, y: 0.55, size: 12, color: colors.green, pulsePhase: 2, label: 'Impact' },
      { x: 0.6, y: 0.65, size: 10, color: colors.yellow, pulsePhase: 3, label: 'Future' },
    ];

    // Rising sparks representing ideas/potential
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      color: string;
    }

    const sparks: Spark[] = [];

    // Connection waves
    interface Wave {
      centerX: number;
      centerY: number;
      radius: number;
      maxRadius: number;
      color: string;
    }

    const waves: Wave[] = [];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const scale = Math.min(width, height) * 0.8;
      const offsetX = (width - scale) / 2;
      const offsetY = (height - scale) / 2 - 20;

      // Draw continent outline
      ctx.beginPath();
      africaPoints.forEach((point, i) => {
        const x = offsetX + point.x * scale;
        const y = offsetY + point.y * scale;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      
      // Fill with gradient
      const continentGradient = ctx.createLinearGradient(
        offsetX, offsetY, 
        offsetX + scale, offsetY + scale
      );
      continentGradient.addColorStop(0, 'rgba(255, 140, 66, 0.08)');
      continentGradient.addColorStop(0.5, 'rgba(20, 184, 184, 0.06)');
      continentGradient.addColorStop(1, 'rgba(82, 183, 136, 0.08)');
      ctx.fillStyle = continentGradient;
      ctx.fill();
      
      // Outline
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Animated outline
      ctx.setLineDash([10, 20]);
      ctx.lineDashOffset = -time * 20;
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw waves
      if (Math.random() < 0.02) {
        const sourceNode = impactNodes[Math.floor(Math.random() * impactNodes.length)];
        waves.push({
          centerX: offsetX + sourceNode.x * scale,
          centerY: offsetY + sourceNode.y * scale,
          radius: 0,
          maxRadius: 100 + Math.random() * 50,
          color: sourceNode.color,
        });
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += 1;
        
        const opacity = 1 - wave.radius / wave.maxRadius;
        if (opacity <= 0) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wave.centerX, wave.centerY, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = opacity * 0.3;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw connections between nodes
      for (let i = 0; i < impactNodes.length; i++) {
        for (let j = i + 1; j < impactNodes.length; j++) {
          const from = impactNodes[i];
          const to = impactNodes[j];
          const fromX = offsetX + from.x * scale;
          const fromY = offsetY + from.y * scale;
          const toX = offsetX + to.x * scale;
          const toY = offsetY + to.y * scale;

          const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
          gradient.addColorStop(0, from.color + '30');
          gradient.addColorStop(1, to.color + '30');

          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Flowing particle
          const t = (time * 0.3 + i * 0.2) % 1;
          const px = fromX + (toX - fromX) * t;
          const py = fromY + (toY - fromY) * t;
          
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(t * Math.PI) * 0.5})`;
          ctx.fill();
        }
      }

      // Draw impact nodes
      impactNodes.forEach((node, i) => {
        const x = offsetX + node.x * scale;
        const y = offsetY + node.y * scale;
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.2 + 1;
        const size = node.size * pulse;

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
        glow.addColorStop(0, node.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(x - size * 0.25, y - size * 0.25, size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Main node label
        if (i === 0) {
          ctx.font = 'bold 11px system-ui';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillText(node.label, x, y + size + 16);
        }

        // Emit sparks from main node
        if (i === 0 && Math.random() < 0.05) {
          sparks.push({
            x, y,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2 - 1,
            size: 2 + Math.random() * 2,
            life: 1,
            color: node.color,
          });
        }
      });

      // Update and draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.02;
        spark.life -= 0.015;

        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Corner text
      ctx.font = '10px system-ui';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillText('BUILDING FROM AFRICA', 20, height - 20);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#52B788]/5" />

      {/* Gradient overlays for readability */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, 
              var(--hero-bg) 0%, 
              rgba(var(--hero-bg-rgb, 10,10,10), 0.85) 30%, 
              rgba(var(--hero-bg-rgb, 10,10,10), 0.4) 60%, 
              transparent 100%
            )
          `
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in-up"
              style={{ 
                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                border: '1px solid rgba(255, 140, 66, 0.2)'
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8C42] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8C42]"></span>
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--hero-text-secondary)' }}>
                About Forge Intellitech
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in-up"
              style={{ color: 'var(--hero-text)' }}
            >
              Africa won't become great by{' '}
              <span className="block sm:inline">
                <span className="bg-gradient-to-r from-[#FF8C42] via-[#FFD54F] to-[#52B788] bg-clip-text text-transparent">
                  copying playbooks
                </span>
              </span>
              <span className="text-[#FF8C42]">.</span>
            </h1>

            {/* Powerful Subtitle */}
            <p 
              className="text-xl sm:text-2xl lg:text-3xl leading-snug mb-6 animate-fade-in-up font-medium"
              style={{ color: 'var(--hero-text)', animationDelay: '0.1s' }}
            >
              We'll get there by{' '}
              <span className="text-[#14B8B8]">writing our own.</span>
            </p>

            {/* Strategic Quote */}
            <div 
              className="p-5 rounded-xl mb-8 animate-fade-in-up"
              style={{ 
                backgroundColor: 'rgba(255, 140, 66, 0.08)',
                borderLeft: '4px solid #FF8C42',
                animationDelay: '0.2s'
              }}
            >
              <p 
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hero-text)' }}
              >
                That's why Forge exists. Not to run quick tech trainings and call it a day — 
                but to build <span className="font-semibold text-[#FF8C42]">pipelines that take young Africans 
                from curiosity to capability, from learning to leading.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="#our-edge"
                className="
                  group inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  bg-[#FF8C42] text-[#1A1A1A] font-bold text-base
                  transition-all duration-300 ease-out
                  hover:bg-[#E85D04] hover:scale-[1.02]
                  shadow-lg shadow-[#FF8C42]/20
                "
              >
                Our Approach
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="#values"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  font-semibold text-base
                  transition-all duration-300 ease-out
                  hover:scale-[1.02] hover:bg-white/10
                "
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'var(--hero-text)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                Our Values
              </Link>
            </div>

            {/* Focus Areas */}
            <div 
              className="flex flex-wrap items-center gap-2 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <span 
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.5))' }}
              >
                We focus on:
              </span>
              {['Education', 'Incubation', 'Innovation', 'Impact'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-white/10"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'var(--hero-text-secondary)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div className="relative h-[400px] lg:h-[500px] order-first lg:order-last">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-fade-in hidden sm:flex" 
        style={{ animationDelay: '0.6s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span 
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: 'var(--hero-text-secondary)' }}
          >
            Explore
          </span>
          <div 
            className="w-6 h-10 rounded-full flex items-start justify-center p-2"
            style={{ border: '2px solid rgba(255,255,255,0.15)' }}
          >
            <div 
              className="w-1.5 h-3 rounded-full animate-bounce bg-[#FF8C42]"
              style={{ animationDuration: '1.5s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;