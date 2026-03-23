// components/TechUpHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const TechUpHero = () => {
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
      teal: '#14B8B8',
      green: '#52B788',
      purple: '#A855F7',
      orange: '#FF8C42',
    };

    // Students as particles
    interface Student {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      pathway: number;
      progress: number;
      wobblePhase: number;
    }

    const students: Student[] = [];
    const studentCount = 15;
    
    const initStudents = () => {
      students.length = 0;
      for (let i = 0; i < studentCount; i++) {
        students.push({
          x: width * 0.1 + Math.random() * width * 0.15,
          y: height * 0.3 + Math.random() * height * 0.4,
          targetX: 0,
          targetY: 0,
          size: 6 + Math.random() * 4,
          color: colors.teal,
          pathway: 0,
          progress: Math.random(),
          wobblePhase: Math.random() * Math.PI * 2,
        });
      }
    };
    
    initStudents();

    // Knowledge particles
    interface KnowledgeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      color: string;
    }

    const knowledgeParticles: KnowledgeParticle[] = [];

    // Pathway destinations
    const getPathwayTarget = (pathway: number) => {
      switch (pathway) {
        case 1: return { x: width * 0.85, y: height * 0.2, color: colors.teal };
        case 2: return { x: width * 0.85, y: height * 0.5, color: colors.green };
        case 3: return { x: width * 0.85, y: height * 0.8, color: colors.purple };
        default: return { x: width * 0.5, y: height * 0.5, color: colors.teal };
      }
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Background grid
      ctx.strokeStyle = 'rgba(20, 184, 184, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw pathway lanes
      const pathways = [
        { y: height * 0.2, color: colors.teal, label: 'BUILDER' },
        { y: height * 0.5, color: colors.green, label: 'STRATEGIST' },
        { y: height * 0.8, color: colors.purple, label: 'STORYTELLER' },
      ];

      pathways.forEach((pathway, i) => {
        const gradient = ctx.createLinearGradient(width * 0.4, pathway.y, width * 0.9, pathway.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.3, pathway.color + '20');
        gradient.addColorStop(1, pathway.color + '40');
        
        ctx.beginPath();
        ctx.moveTo(width * 0.4, pathway.y - 25);
        ctx.lineTo(width * 0.9, pathway.y - 25);
        ctx.lineTo(width * 0.95, pathway.y);
        ctx.lineTo(width * 0.9, pathway.y + 25);
        ctx.lineTo(width * 0.4, pathway.y + 25);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        const pulse = Math.sin(time * 2 + i) * 0.15 + 1;
        const destGlow = ctx.createRadialGradient(
          width * 0.92, pathway.y, 0,
          width * 0.92, pathway.y, 30 * pulse
        );
        destGlow.addColorStop(0, pathway.color + '50');
        destGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(width * 0.92, pathway.y, 30 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = destGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(width * 0.92, pathway.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = pathway.color;
        ctx.fill();

        ctx.font = 'bold 10px system-ui';
        ctx.textAlign = 'right';
        ctx.fillStyle = pathway.color;
        ctx.fillText(pathway.label, width * 0.88, pathway.y + 4);
      });

      // Central hub
      const hubX = width * 0.35;
      const hubY = height * 0.5;
      const hubRadius = 50;

      const hubGlow = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, hubRadius * 2);
      hubGlow.addColorStop(0, 'rgba(20, 184, 184, 0.2)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(hubX, hubY, hubRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hubX, hubY, hubRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 184, 0.1)';
      ctx.fill();
      ctx.strokeStyle = colors.teal;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('FOUNDATION', hubX, hubY - 8);
      ctx.font = '10px system-ui';
      ctx.fillStyle = colors.teal;
      ctx.fillText('JSS1-JSS3', hubX, hubY + 8);

      // Update and draw students
      students.forEach((student, i) => {
        if (student.progress > 0.5 && student.pathway === 0) {
          student.pathway = (i % 3) + 1;
        }

        const target = getPathwayTarget(student.pathway);
        
        if (student.pathway > 0) {
          student.targetX = target.x;
          student.targetY = target.y;
          student.color = target.color;
        } else {
          student.targetX = hubX + Math.cos(time + i) * 30;
          student.targetY = hubY + Math.sin(time + i) * 20;
        }

        student.x += (student.targetX - student.x) * 0.01;
        student.y += (student.targetY - student.y) * 0.01;

        const wobble = Math.sin(time * 2 + student.wobblePhase) * 3;
        const drawX = student.x + wobble;
        const drawY = student.y + Math.cos(time * 1.5 + student.wobblePhase) * 2;

        student.progress += 0.001;
        if (student.progress > 1) student.progress = 0;

        if (Math.random() < 0.03) {
          knowledgeParticles.push({
            x: drawX,
            y: drawY,
            vx: (Math.random() - 0.5) * 1,
            vy: -Math.random() * 1.5,
            size: 2 + Math.random() * 2,
            life: 1,
            color: student.color,
          });
        }

        const studentGlow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, student.size * 2);
        studentGlow.addColorStop(0, student.color + '40');
        studentGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(drawX, drawY, student.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = studentGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(drawX, drawY, student.size, 0, Math.PI * 2);
        ctx.fillStyle = student.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(drawX - student.size * 0.25, drawY - student.size * 0.25, student.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        if (student.pathway > 0) {
          const lineGradient = ctx.createLinearGradient(drawX, drawY, student.targetX, student.targetY);
          lineGradient.addColorStop(0, student.color + '40');
          lineGradient.addColorStop(1, student.color + '10');
          ctx.beginPath();
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(student.targetX, student.targetY);
          ctx.strokeStyle = lineGradient;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 8]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Draw knowledge particles
      for (let i = knowledgeParticles.length - 1; i >= 0; i--) {
        const p = knowledgeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
          knowledgeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Flow arrows
      const arrowTime = (time * 0.5) % 1;
      for (let i = 0; i < 3; i++) {
        const t = (arrowTime + i * 0.33) % 1;
        const arrowX = hubX + hubRadius + (width * 0.5 - hubRadius) * t;
        const arrowY = hubY;
        const arrowOpacity = Math.sin(t * Math.PI);
        
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - 8, arrowY - 5);
        ctx.lineTo(arrowX - 8, arrowY + 5);
        ctx.closePath();
        ctx.fillStyle = `rgba(20, 184, 184, ${arrowOpacity * 0.5})`;
        ctx.fill();
      }

      ctx.font = '10px system-ui';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('6-YEAR JOURNEY', 20, height - 20);

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      initStudents();
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#14B8B8]/10 via-transparent to-[#52B788]/10" />

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
                backgroundColor: 'rgba(20, 184, 184, 0.1)',
                border: '1px solid rgba(20, 184, 184, 0.2)'
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8B8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14B8B8]"></span>
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--hero-text-secondary)' }}>
                🎓 In-School Digital Skills Program
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in-up"
              style={{ color: 'var(--hero-text)' }}
            >
              Tomorrow's world{' '}
              <span className="block sm:inline">
                <span className="bg-gradient-to-r from-[#14B8B8] via-[#52B788] to-[#A855F7] bg-clip-text text-transparent">
                  won't wait
                </span>
              </span>
              <span className="text-[#14B8B8]">.</span>
            </h1>

            {/* Powerful Subtitle */}
            <p 
              className="text-xl sm:text-2xl lg:text-3xl leading-snug mb-6 animate-fade-in-up font-medium"
              style={{ color: 'var(--hero-text)', animationDelay: '0.1s' }}
            >
              We're preparing this generation —{' '}
              <span className="text-[#52B788]">so Africa leads, not follows.</span>
            </p>

            {/* Strategic Quote */}
            <div 
              className="p-5 rounded-xl mb-8 animate-fade-in-up"
              style={{ 
                backgroundColor: 'rgba(20, 184, 184, 0.08)',
                borderLeft: '4px solid #14B8B8',
                animationDelay: '0.2s'
              }}
            >
              <p 
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: 'var(--hero-text)' }}
              >
                TechUp brings <span className="font-semibold text-[#14B8B8]">practicing tech professionals</span> directly 
                into schools — with complete curriculum, resources, and a 6-year pathway from basics to career-ready skills.
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link
                href="/contact"
                className="
                  group inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  bg-[#14B8B8] text-[#1A1A1A] font-bold text-base
                  transition-all duration-300 ease-out
                  hover:bg-[#0E9494] hover:scale-[1.02]
                  shadow-lg shadow-[#14B8B8]/20
                "
              >
                Bring TechUp to Your School
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
                href="#how-it-works"
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
                See How It Works
              </Link>
            </div>

            {/* Key Points */}
            <div 
              className="flex flex-wrap items-center gap-2 animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <span 
                className="text-xs uppercase tracking-wider font-medium"
                style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.5))' }}
              >
                We provide:
              </span>
              {['Expert Instructors', 'Full Curriculum', '70% Practical', 'All Resources'].map((tag) => (
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
              className="w-1.5 h-3 rounded-full animate-bounce bg-[#14B8B8]"
              style={{ animationDuration: '1.5s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechUpHero;