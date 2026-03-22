// components/ContactHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

const ContactHero = () => {
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
      purple: '#A855F7',
    };

    // Message bubbles floating
    interface MessageBubble {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      color: string;
      type: 'send' | 'receive';
      progress: number;
      speed: number;
    }

    const bubbles: MessageBubble[] = [];

    const createBubble = () => {
      const isSend = Math.random() > 0.5;
      const startX = isSend ? width * 0.2 : width * 0.8;
      const endX = isSend ? width * 0.8 : width * 0.2;
      
      bubbles.push({
        x: startX,
        y: height * 0.3 + Math.random() * height * 0.4,
        targetX: endX,
        targetY: height * 0.3 + Math.random() * height * 0.4,
        size: 20 + Math.random() * 30,
        color: isSend ? colors.orange : colors.teal,
        type: isSend ? 'send' : 'receive',
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
      });
    };

    // Connection nodes
    interface Node {
      x: number;
      y: number;
      size: number;
      color: string;
      pulsePhase: number;
    }

    const nodes: Node[] = [
      { x: width * 0.2, y: height * 0.5, size: 30, color: colors.orange, pulsePhase: 0 },
      { x: width * 0.8, y: height * 0.5, size: 30, color: colors.teal, pulsePhase: Math.PI },
    ];

    // Ripples
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      color: string;
    }

    const ripples: Ripple[] = [];

    // Particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      color: string;
    }

    const particles: Particle[] = [];

    let time = 0;
    let lastBubbleTime = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Update node positions for responsiveness
      nodes[0].x = width * 0.2;
      nodes[0].y = height * 0.5;
      nodes[1].x = width * 0.8;
      nodes[1].y = height * 0.5;

      // Background grid
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.02)';
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

      // Draw connection line between nodes
      const gradient = ctx.createLinearGradient(nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y);
      gradient.addColorStop(0, colors.orange + '30');
      gradient.addColorStop(0.5, colors.purple + '20');
      gradient.addColorStop(1, colors.teal + '30');
      
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Animated dashes on line
      ctx.setLineDash([10, 20]);
      ctx.lineDashOffset = -time * 50;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Create new bubbles
      if (time - lastBubbleTime > 2) {
        createBubble();
        lastBubbleTime = time;
      }

      // Update and draw bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const bubble = bubbles[i];
        bubble.progress += bubble.speed;

        if (bubble.progress >= 1) {
          // Create ripple at destination
          ripples.push({
            x: bubble.targetX,
            y: bubble.targetY,
            radius: 0,
            maxRadius: 60,
            color: bubble.color,
          });
          
          // Create particles
          for (let j = 0; j < 6; j++) {
            particles.push({
              x: bubble.targetX,
              y: bubble.targetY,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 0.5) * 3,
              size: 2 + Math.random() * 3,
              life: 1,
              color: bubble.color,
            });
          }
          
          bubbles.splice(i, 1);
          continue;
        }

        // Curved path
        const t = bubble.progress;
        const controlY = bubble.y + (bubble.type === 'send' ? -80 : 80);
        const midX = (bubble.x + bubble.targetX) / 2;
        
        const currentX = (1 - t) * (1 - t) * bubble.x + 2 * (1 - t) * t * midX + t * t * bubble.targetX;
        const currentY = (1 - t) * (1 - t) * bubble.y + 2 * (1 - t) * t * controlY + t * t * bubble.targetY;

        // Draw bubble trail
        ctx.beginPath();
        ctx.moveTo(bubble.x, bubble.y);
        ctx.quadraticCurveTo(midX, controlY, currentX, currentY);
        ctx.strokeStyle = bubble.color + '30';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw bubble
        const bubbleGlow = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, bubble.size);
        bubbleGlow.addColorStop(0, bubble.color + '60');
        bubbleGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(currentX, currentY, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = bubbleGlow;
        ctx.fill();

        // Inner bubble
        ctx.beginPath();
        ctx.arc(currentX, currentY, bubble.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();

        // Message lines inside bubble
        const lineY = currentY - bubble.size * 0.2;
        ctx.beginPath();
        ctx.moveTo(currentX - bubble.size * 0.3, lineY);
        ctx.lineTo(currentX + bubble.size * 0.3, lineY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(currentX - bubble.size * 0.3, lineY + 6);
        ctx.lineTo(currentX + bubble.size * 0.15, lineY + 6);
        ctx.stroke();
      }

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += 2;

        const opacity = 1 - ripple.radius / ripple.maxRadius;
        if (opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.globalAlpha = opacity * 0.4;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.15 + 1;
        const nodeSize = node.size * pulse;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 3);
        glow.addColorStop(0, node.color + '40');
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(node.x - nodeSize * 0.25, node.y - nodeSize * 0.25, nodeSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Label
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(i === 0 ? 'YOU' : 'FORGE', node.x, node.y + nodeSize + 20);
      });

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
      className="relative min-h-[60vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#14B8B8]/5" />

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
              Contact Us
            </span>

            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--hero-text)' }}
            >
              Let's start a{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #FF8C42, #14B8B8)' }}
              >
                conversation
              </span>
            </h1>

            <p 
              className="text-lg sm:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              Whether you're interested in partnering with us, bringing our programs 
              to your school, or just want to say hello —{' '}
              <span className="font-semibold" style={{ color: 'var(--hero-text)' }}>
                we'd love to hear from you.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#contact-form"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-xl
                  bg-[#FF8C42] text-[#1A1A1A] font-bold
                  transition-all duration-300 hover:scale-[1.02]
                "
              >
                Send a Message
              </a>
              <a
                href="mailto:admin@forgeintellitech.com"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300 hover:scale-[1.02]
                "
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'var(--hero-text)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                Email Directly
              </a>
            </div>
          </div>

          {/* Animation */}
          <div className="relative h-[300px] lg:h-[400px] order-first lg:order-last">
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

export default ContactHero;