// components/AnimatedHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Pipeline products for orbiting animation
const products = [
  { id: 'techup', name: 'TechUp', icon: '🎓', color: '#14B8B8', description: 'Educate' },
  { id: 'launchpad', name: 'LaunchPad', icon: '🚀', color: '#FF8C42', description: 'Incubate' },
  { id: 'bitebank', name: 'BiteBank', icon: '🍽️', color: '#52B788', description: 'Nourish' },
  { id: 'trego', name: 'Trego', icon: '🚌', color: '#ff4fd9', description: 'Connect' },
];

const AnimatedHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-cycle through products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation with orbiting pipeline
  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    // Center point for orbit - positioned to the right on desktop, center on mobile
    const getCenterX = () => width > 1024 ? width * 0.72 : width * 0.5;
    const getCenterY = () => height * 0.5;
    const getBaseOrbitRadius = () => {
      if (width < 640) return Math.min(width * 0.28, 100);
      if (width < 1024) return Math.min(width * 0.25, 150);
      return Math.min(width * 0.15, 180);
    };

    // Orbiting nodes
    interface OrbitNode {
      angle: number;
      speed: number;
      nodeRadius: number;
      orbitRadius: number;
      color: string;
      pulsePhase: number;
    }

    const createOrbitNodes = (): OrbitNode[] => {
      const baseRadius = getBaseOrbitRadius();
      return products.map((product, index) => ({
        angle: (index / products.length) * Math.PI * 2,
        speed: 0.006 + index * 0.0015,
        nodeRadius: width < 640 ? 14 + index * 2 : 20 + index * 3,
        orbitRadius: baseRadius + index * (width < 640 ? 25 : 40),
        color: product.color,
        pulsePhase: (index / products.length) * Math.PI * 2,
      }));
    };

    let orbitNodes = createOrbitNodes();

    // Floating question marks (subtle background)
    interface QuestionMark {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      speed: number;
      drift: number;
      rotation: number;
      rotationSpeed: number;
    }

    const createQuestionMarks = (): QuestionMark[] => {
      const marks: QuestionMark[] = [];
      const count = Math.floor(width / 120);
      for (let i = 0; i < count; i++) {
        marks.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: 40 + Math.random() * 60,
          baseOpacity: 0.02 + Math.random() * 0.03,
          speed: 0.12 + Math.random() * 0.2,
          drift: Math.random() * Math.PI * 2,
          rotation: Math.random() * 0.3 - 0.15,
          rotationSpeed: (Math.random() - 0.5) * 0.0008,
        });
      }
      return marks;
    };

    let questionMarks = createQuestionMarks();

    // Thinking figure particles (bottom left, subtle)
    interface ThinkingParticle {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      wobblePhase: number;
    }

    const createThinkingFigure = (): ThinkingParticle[] => {
      if (width < 768) return []; // Hide on mobile
      
      const particles: ThinkingParticle[] = [];
      const figureX = width * 0.06;
      const figureY = height * 0.75;
      
      // Abstract head
      const headRadius = 18;
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        particles.push({
          baseX: figureX + Math.cos(angle) * headRadius,
          baseY: figureY - 50 + Math.sin(angle) * headRadius,
          x: 0, y: 0,
          size: 2.5,
          opacity: 0.2,
          wobblePhase: i * 0.5,
        });
      }
      
      // Body suggestion
      for (let i = 0; i < 3; i++) {
        particles.push({
          baseX: figureX + (Math.random() - 0.5) * 10,
          baseY: figureY - 20 + i * 14,
          x: 0, y: 0,
          size: 2,
          opacity: 0.12,
          wobblePhase: i * 0.4,
        });
      }
      
      return particles;
    };

    let thinkingFigure = createThinkingFigure();

    // Corner glow animations
    interface CornerGlow {
      x: number;
      y: number;
      baseSize: number;
      phase: number;
      color: string;
    }

    const createCornerGlows = (): CornerGlow[] => [
      { x: 0, y: 0, baseSize: width * 0.25, phase: 0, color: '#14B8B8' },
      { x: width, y: 0, baseSize: width * 0.2, phase: Math.PI * 0.5, color: '#FF8C42' },
      { x: width, y: height, baseSize: width * 0.28, phase: Math.PI, color: '#52B788' },
      { x: 0, y: height, baseSize: width * 0.18, phase: Math.PI * 1.5, color: '#FFD54F' },
    ];

    let cornerGlows = createCornerGlows();

    // Connection particles
    interface ConnectionParticle {
      progress: number;
      fromNode: number;
      speed: number;
      size: number;
    }

    const connectionParticles: ConnectionParticle[] = [];
    for (let i = 0; i < 6; i++) {
      connectionParticles.push({
        progress: i / 6,
        fromNode: Math.floor(Math.random() * products.length),
        speed: 0.004 + Math.random() * 0.003,
        size: 2 + Math.random() * 2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const cx = getCenterX();
      const cy = getCenterY();

      // === CORNER GLOW ANIMATIONS ===
      cornerGlows.forEach((corner) => {
        const pulse = Math.sin(time * 0.3 + corner.phase) * 0.25 + 0.75;
        const size = corner.baseSize * pulse;
        
        const gradient = ctx.createRadialGradient(
          corner.x, corner.y, 0,
          corner.x, corner.y, size
        );
        gradient.addColorStop(0, corner.color + '10');
        gradient.addColorStop(0.5, corner.color + '05');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // === FLOATING QUESTION MARKS ===
      questionMarks.forEach((qm) => {
        qm.y -= qm.speed;
        qm.x += Math.sin(time * 0.4 + qm.drift) * 0.3;
        qm.rotation += qm.rotationSpeed;
        
        if (qm.y < -qm.size) {
          qm.y = height + qm.size;
          qm.x = Math.random() * width;
        }

        const opacity = qm.baseOpacity * (0.6 + Math.sin(time * 0.8 + qm.drift) * 0.4);
        
        ctx.save();
        ctx.translate(qm.x, qm.y);
        ctx.rotate(qm.rotation);
        ctx.globalAlpha = opacity;
        ctx.font = `bold ${qm.size}px Georgia, serif`;
        ctx.fillStyle = '#FF8C42';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, 0);
        ctx.restore();
      });

      // === THINKING FIGURE ===
      if (thinkingFigure.length > 0) {
        const figureX = width * 0.06;
        const figureY = height * 0.75;
        
        thinkingFigure.forEach((p) => {
          const wobble = Math.sin(time * 1.2 + p.wobblePhase) * 2;
          p.x = p.baseX + wobble;
          p.y = p.baseY + Math.cos(time + p.wobblePhase) * 1.5;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 140, 66, ${p.opacity})`;
          ctx.fill();
        });

        // Thought bubbles
        for (let i = 0; i < 3; i++) {
          const t = (time * 0.4 + i * 0.5) % 2;
          const bubbleProgress = t / 2;
          const bubbleX = figureX + 20 + bubbleProgress * 50;
          const bubbleY = figureY - 70 - bubbleProgress * 35 + Math.sin(time * 1.5 + i) * 4;
          const bubbleSize = 3 + i * 1.5 - bubbleProgress * 2;
          const bubbleOpacity = (1 - bubbleProgress) * 0.25;
          
          if (bubbleSize > 0) {
            ctx.beginPath();
            ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 140, 66, ${bubbleOpacity})`;
            ctx.fill();
          }
        }
      }

      // === CENTER HUB - "FORGE ITS" ===
      // Outer glow
      const hubGlow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 100);
      hubGlow.addColorStop(0, 'rgba(255, 140, 66, 0.15)');
      hubGlow.addColorStop(0.5, 'rgba(255, 140, 66, 0.06)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      // Center circle with pulse
      const centerPulse = Math.sin(time * 1.8) * 0.08 + 1;
      const centerRadius = (width < 640 ? 35 : 50) * centerPulse;
      
      ctx.beginPath();
      ctx.arc(cx, cy, centerRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 140, 66, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // FORGE text
      ctx.save();
      ctx.font = `bold ${width < 640 ? 16 : 22}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('FORGE', cx, cy - 6);
      ctx.font = `600 ${width < 640 ? 9 : 11}px system-ui, -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 140, 66, 0.9)';
      ctx.fillText('ITS', cx, cy + 12);
      ctx.restore();

      // === ORBIT PATHS (subtle) ===
      orbitNodes.forEach((node) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, node.orbitRadius, node.orbitRadius * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${node.color}10`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // === ORBITING PIPELINE NODES ===
      orbitNodes.forEach((node, i) => {
        node.angle += node.speed;
        
        const x = cx + Math.cos(node.angle) * node.orbitRadius;
        const y = cy + Math.sin(node.angle) * node.orbitRadius * 0.7;
        
        const isActive = i === activeProduct;
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.12 + 1;
        const nodeSize = node.nodeRadius * (isActive ? 1.25 * pulse : 1);

        // Connection line to center
        const gradient = ctx.createLinearGradient(cx, cy, x, y);
        gradient.addColorStop(0, `${node.color}00`);
        gradient.addColorStop(0.6, `${node.color}${isActive ? '25' : '12'}`);
        gradient.addColorStop(1, `${node.color}${isActive ? '45' : '20'}`);
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        // Node glow
        const glowSize = nodeSize * (isActive ? 2.8 : 2);
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glow.addColorStop(0, node.color + (isActive ? '45' : '25'));
        glow.addColorStop(0.6, node.color + '08');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node body
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Inner highlight
        ctx.beginPath();
        ctx.arc(x - nodeSize * 0.25, y - nodeSize * 0.25, nodeSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Product icon
        ctx.font = `${nodeSize * 0.85}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(products[i].icon, x, y + 1);

        // Label for active product
        if (isActive && width >= 640) {
          ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fillText(products[i].name, x, y + nodeSize + 16);
          ctx.font = '10px system-ui';
          ctx.fillStyle = node.color;
          ctx.fillText(products[i].description, x, y + nodeSize + 30);
        }
      });

      // === CONNECTION PARTICLES ===
      connectionParticles.forEach((particle) => {
        particle.progress += particle.speed;
        if (particle.progress >= 1) {
          particle.progress = 0;
          particle.fromNode = (particle.fromNode + 1) % products.length;
        }

        const fromNode = orbitNodes[particle.fromNode];
        const toNode = orbitNodes[(particle.fromNode + 1) % products.length];
        
        const fromX = cx + Math.cos(fromNode.angle) * fromNode.orbitRadius;
        const fromY = cy + Math.sin(fromNode.angle) * fromNode.orbitRadius * 0.7;
        const toX = cx + Math.cos(toNode.angle) * toNode.orbitRadius;
        const toY = cy + Math.sin(toNode.angle) * toNode.orbitRadius * 0.7;
        
        const midX = cx + (fromX - cx + toX - cx) * 0.15;
        const midY = cy + (fromY - cy + toY - cy) * 0.15;
        
        const t = particle.progress;
        const x = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * midX + t * t * toX;
        const y = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * midY + t * t * toY;
        
        const opacity = Math.sin(t * Math.PI) * 0.5;
        
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // === AMBIENT RING PARTICLES ===
      for (let i = 0; i < 16; i++) {
        const angle = time * 0.15 + (i / 16) * Math.PI * 2;
        const distance = 140 + Math.sin(time * 0.8 + i) * 15;
        const px = cx + Math.cos(angle) * distance;
        const py = cy + Math.sin(angle) * distance * 0.7;
        const size = 1.2 + Math.sin(time * 1.5 + i) * 0.4;
        const opacity = 0.15 + Math.sin(time * 0.8 + i * 0.4) * 0.08;
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 66, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      orbitNodes = createOrbitNodes();
      questionMarks = createQuestionMarks();
      thinkingFigure = createThinkingFigure();
      cornerGlows = createCornerGlows();
    };

    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion, activeProduct]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      {/* ========== FULL BACKGROUND CANVAS ========== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        aria-hidden="true"
      />

      {/* ========== GRADIENT OVERLAYS FOR READABILITY ========== */}
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
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, 
              rgba(var(--hero-bg-rgb, 10,10,10), 0.3) 0%, 
              transparent 30%, 
              transparent 70%, 
              var(--hero-bg) 100%
            )
          `
        }}
      />

      {/* ========== MAIN CONTENT CONTAINER ========== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Eyebrow Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in"
            style={{ 
              backgroundColor: 'rgba(255, 140, 66, 0.1)',
              border: '1px solid rgba(255, 140, 66, 0.2)'
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52B788]"></span>
            </span>
            <span 
              className="text-sm font-medium"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              Building Africa's Technology Infrastructure
            </span>
          </div>

          {/* Main Question Headline */}
          <h1 
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in-up"
            style={{ color: 'var(--hero-text)' }}
          >
            What if Africa{' '}
            <span className="block sm:inline">
              <span className="bg-gradient-to-r from-[#FF8C42] via-[#FFD54F] to-[#14B8B8] bg-clip-text text-transparent">
                stopped importing
              </span>
            </span>
            {' '}its future
            <span className="text-[#FF8C42]">?</span>
          </h1>

          {/* Powerful Subtitle */}
          <p 
            className="text-xl sm:text-2xl lg:text-3xl leading-snug mb-6 animate-fade-in-up font-medium"
            style={{ color: 'var(--hero-text)', animationDelay: '0.1s' }}
          >
            And decides to ForgeIT —{' '}
            <span className="text-[#14B8B8]">one mind at a time.</span>
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
              className="text-base sm:text-lg italic leading-relaxed"
              style={{ color: 'var(--hero-text)' }}
            >
              "This is the infrastructure that breaks dependency and builds sovereignty by a generation whose Ancestors created civilisation."
            </p>
          </div>


          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              href="/about"
              className="
                group inline-flex items-center justify-center gap-2
                px-8 py-4 rounded-xl
                bg-[#FF8C42] text-[#1A1A1A] font-bold text-base
                transition-all duration-300 ease-out
                hover:bg-[#E85D04] hover:scale-[1.02]
                shadow-lg shadow-[#FF8C42]/20
              "
            >
              Discover Our Vision
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
              href="/contact"
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
              Partner With Us
            </Link>
          </div>

          {/* Audience Tags */}
          <div 
            className="flex flex-wrap items-center gap-2 animate-fade-in-up"
            style={{ animationDelay: '0.35s' }}
          >
            <span 
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: 'var(--hero-text-tertiary, rgba(255,255,255,0.5))' }}
            >
              Calling:
            </span>
            {['Investors', 'Parents', 'Educators', 'Government', 'Sponsors', 'Researchers'].map((tag) => (
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
      </div>

      {/* ========== SCROLL INDICATOR ========== */}
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
              className="w-1.5 h-3 rounded-full animate-bounce"
              style={{ 
                backgroundColor: products[activeProduct].color,
                animationDuration: '1.5s'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;