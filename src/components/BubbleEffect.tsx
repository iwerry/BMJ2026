import { useEffect, useRef, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  wobbleSpeed: number;
  wobbleAmount: number;
  wobblePhase: number;
  isLanded: boolean;
  popping: boolean;
  popFrame: number;
}

interface WindGust {
  x: number;
  y: number;
  speed: number;
  direction: 'left' | 'right';
  opacity: number;
  length: number;
}

export default function BubbleEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const nextIdRef = useRef(0);
  const windGustsRef = useRef<WindGust[]>([]);
  const [windDirection, setWindDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let spawnTimer = 0;
    let windTimer = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize 25 bubbles at random positions on load to animate immediately
    const initBubbles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const initialBubbles: Bubble[] = [];

      for (let i = 0; i < 25; i++) {
        const radius = 8 + Math.random() * 16;
        const x = Math.random() * width;
        // Distribute y coordinates across the top 80% of the screen
        const y = Math.random() * (height * 0.7);
        const baseVy = 0.6 + Math.random() * 0.9;
        
        initialBubbles.push({
          id: nextIdRef.current++,
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: baseVy,
          baseVy,
          radius,
          opacity: 0, // Will fade in
          targetOpacity: 0.2 + Math.random() * 0.25,
          wobbleSpeed: 0.02 + Math.random() * 0.03,
          wobbleAmount: 2 + Math.random() * 4,
          wobblePhase: Math.random() * Math.PI * 2,
          isLanded: false,
          popping: false,
          popFrame: 0,
        });
      }
      bubblesRef.current = initialBubbles;
    };

    initBubbles();

    // Create a new bubble at the top
    const spawnBubble = (xPos?: number, yPos?: number) => {
      const width = window.innerWidth;
      const radius = 8 + Math.random() * 16;
      const x = xPos !== undefined ? xPos : Math.random() * width;
      const y = yPos !== undefined ? yPos : -radius - 5;
      const baseVy = 0.6 + Math.random() * 0.9;

      bubblesRef.current.push({
        id: nextIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: baseVy,
        baseVy,
        radius,
        opacity: 0,
        targetOpacity: 0.2 + Math.random() * 0.25,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmount: 2 + Math.random() * 4,
        wobblePhase: Math.random() * Math.PI * 2,
        isLanded: false,
        popping: false,
        popFrame: 0,
      });
    };

    // Trigger a wind gust sweep
    const triggerWind = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;

      // Spawn wind gusts lines for visual feedback
      const numGusts = 6 + Math.floor(Math.random() * 4);
      const newGusts: WindGust[] = [];
      
      for (let i = 0; i < numGusts; i++) {
        newGusts.push({
          x: Math.random() * (width * 0.4) + (width * 0.3), // center area start
          y: height - 120 - Math.random() * 150, // close to the footer/bottom
          speed: 8 + Math.random() * 6,
          direction: Math.random() > 0.5 ? 'left' : 'right',
          opacity: 0.6,
          length: 80 + Math.random() * 120,
        });
      }
      windGustsRef.current = newGusts;

      // Apply physical wind force to bubbles
      bubblesRef.current.forEach((b) => {
        // Landed bubbles get kicked up and sideways
        if (b.isLanded) {
          b.isLanded = false;
          // Determine side based on position relative to center
          const isLeft = b.x < width / 2;
          b.vx = isLeft ? -4 - Math.random() * 5 : 4 + Math.random() * 5;
          b.vy = -3 - Math.random() * 4; // pop upwards
        } else {
          // Free bubbles get pushed according to their side
          const isLeft = b.x < width / 2;
          b.vx += isLeft ? -2 - Math.random() * 3 : 2 + Math.random() * 3;
          b.vy -= 1 + Math.random() * 2;
        }
      });
    };

    // Main animation loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Wind Gusts
      windGustsRef.current = windGustsRef.current.filter((g) => {
        g.opacity -= 0.015;
        if (g.direction === 'left') {
          g.x -= g.speed;
        } else {
          g.x += g.speed;
        }

        if (g.opacity <= 0) return false;

        // Draw wind line
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          g.x, g.y, 
          g.x + (g.direction === 'left' ? g.length : -g.length), g.y
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${g.opacity * 0.4})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.moveTo(g.x, g.y);
        ctx.lineTo(g.x + (g.direction === 'left' ? -g.length : g.length), g.y + (Math.random() - 0.5) * 10);
        ctx.stroke();

        return true;
      });

      // 2. Update & Draw Bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => {
        // Fade in
        if (b.opacity < b.targetOpacity && !b.popping) {
          b.opacity += 0.02;
        }

        // Draw popping animation
        if (b.popping) {
          b.popFrame++;
          if (b.popFrame > 8) return false; // remove after 8 frames

          // Draw small popping particles (droplets)
          ctx.save();
          ctx.strokeStyle = `rgba(240, 180, 255, ${b.opacity * (1 - b.popFrame / 8)})`;
          ctx.lineWidth = 1;
          const numParticles = 6;
          const popRadius = b.radius * (1 + b.popFrame * 0.25);
          
          for (let i = 0; i < numParticles; i++) {
            const angle = (i / numParticles) * Math.PI * 2;
            const px = b.x + Math.cos(angle) * popRadius;
            const py = b.y + Math.sin(angle) * popRadius;
            
            ctx.beginPath();
            ctx.arc(px, py, 1, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.restore();
          return true;
        }

        // Standard movement logic
        if (!b.isLanded) {
          b.wobblePhase += b.wobbleSpeed;
          const wobbleX = Math.sin(b.wobblePhase) * b.wobbleAmount;
          
          b.x += b.vx + wobbleX * 0.08;
          b.y += b.vy;

          // Apply gentle drag
          b.vx *= 0.98;
          
          // Re-stabilize vertical velocity to base velocity
          b.vy = b.vy * 0.95 + b.baseVy * 0.05;

          // Check if landed at the bottom of the screen (simulating hitting the footer)
          const bottomMargin = 24; // Keep it slightly above the screen edge or footer bar
          if (b.y >= height - b.radius - bottomMargin) {
            b.y = height - b.radius - bottomMargin;
            b.isLanded = true;
            b.vx = 0;
            b.vy = 0;
          }
        } else {
          // Landed bubble wobble behavior
          b.wobblePhase += 0.01;
          // Soft horizontal sway while sitting at the bottom
          b.x += Math.sin(b.wobblePhase) * 0.15;
          
          // Make them stack up slightly by checking proximity to other landed bubbles
          bubblesRef.current.forEach((other) => {
            if (other.id !== b.id && other.isLanded && !other.popping) {
              const dx = b.x - other.x;
              const dy = b.y - other.y;
              const dist = Math.hypot(dx, dy);
              const minDist = b.radius + other.radius - 2; // slight overlap
              
              if (dist < minDist && dist > 0) {
                // Push away slightly
                const force = (minDist - dist) * 0.05;
                const angle = Math.atan2(dy, dx);
                b.x += Math.cos(angle) * force;
                // Accumulate vertically if overlapping too much
                if (Math.abs(dx) < b.radius) {
                  b.y -= 0.2;
                }
              }
            }
          });

          // Stay within boundary
          if (b.x < b.radius) b.x = b.radius;
          if (b.x > width - b.radius) b.x = width - b.radius;
        }

        // Check if out of bounds or popped by hitting walls during wind
        if (b.x < -b.radius || b.x > width + b.radius || b.y < -100) {
          return false; // remove
        }

        // Random popping chance (increases over time, or if hitting edges)
        if (Math.random() < 0.0003) {
          b.popping = true;
        }

        // Draw bubble
        ctx.save();
        ctx.globalAlpha = b.opacity;

        // Radial gradient for 3D translucent soapy sphere
        const strokeGrad = ctx.createRadialGradient(
          b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.15,
          b.x, b.y, b.radius
        );
        strokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
        strokeGrad.addColorStop(0.7, 'rgba(255, 200, 240, 0.15)'); // soft pink highlights
        strokeGrad.addColorStop(0.85, 'rgba(180, 220, 255, 0.25)'); // light blue shimmer
        strokeGrad.addColorStop(0.95, 'rgba(200, 255, 200, 0.3)');  // light green shimmer
        strokeGrad.addColorStop(1, 'rgba(255, 255, 255, 0.45)');

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        
        // Very subtle background tint inside the bubble
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fill();
        
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // White specular reflections (light glares)
        // Top-left main reflection
        const mainGlare = ctx.createRadialGradient(
          b.x - b.radius * 0.4, b.y - b.radius * 0.4, 0,
          b.x - b.radius * 0.4, b.y - b.radius * 0.4, b.radius * 0.25
        );
        mainGlare.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        mainGlare.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.4, b.y - b.radius * 0.4, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = mainGlare;
        ctx.fill();

        // Bottom-right secondary reflection
        const subGlare = ctx.createRadialGradient(
          b.x + b.radius * 0.45, b.y + b.radius * 0.45, 0,
          b.x + b.radius * 0.45, b.y + b.radius * 0.45, b.radius * 0.15
        );
        subGlare.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        subGlare.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(b.x + b.radius * 0.45, b.y + b.radius * 0.45, b.radius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = subGlare;
        ctx.fill();

        ctx.restore();
        return true;
      });

      // 3. Spawning rate
      spawnTimer++;
      // Spawn new bubbles periodically, capping total active bubbles to 75
      if (spawnTimer >= 35 && bubblesRef.current.filter(b => !b.popping).length < 75) {
        spawnTimer = 0;
        spawnBubble();
      }

      // 4. Wind Timer Check
      windTimer++;
      // Count landed bubbles
      const landedCount = bubblesRef.current.filter((b) => b.isLanded).length;
      
      // Trigger wind if we have 18+ bubbles landed, or every 12 seconds if at least 5 bubbles are landed
      if (landedCount >= 18 || (windTimer >= 720 && landedCount >= 5)) {
        windTimer = 0;
        triggerWind();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5, // Render above backgrounds (z-0) but behind content wrapper (z-20)
      }}
    />
  );
}
