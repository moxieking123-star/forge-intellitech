// components/LaunchPadHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Custom Icons for counters
const LightbulbIcon = ({ size = 24, color = "#FF8C42" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const WalletIcon = ({ size = 24, color = "#14B8B8" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const ShieldCheckIcon = ({ size = 24, color = "#52B788" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const MentorIcon = ({ size = 24, color = "#FFD54F" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Counter data
const counters = [
  { target: 20, suffix: '+', label: 'Ideas Presented', color: '#FF8C42', Icon: LightbulbIcon },
  { target: 50, suffix: 'M+', label: 'Event Budget', color: '#14B8B8', Icon: WalletIcon },
  { target: 0, suffix: '%', label: 'Equity Taken', color: '#52B788', Icon: ShieldCheckIcon },
  { target: 6, suffix: ' Months', label: 'Mentorship', color: '#FFD54F', Icon: MentorIcon },
];

const LaunchPadHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [countedValues, setCountedValues] = useState(counters.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Counter animation
  useEffect(() => {
    if (hasAnimated) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          counters.forEach((counter, index) => {
            const duration = 2000;
            const steps = 60;
            const increment = counter.target / steps;
            let current = 0;
            let step = 0;
            
            const interval = setInterval(() => {
              step++;
              current = Math.min(counter.target, Math.round(increment * step));
              setCountedValues(prev => {
                const newValues = [...prev];
                newValues[index] = current;
                return newValues;
              });
              
              if (step >= steps) {
                clearInterval(interval);
              }
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Canvas animation
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

    const colors = ['#FF8C42', '#14B8B8', '#52B788', '#FFD54F'];

    interface OrbitRing {
      radius: number;
      speed: number;
      rotation: number;
      color: string;
      dotCount: number;
    }

    const orbitRings: OrbitRing[] = [
      { radius: 80, speed: 0.008, rotation: 0, color: '#FF8C42', dotCount: 6 },
      { radius: 120, speed: -0.006, rotation: Math.PI / 4, color: '#14B8B8', dotCount: 8 },
      { radius: 160, speed: 0.004, rotation: Math.PI / 2, color: '#52B788', dotCount: 10 },
      { radius: 200, speed: -0.003, rotation: 0, color: '#FFD54F', dotCount: 12 },
    ];

    interface IdeaNode {
      x: number;
      y: number;
      targetY: number;
      size: number;
      color: string;
      speed: number;
      wobblePhase: number;
      opacity: number;
    }

    const ideaNodes: IdeaNode[] = [];
    const createIdeaNode = () => {
      ideaNodes.push({
        x: width * 0.5 + (Math.random() - 0.5) * 100,
        y: height + 20,
        targetY: -50,
        size: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.8 + Math.random() * 0.5,
        wobblePhase: Math.random() * Math.PI * 2,
        opacity: 0.6 + Math.random() * 0.4,
      });
    };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: Particle[] = [];

    interface Spark {
      x: number;
      y: number;
      angle: number;
      speed: number;
      size: number;
      life: number;
      color: string;
    }

    const sparks: Spark[] = [];
    const createSparkBurst = (x: number, y: number) => {
      const sparkCount = 8;
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x,
          y,
          angle: (i / sparkCount) * Math.PI * 2,
          speed: 2 + Math.random() * 2,
          size: 2 + Math.random() * 2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    let time = 0;
    let lastNodeSpawn = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const cx = width * 0.5;
      const cy = height * 0.45;

      // Background grid
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Orbit rings
      orbitRings.forEach((ring) => {
        ring.rotation += ring.speed;

        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.radius, ring.radius * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + '15';
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < ring.dotCount; i++) {
          const angle = ring.rotation + (i / ring.dotCount) * Math.PI * 2;
          const x = cx + Math.cos(angle) * ring.radius;
          const y = cy + Math.sin(angle) * ring.radius * 0.4;
          const dotSize = 3 + Math.sin(time * 2 + i) * 1;
          
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = ring.color + '60';
          ctx.fill();
        }
      });

      // Central platform
      const platformGlow = ctx.createRadialGradient(cx, cy + 30, 0, cx, cy + 30, 100);
      platformGlow.addColorStop(0, 'rgba(255, 140, 66, 0.2)');
      platformGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(cx, cy + 30, 100, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = platformGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx, cy + 30, 60, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 140, 66, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#FF8C42';
      ctx.lineWidth = 2;
      ctx.stroke();

      const beaconPulse = Math.sin(time * 3) * 0.3 + 0.7;
      const beaconGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 * beaconPulse);
      beaconGlow.addColorStop(0, 'rgba(255, 140, 66, 0.4)');
      beaconGlow.addColorStop(0.5, 'rgba(255, 140, 66, 0.15)');
      beaconGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 50 * beaconPulse, 0, Math.PI * 2);
      ctx.fillStyle = beaconGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FF8C42';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx - 6, cy - 6, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();

      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('LP', cx, cy + 4);

      // Rising idea nodes
      if (time - lastNodeSpawn > 1.5) {
        createIdeaNode();
        lastNodeSpawn = time;
      }

      for (let i = ideaNodes.length - 1; i >= 0; i--) {
        const node = ideaNodes[i];
        node.y -= node.speed;
        node.x += Math.sin(time * 2 + node.wobblePhase) * 0.5;
        
        if (Math.random() < 0.3) {
          particles.push({
            x: node.x,
            y: node.y + node.size,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.5 + Math.random() * 0.5,
            size: 2 + Math.random() * 2,
            color: node.color,
            life: 1,
            maxLife: 1,
          });
        }

        const nodeGlow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 2);
        nodeGlow.addColorStop(0, node.color + '40');
        nodeGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(node.x - node.size * 0.2, node.y - node.size * 0.2, node.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        if (node.y < cy - 50 && node.y > cy - 60) {
          createSparkBurst(node.x, node.y);
        }

        if (node.y < node.targetY) {
          ideaNodes.splice(i, 1);
        }
      }

      // Trail particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.03;
        s.speed *= 0.96;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Energy beams
      for (let i = 0; i < 3; i++) {
        const beamX = cx + (i - 1) * 30;
        const beamHeight = 100 + Math.sin(time * 3 + i) * 20;
        const beamGradient = ctx.createLinearGradient(beamX, cy, beamX, cy - beamHeight);
        beamGradient.addColorStop(0, 'rgba(255, 140, 66, 0.3)');
        beamGradient.addColorStop(0.5, 'rgba(255, 140, 66, 0.1)');
        beamGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(beamX - 3, cy);
        ctx.lineTo(beamX - 1, cy - beamHeight);
        ctx.lineTo(beamX + 1, cy - beamHeight);
        ctx.lineTo(beamX + 3, cy);
        ctx.closePath();
        ctx.fillStyle = beamGradient;
        ctx.fill();
      }

      // Status indicators
      const statuses = ['APPLY', 'LEARN', 'LAUNCH'];
      const statusColors = ['#52B788', '#14B8B8', '#FF8C42'];
      statuses.forEach((status, i) => {
        const sx = width - 100;
        const sy = 40 + i * 30;
        const isActive = Math.floor(time * 0.5) % 3 === i;
        
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? statusColors[i] : statusColors[i] + '30';
        ctx.fill();
        
        ctx.font = '10px system-ui';
        ctx.textAlign = 'left';
        ctx.fillStyle = isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)';
        ctx.fillText(status, sx + 12, sy + 3);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
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
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#14B8B8]/5" />

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
                🚀 SSS3 Students • Business Grants • Zero Equity
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in-up"
              style={{ color: 'var(--hero-text)' }}
            >
              Solve Africa's problems{' '}
              <span className="block sm:inline">
                <span className="bg-gradient-to-r from-[#FF8C42] via-[#FFD54F] to-[#52B788] bg-clip-text text-transparent">
                  win real funding
                </span>
              </span>
              <span className="text-[#FF8C42]">.</span>
            </h1>

            {/* Powerful Subtitle */}
            <p 
              className="text-xl sm:text-2xl lg:text-3xl leading-snug mb-6 animate-fade-in-up font-medium"
              style={{ color: 'var(--hero-text)', animationDelay: '0.1s' }}
            >
              Keep 100% equity —{' '}
              <span className="text-[#52B788]">we invest in your future.</span>
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
                LaunchPad exposes SSS3 students to a world where they find{' '}
                <span className="font-semibold text-[#FF8C42]">practical solutions to African problems</span>{' '}
                with access to real funding, real mentorship, and real support. All prizes are business grants — not loans.
              </p>
            </div>

            {/* Counters Grid */}
            <div 
              className="grid grid-cols-2 gap-4 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.25s' }}
            >
              {counters.map((counter, index) => {
                const IconComponent = counter.Icon;
                return (
                  <div 
                    key={counter.label}
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: counter.color + '20' }}
                      >
                        <IconComponent size={20} color={counter.color} />
                      </div>
                      <div 
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: counter.color }}
                      >
                        {counter.target === 0 && counter.suffix === '%' ? '0' : countedValues[index]}{counter.suffix}
                      </div>
                    </div>
                    <div 
                      className="text-sm pl-1"
                      style={{ color: 'var(--hero-text-secondary)' }}
                    >
                      {counter.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="/launchpad/apply"
                className="
                  group inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  bg-[#FF8C42] text-[#1A1A1A] font-bold text-base
                  transition-all duration-300 ease-out
                  hover:bg-[#E85D04] hover:scale-[1.02]
                  shadow-lg shadow-[#FF8C42]/20
                "
              >
                Apply Now — It's FREE
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
                href="#sponsor"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  font-semibold text-base
                  transition-all duration-300 ease-out
                  hover:scale-[1.02]
                  bg-[#A855F7] text-white
                "
              >
                Become a Sponsor
              </Link>
            </div>

            {/* Highlight Stats */}
            <div 
              className="flex flex-wrap items-center gap-2 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <span 
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.5))' }}
              >
                Event:
              </span>
              {['₦10M+ Grants', '₦50M+ Budget', '20 Finalists', '6 Months Support'].map((tag) => (
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
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p 
                className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.4))' }}
              >
                Ideas Rising → Solutions Launching → Africa Transforming
              </p>
            </div>
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

export default LaunchPadHero;