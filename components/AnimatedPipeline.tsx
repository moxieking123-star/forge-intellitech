// components/AnimatedPipeline.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { IconLearn, IconLaunch, IconBuild, IconScale } from './icons/ForgeIcons';

const pipelineStages = [
  {
    stage: "01",
    title: "Learn",
    subtitle: "TechUp",
    description: "This is where it starts. Young people in classrooms learning to code, design, and think like builders.",
    color: "#14B8B8",
  },
  {
    stage: "02",
    title: "Create",
    subtitle: "LaunchPad",
    description: "Got an idea? Here's where it becomes real. Funding, mentors, and a community that wants you to win.",
    color: "#FF8C42",
  },
  {
    stage: "03",
    title: "Build",
    subtitle: "Products",
    description: "These ideas become actual products. BiteBank. Trego. Solutions born from understanding our own problems.",
    color: "#52B788",
  },
  {
    stage: "04",
    title: "Scale",
    subtitle: "Impact",
    description: "What works in Lagos works in Accra, Nairobi, Cairo. One solution, millions of lives changed.",
    color: "#FFD54F",
  },
];

const icons = [IconLearn, IconLaunch, IconBuild, IconScale];

export default function AnimatedPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through stages
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Canvas animation
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();

    // Particles flowing through pipeline
    interface Particle {
      x: number;
      y: number;
      progress: number;
      speed: number;
      size: number;
      stage: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: 0,
        y: 0,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        size: 2 + Math.random() * 3,
        stage: Math.floor(Math.random() * 4),
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const isMobile = width < 768;
      const stageCount = 4;

      if (isMobile) {
        // Vertical layout
        const startY = 50;
        const endY = height - 50;
        const centerX = width / 2;
        const stageSpacing = (endY - startY) / (stageCount - 1);

        // Draw main connecting line
        const gradient = ctx.createLinearGradient(centerX, startY, centerX, endY);
        gradient.addColorStop(0, '#14B8B8');
        gradient.addColorStop(0.33, '#FF8C42');
        gradient.addColorStop(0.66, '#52B788');
        gradient.addColorStop(1, '#FFD54F');

        ctx.beginPath();
        ctx.moveTo(centerX, startY);
        ctx.lineTo(centerX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Animated dashes
        ctx.beginPath();
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -time * 40;
        ctx.moveTo(centerX, startY);
        ctx.lineTo(centerX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw stage nodes
        for (let i = 0; i < stageCount; i++) {
          const y = startY + i * stageSpacing;
          const isActive = i === activeStage;
          const pulse = Math.sin(time * 3 + i) * 0.15 + 1;
          const nodeSize = (isActive ? 20 : 14) * pulse;

          // Glow
          const glow = ctx.createRadialGradient(centerX, y, 0, centerX, y, nodeSize * 2.5);
          glow.addColorStop(0, pipelineStages[i].color + (isActive ? '50' : '25'));
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(centerX, y, nodeSize * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Node
          ctx.beginPath();
          ctx.arc(centerX, y, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = pipelineStages[i].color;
          ctx.fill();
        }

        // Particles
        particles.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) {
            p.progress = 0;
            p.stage = (p.stage + 1) % 4;
          }

          const fromY = startY + p.stage * stageSpacing;
          const toY = startY + ((p.stage + 1) % 4) * stageSpacing;
          
          p.y = fromY + (toY - fromY) * p.progress;
          p.x = centerX + Math.sin(time * 2 + p.progress * Math.PI) * 15;

          const opacity = Math.sin(p.progress * Math.PI) * 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        });

      } else {
        // Horizontal layout
        const startX = 80;
        const endX = width - 80;
        const centerY = height / 2;
        const stageSpacing = (endX - startX) / (stageCount - 1);

        // Draw main connecting line with gradient
        const gradient = ctx.createLinearGradient(startX, centerY, endX, centerY);
        gradient.addColorStop(0, '#14B8B8');
        gradient.addColorStop(0.33, '#FF8C42');
        gradient.addColorStop(0.66, '#52B788');
        gradient.addColorStop(1, '#FFD54F');

        ctx.beginPath();
        ctx.moveTo(startX, centerY);
        ctx.lineTo(endX, centerY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.stroke();

        // Animated flowing dashes
        ctx.beginPath();
        ctx.setLineDash([10, 15]);
        ctx.lineDashOffset = -time * 50;
        ctx.moveTo(startX, centerY);
        ctx.lineTo(endX, centerY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw stage nodes
        for (let i = 0; i < stageCount; i++) {
          const x = startX + i * stageSpacing;
          const isActive = i === activeStage;
          const pulse = Math.sin(time * 3 + i) * 0.12 + 1;
          const nodeSize = (isActive ? 28 : 20) * pulse;

          // Outer glow
          const glow = ctx.createRadialGradient(x, centerY, 0, x, centerY, nodeSize * 3);
          glow.addColorStop(0, pipelineStages[i].color + (isActive ? '50' : '20'));
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(x, centerY, nodeSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Main node
          ctx.beginPath();
          ctx.arc(x, centerY, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = pipelineStages[i].color;
          ctx.fill();

          // Inner highlight
          ctx.beginPath();
          ctx.arc(x - nodeSize * 0.25, centerY - nodeSize * 0.25, nodeSize * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.fill();

          // Stage number
          ctx.font = `bold ${isActive ? 14 : 12}px system-ui`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#1A1A1A';
          ctx.fillText(`0${i + 1}`, x, centerY);
        }

        // Particles flowing between nodes
        particles.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) {
            p.progress = 0;
            p.stage = (p.stage + 1) % 4;
          }

          const fromX = startX + p.stage * stageSpacing;
          const toX = startX + ((p.stage + 1) % 4) * stageSpacing;
          
          p.x = fromX + (toX - fromX) * p.progress;
          p.y = centerY + Math.sin(time * 3 + p.progress * Math.PI * 2) * 20;

          const opacity = Math.sin(p.progress * Math.PI) * 0.8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible, activeStage]);

  const IconComponent = icons[activeStage];

  return (
    <section ref={sectionRef} className="section-padding bg-env-secondary overflow-hidden">
      <div className="container-forge">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-chapter-accent bg-chapter-accent-soft rounded-full border border-chapter-accent/20">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-env-primary mb-4">
            From <span className="text-[#14B8B8]">Learning</span> to{' '}
            <span className="text-[#FFD54F]">Leading</span>
          </h2>
          <p className="text-lg text-env-secondary max-w-2xl mx-auto">
            Think of it like a relay race. Each stage passes the baton to the next. 
            The student who learns today becomes the founder who changes things tomorrow.
          </p>
        </div>

        {/* Pipeline Animation Canvas */}
        <div className="relative h-[200px] md:h-[180px] mb-8">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pipelineStages.map((stage, index) => {
            const Icon = icons[index];
            const isActive = index === activeStage;
            
            return (
              <button
                key={stage.stage}
                onClick={() => setActiveStage(index)}
                className={`
                  relative text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-500
                  ${isActive 
                    ? 'bg-env-surface border-transparent scale-[1.02] shadow-xl' 
                    : 'bg-env-surface/50 border-env-border hover:border-env-border-hover hover:bg-env-surface'
                  }
                `}
                style={{
                  boxShadow: isActive ? `0 20px 40px ${stage.color}20` : undefined,
                  borderColor: isActive ? stage.color : undefined,
                }}
              >
                {/* Stage indicator */}
                <div 
                  className={`
                    absolute -top-3 left-5 px-2 py-0.5 text-xs font-bold rounded-full
                    transition-all duration-300
                  `}
                  style={{ 
                    backgroundColor: isActive ? stage.color : 'var(--env-bg-secondary)',
                    color: isActive ? '#1A1A1A' : 'var(--env-text-secondary)'
                  }}
                >
                  STAGE {stage.stage}
                </div>

                {/* Icon */}
                <div className="mb-4 mt-2">
                  <Icon size={48} color={stage.color} />
                </div>

                {/* Content */}
                <h3 
                  className="text-xl font-bold mb-1 transition-colors duration-300"
                  style={{ color: isActive ? stage.color : 'var(--env-text-primary)' }}
                >
                  {stage.title}
                </h3>
                <p 
                  className="text-sm font-medium mb-3"
                  style={{ color: stage.color }}
                >
                  {stage.subtitle}
                </p>
                <p className="text-sm text-env-secondary leading-relaxed">
                  {stage.description}
                </p>

                {/* Active indicator bar */}
                <div 
                  className="absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-500"
                  style={{ 
                    width: isActive ? '100%' : '0%',
                    backgroundColor: stage.color
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom connector text */}
        <div className="mt-10 text-center">
          <p className="text-lg text-env-primary">
            See the pattern?{' '}
            <span className="text-chapter-accent font-medium">
              Each success creates the next opportunity.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}