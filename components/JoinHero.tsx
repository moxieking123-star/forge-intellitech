// components/JoinHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

const JoinHero = () => {
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

    // Central hub representing Forge
    const hub = { x: 0, y: 0, size: 50 };

    // Orbiting opportunities (join options)
    interface Opportunity {
      angle: number;
      distance: number;
      size: number;
      color: string;
      label: string;
      speed: number;
      pulsePhase: number;
    }

    const opportunities: Opportunity[] = [
      { angle: 0, distance: 120, size: 25, color: colors.teal, label: 'Team', speed: 0.008, pulsePhase: 0 },
      { angle: Math.PI * 0.66, distance: 140, size: 22, color: colors.orange, label: 'Partner', speed: -0.006, pulsePhase: 1 },
      { angle: Math.PI * 1.33, distance: 130, size: 20, color: colors.green, label: 'Invest', speed: 0.007, pulsePhase: 2 },
    ];

    // Incoming talent particles
    interface TalentParticle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      progress: number;
      speed: number;
      trail: { x: number; y: number }[];
    }

    const talents: TalentParticle[] = [];

    const createTalent = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.max(width, height);
      const opportunity = opportunities[Math.floor(Math.random() * opportunities.length)];
      
      talents.push({
        x: hub.x + Math.cos(angle) * distance,
        y: hub.y + Math.sin(angle) * distance,
        targetX: hub.x + Math.cos(opportunity.angle) * opportunity.distance,
        targetY: hub.y + Math.sin(opportunity.angle) * opportunity.distance,
        size: 4 + Math.random() * 4,
        color: opportunity.color,
        progress: 0,
        speed: 0.008 + Math.random() * 0.008,
        trail: [],
      });
    };

    // Success bursts
    interface Burst {
      x: number;
      y: number;
      particles: { angle: number; distance: number; size: number }[];
      life: number;
      color: string;
    }

    const bursts: Burst[] = [];

    const createBurst = (x: number, y: number, color: string) => {
      const burst: Burst = {
        x,
        y,
        particles: [],
        life: 1,
        color,
      };
      
      for (let i = 0; i < 8; i++) {
        burst.particles.push({
          angle: (i / 8) * Math.PI * 2,
          distance: 0,
          size: 3 + Math.random() * 3,
        });
      }
      
      bursts.push(burst);
    };

    let time = 0;
    let lastTalentTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Update hub position
      hub.x = width * 0.5;
      hub.y = height * 0.5;

      // Background pattern
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.02)';
      ctx.lineWidth = 1;
      for (let r = 50; r < Math.max(width, height); r += 60) {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Create new talents
      if (time - lastTalentTime > 0.8) {
        createTalent();
        lastTalentTime = time;
      }

      // Draw orbit paths
      opportunities.forEach((opp) => {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, opp.distance, 0, Math.PI * 2);
        ctx.strokeStyle = opp.color + '15';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update and draw talents
      for (let i = talents.length - 1; i >= 0; i--) {
        const talent = talents[i];
        talent.progress += talent.speed;

        // Store trail
        talent.trail.push({ x: talent.x, y: talent.y });
        if (talent.trail.length > 15) talent.trail.shift();

        if (talent.progress >= 1) {
          createBurst(talent.targetX, talent.targetY, talent.color);
          talents.splice(i, 1);
          continue;
        }

        // Curved path to target
        const t = talent.progress;
        const startX = talent.trail[0]?.x || talent.x;
        const startY = talent.trail[0]?.y || talent.y;
        
        talent.x = startX + (talent.targetX - startX) * t;
        talent.y = startY + (talent.targetY - startY) * t;

        // Draw trail
        ctx.beginPath();
        talent.trail.forEach((point, idx) => {
          if (idx === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(talent.x, talent.y);
        ctx.strokeStyle = talent.color + '40';
        ctx.lineWidth = talent.size * 0.5;
        ctx.stroke();

        // Draw talent
        ctx.beginPath();
        ctx.arc(talent.x, talent.y, talent.size, 0, Math.PI * 2);
        ctx.fillStyle = talent.color;
        ctx.fill();
      }

      // Update and draw bursts
      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        burst.life -= 0.03;

        if (burst.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        burst.particles.forEach((p) => {
          p.distance += 2;
          const px = burst.x + Math.cos(p.angle) * p.distance;
          const py = burst.y + Math.sin(p.angle) * p.distance;

          ctx.beginPath();
          ctx.arc(px, py, p.size * burst.life, 0, Math.PI * 2);
          ctx.fillStyle = burst.color;
          ctx.globalAlpha = burst.life;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      }

      // Draw opportunities
      opportunities.forEach((opp, i) => {
        opp.angle += opp.speed;
        
        const x = hub.x + Math.cos(opp.angle) * opp.distance;
        const y = hub.y + Math.sin(opp.angle) * opp.distance;
        const pulse = Math.sin(time * 2 + opp.pulsePhase) * 0.15 + 1;
        const size = opp.size * pulse;

        // Connection to hub
        const lineGrad = ctx.createLinearGradient(hub.x, hub.y, x, y);
        lineGrad.addColorStop(0, 'rgba(255, 140, 66, 0.2)');
        lineGrad.addColorStop(1, opp.color + '30');
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
        glow.addColorStop(0, opp.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = opp.color;
        ctx.fill();

        // Label
        ctx.font = 'bold 10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(opp.label, x, y + size + 15);
      });

      // Draw central hub
      const hubPulse = Math.sin(time * 1.5) * 0.1 + 1;
      const hubSize = hub.size * hubPulse;

      // Hub glow
      const hubGlow = ctx.createRadialGradient(hub.x, hub.y, 0, hub.x, hub.y, hubSize * 2.5);
      hubGlow.addColorStop(0, 'rgba(255, 140, 66, 0.3)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, hubSize * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      // Hub circle
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, hubSize, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 140, 66, 0.15)';
      ctx.fill();
      ctx.strokeStyle = colors.orange;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Hub text
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillText('JOIN', hub.x, hub.y - 4);
      ctx.font = '10px system-ui';
      ctx.fillStyle = colors.orange;
      ctx.fillText('FORGE', hub.x, hub.y + 10);

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
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#52B788]/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left">
            <span 
              className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full"
              style={{ 
                color: '#FF8C42',
                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                border: '1px solid rgba(255, 140, 66, 0.2)'
              }}
            >
              Join Forge
            </span>

            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--hero-text)' }}
            >
              Be part of something{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #FF8C42, #52B788)' }}
              >
                meaningful
              </span>
            </h1>

            <p 
              className="text-lg sm:text-xl leading-relaxed mb-8"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              We're building the future of African technology — and we can't do it alone. 
              Whether you want to work with us, partner with us, or invest in our vision,{' '}
              <span className="font-semibold" style={{ color: 'var(--hero-text)' }}>
                there's a place for you at Forge.
              </span>
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {[
                { label: 'Join Team', href: '#talent', color: '#14B8B8' },
                { label: 'Partner', href: '#partners', color: '#FF8C42' },
                { label: 'Invest', href: '#investors', color: '#52B788' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: item.color + '15',
                    color: item.color,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {item.label}
                </a>
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

export default JoinHero;