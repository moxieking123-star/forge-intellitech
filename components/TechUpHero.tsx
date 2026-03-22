// components/TechUpHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Badge } from './Badge';

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
      pathway: number; // 0: undecided, 1: builder, 2: strategist, 3: storyteller
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
        case 1: return { x: width * 0.85, y: height * 0.2, color: colors.teal }; // Builder
        case 2: return { x: width * 0.85, y: height * 0.5, color: colors.green }; // Strategist
        case 3: return { x: width * 0.85, y: height * 0.8, color: colors.purple }; // Storyteller
        default: return { x: width * 0.5, y: height * 0.5, color: colors.teal };
      }
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Background grid (like a classroom)
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
        // Lane
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

        // Destination circle
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

        // Label
        ctx.font = 'bold 10px system-ui';
        ctx.textAlign = 'right';
        ctx.fillStyle = pathway.color;
        ctx.fillText(pathway.label, width * 0.88, pathway.y + 4);
      });

      // Central hub (school/foundation)
      const hubX = width * 0.35;
      const hubY = height * 0.5;
      const hubRadius = 50;

      // Hub glow
      const hubGlow = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, hubRadius * 2);
      hubGlow.addColorStop(0, 'rgba(20, 184, 184, 0.2)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(hubX, hubY, hubRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      // Hub circle
      ctx.beginPath();
      ctx.arc(hubX, hubY, hubRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(20, 184, 184, 0.1)';
      ctx.fill();
      ctx.strokeStyle = colors.teal;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hub label
      ctx.font = 'bold 12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('FOUNDATION', hubX, hubY - 8);
      ctx.font = '10px system-ui';
      ctx.fillStyle = colors.teal;
      ctx.fillText('JSS1-JSS3', hubX, hubY + 8);

      // Update and draw students
      students.forEach((student, i) => {
        // Assign pathway based on progress
        if (student.progress > 0.5 && student.pathway === 0) {
          student.pathway = (i % 3) + 1;
        }

        const target = getPathwayTarget(student.pathway);
        
        // Progressive movement
        if (student.pathway > 0) {
          student.targetX = target.x;
          student.targetY = target.y;
          student.color = target.color;
        } else {
          student.targetX = hubX + Math.cos(time + i) * 30;
          student.targetY = hubY + Math.sin(time + i) * 20;
        }

        // Smooth movement
        student.x += (student.targetX - student.x) * 0.01;
        student.y += (student.targetY - student.y) * 0.01;

        // Wobble
        const wobble = Math.sin(time * 2 + student.wobblePhase) * 3;
        const drawX = student.x + wobble;
        const drawY = student.y + Math.cos(time * 1.5 + student.wobblePhase) * 2;

        // Progress update
        student.progress += 0.001;
        if (student.progress > 1) student.progress = 0;

        // Emit knowledge particles
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

        // Draw student glow
        const studentGlow = ctx.createRadialGradient(
          drawX, drawY, 0,
          drawX, drawY, student.size * 2
        );
        studentGlow.addColorStop(0, student.color + '40');
        studentGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(drawX, drawY, student.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = studentGlow;
        ctx.fill();

        // Draw student
        ctx.beginPath();
        ctx.arc(drawX, drawY, student.size, 0, Math.PI * 2);
        ctx.fillStyle = student.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(drawX - student.size * 0.25, drawY - student.size * 0.25, student.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Connection line to target
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

      // Status text
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
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#14B8B8]/10 via-transparent to-[#52B788]/10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">🎓</span>
              <Badge status="active" pulse>Flagship Programme</Badge>
            </div>

            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ color: 'var(--hero-text)' }}
            >
              TechUp
            </h1>

            <p 
              className="text-xl sm:text-2xl font-medium mb-4"
              style={{ color: '#14B8B8' }}
            >
              Training students to build technology,
              <br />not just use it.
            </p>

            <p 
              className="text-lg sm:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              A six-year journey built into schools — taking students from digital basics 
              all the way to career-ready skills. Three pathways. One mission.{' '}
              <span className="font-semibold" style={{ color: 'var(--hero-text)' }}>
                Create builders, not just users.
              </span>
            </p>

            {/* Pathway Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { name: 'Builder', color: '#14B8B8', icon: '💻' },
                { name: 'Strategist', color: '#52B788', icon: '📊' },
                { name: 'Storyteller', color: '#A855F7', icon: '🎨' },
              ].map((pathway) => (
                <div 
                  key={pathway.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ 
                    backgroundColor: pathway.color + '15',
                    border: `1px solid ${pathway.color}30`
                  }}
                >
                  <span>{pathway.icon}</span>
                  <span style={{ color: pathway.color }} className="font-medium text-sm">
                    {pathway.name}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-xl
                  bg-[#14B8B8] text-[#1A1A1A] font-bold text-base
                  transition-all duration-300
                  hover:bg-[#0E9494] hover:scale-[1.02]
                  shadow-lg shadow-[#14B8B8]/25
                "
              >
                Bring TechUp to Your School
              </Link>
              <a
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
                See How It Works
              </a>
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
    </section>
  );
};

export default TechUpHero;