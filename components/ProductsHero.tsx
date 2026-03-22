// components/ProductsHero.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

const ProductsHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    { id: 'techup', name: 'TechUp', icon: '🎓', color: '#14B8B8', category: 'Education' },
    { id: 'launchpad', name: 'LaunchPad', icon: '🚀', color: '#FF8C42', category: 'Incubation' },
    { id: 'bitebank', name: 'BiteBank', icon: '🍽️', color: '#52B788', category: 'Food' },
    { id: 'trego', name: 'Trego', icon: '🚌', color: '#FFD54F', category: 'Transport' },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
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

    interface ProductNode {
      x: number;
      y: number;
      angle: number;
      color: string;
      size: number;
    }

    const productNodes: ProductNode[] = products.map((p, i) => ({
      x: 0,
      y: 0,
      angle: (i / products.length) * Math.PI * 2,
      color: p.color,
      size: 30,
    }));

    interface ConnectionLine {
      from: number;
      to: number;
      progress: number;
      direction: number;
    }

    const connections: ConnectionLine[] = [
      { from: 0, to: 1, progress: 0, direction: 1 },
      { from: 1, to: 2, progress: 0.33, direction: 1 },
      { from: 2, to: 3, progress: 0.66, direction: 1 },
      { from: 3, to: 0, progress: 0.5, direction: 1 },
      { from: 0, to: 2, progress: 0.25, direction: 1 },
      { from: 1, to: 3, progress: 0.75, direction: 1 },
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      angle: number;
      distance: number;
      speed: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: 0,
        y: 0,
        size: 1.5 + Math.random() * 2,
        color: products[Math.floor(Math.random() * products.length)].color,
        angle: Math.random() * Math.PI * 2,
        distance: 80 + Math.random() * 80,
        speed: 0.003 + Math.random() * 0.005,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseRadius = Math.min(width, height) * 0.28;

      // Background mesh
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.02)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * width, cy + Math.sin(angle) * height);
        ctx.stroke();
      }

      // Central hub
      const hubPulse = Math.sin(time * 2) * 0.1 + 1;
      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * hubPulse);
      hubGlow.addColorStop(0, 'rgba(255, 140, 66, 0.2)');
      hubGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * hubPulse, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 140, 66, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 140, 66, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('FORGE', cx, cy + 5);

      // Update product node positions
      productNodes.forEach((node, i) => {
        node.angle += 0.003;
        node.x = cx + Math.cos(node.angle) * baseRadius;
        node.y = cy + Math.sin(node.angle) * baseRadius * 0.7;
      });

      // Draw connections
      connections.forEach((conn) => {
        conn.progress += 0.005 * conn.direction;
        if (conn.progress > 1 || conn.progress < 0) {
          conn.direction *= -1;
        }

        const from = productNodes[conn.from];
        const to = productNodes[conn.to];
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, from.color + '20');
        gradient.addColorStop(1, to.color + '20');
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Flowing particle
        const px = from.x + (to.x - from.x) * conn.progress;
        const py = from.y + (to.y - from.y) * conn.progress;
        const opacity = Math.sin(conn.progress * Math.PI);
        
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        ctx.fill();
      });

      // Draw product nodes
      productNodes.forEach((node, i) => {
        const isActive = i === activeProduct;
        const pulse = Math.sin(time * 3 + i) * 0.1 + 1;
        const nodeSize = node.size * (isActive ? 1.3 * pulse : 1);

        // Connection to center
        const centerGrad = ctx.createLinearGradient(cx, cy, node.x, node.y);
        centerGrad.addColorStop(0, 'transparent');
        centerGrad.addColorStop(1, node.color + (isActive ? '40' : '20'));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = centerGrad;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        // Glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize * 2.5);
        glow.addColorStop(0, node.color + (isActive ? '50' : '25'));
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.arc(node.x - nodeSize * 0.25, node.y - nodeSize * 0.25, nodeSize * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();

        // Icon
        ctx.font = `${nodeSize * 0.8}px system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(products[i].icon, node.x, node.y + 2);

        // Label
        if (isActive) {
          ctx.font = 'bold 12px system-ui';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillText(products[i].name, node.x, node.y + nodeSize + 18);
          ctx.font = '10px system-ui';
          ctx.fillStyle = node.color;
          ctx.fillText(products[i].category, node.x, node.y + nodeSize + 32);
        }
      });

      // Ambient particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.x = cx + Math.cos(p.angle) * p.distance;
        p.y = cy + Math.sin(p.angle) * p.distance * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3 + Math.sin(time + p.angle) * 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isReducedMotion, activeProduct]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/5 via-transparent to-[#14B8B8]/5" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <div>
            <span 
              className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wider rounded-full"
              style={{ 
                color: '#FF8C42',
                backgroundColor: 'rgba(255, 140, 66, 0.1)',
                border: '1px solid rgba(255, 140, 66, 0.2)'
              }}
            >
              Our Products
            </span>

            <h1 
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--hero-text)' }}
            >
              We build things that{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #FF8C42, #FFD54F, #14B8B8)' }}
              >
                actually work here.
              </span>
            </h1>

            <p 
              className="text-lg sm:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--hero-text-secondary)' }}
            >
              Every product solves a real problem — in education, business, food, or transport.
              These aren't just apps.{' '}
              <span className="font-semibold" style={{ color: 'var(--hero-text)' }}>
                They're foundations — built for the real Africa.
              </span>
            </p>

            {/* Product Selector */}
            <div className="flex flex-wrap gap-2 mb-8">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(index)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold
                    transition-all duration-300
                    ${activeProduct === index ? 'scale-105' : 'opacity-60 hover:opacity-90'}
                  `}
                  style={{
                    backgroundColor: activeProduct === index ? product.color : 'rgba(255,255,255,0.08)',
                    color: activeProduct === index ? '#1A1A1A' : 'var(--hero-text)',
                    boxShadow: activeProduct === index ? `0 6px 24px ${product.color}40` : 'none',
                  }}
                >
                  <span>{product.icon}</span>
                  <span>{product.name}</span>
                </button>
              ))}
            </div>

            <a
              href={`#${products[activeProduct].id}`}
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-xl font-semibold
                transition-all duration-300 hover:scale-[1.02]
              "
              style={{
                backgroundColor: products[activeProduct].color,
                color: '#1A1A1A',
              }}
            >
              Learn about {products[activeProduct].name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
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

export default ProductsHero;