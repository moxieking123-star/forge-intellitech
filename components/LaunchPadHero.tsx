// components/LaunchPadHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Counter data
const counters = [
  { value: 0, target: 50, suffix: '+', label: 'Ideas Supported', color: '#FF8C42' },
  { value: 0, target: 10, suffix: 'M+', label: 'Naira Deployed', color: '#14B8B8' },
  { value: 0, target: 0, suffix: '%', label: 'Equity Taken', color: '#52B788' },
  { value: 0, target: 12, suffix: '', label: 'Month Program', color: '#FFD54F' },
];

const LaunchPadHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [countedValues, setCountedValues] = useState(counters.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  // Check reduced motion preference
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
          
          // Animate each counter
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

  // Canvas animation - Rocket/Launch visualization
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

    // Launch path particles
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
    const colors = ['#FF8C42', '#14B8B8', '#52B788', '#FFD54F'];

    // Orbit rings
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

    // Rising idea nodes
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

    // Spark bursts
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

      // === BACKGROUND GRID ===
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

      // === ORBIT RINGS ===
      orbitRings.forEach((ring) => {
        ring.rotation += ring.speed;

        // Draw orbit path
        ctx.beginPath();
        ctx.ellipse(cx, cy, ring.radius, ring.radius * 0.4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color + '15';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw orbit dots
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

      // === CENTRAL LAUNCHPAD ===
      // Platform glow
      const platformGlow = ctx.createRadialGradient(cx, cy + 30, 0, cx, cy + 30, 100);
      platformGlow.addColorStop(0, 'rgba(255, 140, 66, 0.2)');
      platformGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.ellipse(cx, cy + 30, 100, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = platformGlow;
      ctx.fill();

      // Platform base
      ctx.beginPath();
      ctx.ellipse(cx, cy + 30, 60, 15, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 140, 66, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#FF8C42';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Central beacon
      const beaconPulse = Math.sin(time * 3) * 0.3 + 0.7;
      const beaconGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 * beaconPulse);
      beaconGlow.addColorStop(0, 'rgba(255, 140, 66, 0.4)');
      beaconGlow.addColorStop(0.5, 'rgba(255, 140, 66, 0.15)');
      beaconGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 50 * beaconPulse, 0, Math.PI * 2);
      ctx.fillStyle = beaconGlow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FF8C42';
      ctx.fill();

      // Core highlight
      ctx.beginPath();
      ctx.arc(cx - 6, cy - 6, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();

      // Launchpad text
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('LP', cx, cy + 4);

      // === RISING IDEA NODES ===
      // Spawn new nodes
      if (time - lastNodeSpawn > 1.5) {
        createIdeaNode();
        lastNodeSpawn = time;
      }

      // Update and draw nodes
      for (let i = ideaNodes.length - 1; i >= 0; i--) {
        const node = ideaNodes[i];
        node.y -= node.speed;
        node.x += Math.sin(time * 2 + node.wobblePhase) * 0.5;
        
        // Create trail particles
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

        // Draw node glow
        const nodeGlow = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.size * 2
        );
        nodeGlow.addColorStop(0, node.color + '40');
        nodeGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeGlow;
        ctx.fill();

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Inner light
        ctx.beginPath();
        ctx.arc(node.x - node.size * 0.2, node.y - node.size * 0.2, node.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        // Check if reached top - create spark burst
        if (node.y < cy - 50 && node.y > cy - 60) {
          createSparkBurst(node.x, node.y);
        }

        // Remove if off screen
        if (node.y < node.targetY) {
          ideaNodes.splice(i, 1);
        }
      }

      // === TRAIL PARTICLES ===
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

      // === SPARKS ===
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

      // === ENERGY BEAMS (from platform upward) ===
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

      // === STATUS INDICATORS ===
      const statuses = ['READY', 'FUNDED', 'LAUNCHING'];
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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#14B8B8]/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ========== LEFT SIDE: Content + Counters ========== */}
          <div>
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
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
                Applications Open
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--hero-text)' }}
            >
              Your idea.
              <br />
              <span className="text-[#FF8C42]">Your company.</span>
              <br />
              <span style={{ color: 'var(--hero-text-secondary)' }}>Our backing.</span>
            </h1>

            {/* Description */}
            <p 
              className="text-lg sm:text-xl leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              LaunchPad is where young Nigerian founders get real funding, real mentorship, 
              and real support — without giving up what they've built. 
              <span className="font-medium" style={{ color: 'var(--hero-text)' }}>
                {' '}We bet on you, not against you.
              </span>
            </p>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {counters.map((counter, index) => (
                <div 
                  key={counter.label}
                  className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div 
                    className="text-3xl sm:text-4xl font-bold mb-1"
                    style={{ color: counter.color }}
                  >
                    {countedValues[index]}{counter.suffix}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--hero-text-secondary)' }}
                  >
                    {counter.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/launchpad/apply"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  bg-[#FF8C42] text-[#1A1A1A] font-bold text-base
                  transition-all duration-300
                  hover:bg-[#E85D04] hover:scale-[1.02]
                  shadow-lg shadow-[#FF8C42]/25
                "
              >
                Apply Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#how-it-works"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl font-semibold
                  transition-all duration-300 hover:scale-[1.02]
                "
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'var(--hero-text)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* ========== RIGHT SIDE: Animation ========== */}
          <div className="relative h-[400px] lg:h-[500px]">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            />
            
            {/* Fallback/overlay text */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p 
                className="text-xs uppercase tracking-wider"
                style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.4))' }}
              >
                Ideas Rising → Products Launching
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="flex flex-col items-center gap-2">
          <span 
            className="text-xs uppercase tracking-wider"
            style={{ color: 'var(--hero-text-secondary)' }}
          >
            Discover More
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