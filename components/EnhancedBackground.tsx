import React, { useEffect, useRef } from "react";

interface EnhancedBackgroundProps {
  intensity?: number;
  speed?: number;
}

const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  intensity = 1,
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulasRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      opacity: number;
      speed: number;
    }>
  >([]);

  const starsRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleState: number;
    }>
  >([]);

  const lightningRef = useRef({
    active: false,
    timer: 0,
    duration: 0,
    x: 0,
    y: 0,
    branches: [] as any[],
  });

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBackground();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize nebulas and stars
    const initBackground = () => {
      // Create nebula clouds
      nebulasRef.current = [];
      const nebulaCount = 5;
      const nebulaColors = [
        "rgba(146, 93, 161, 0.03)",
        "rgba(234, 142, 234, 0.03)",
        "rgba(212, 196, 153, 0.02)",
        "rgba(120, 70, 170, 0.02)",
        "rgba(80, 30, 110, 0.02)",
      ];

      for (let i = 0; i < nebulaCount; i++) {
        nebulasRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 300 + Math.random() * 500,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: 0.2 + Math.random() * 0.3,
          speed: (Math.random() - 0.5) * 0.1 * speed,
        });
      }

      // Create stars
      starsRef.current = [];
      const starCount = 200;

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: 0.4 + Math.random() * 0.6,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleState: Math.random() * Math.PI,
        });
      }
    };

    // Create a lightning effect
    const createLightning = () => {
      if (lightningRef.current.active) return;

      // 1 in 200 chance of lightning on each frame
      if (Math.random() < 0.005 * intensity) {
        lightningRef.current = {
          active: true,
          timer: 0,
          duration: 10 + Math.random() * 10,
          x: Math.random() * canvas.width,
          y: -50, // Start from above the viewport
          branches: createBranches(Math.random() * canvas.width, -50, 5),
        };
      }
    };

    const createBranches = (
      x: number,
      y: number,
      complexity: number
    ): any[] => {
      const branches = [];
      const branchCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < branchCount; i++) {
        const angle = Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 4;
        const length = 50 + Math.random() * 100;
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;

        const branch = {
          startX: x,
          startY: y,
          endX,
          endY,
          width: 2 + Math.random() * 3,
          alpha: 0.6 + Math.random() * 0.4,
          children:
            complexity > 0 ? createBranches(endX, endY, complexity - 1) : [],
        };

        branches.push(branch);
      }

      return branches;
    };

    const drawLightning = (branch: any, alpha: number) => {
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(branch.startX, branch.startY);
      ctx.lineTo(branch.endX, branch.endY);
      ctx.strokeStyle = `rgba(234, 142, 234, ${branch.alpha * alpha})`;
      ctx.lineWidth = branch.width;
      ctx.stroke();

      // Draw child branches
      branch.children.forEach((child: any) => {
        drawLightning(child, alpha);
      });
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      nebulasRef.current.forEach((nebula) => {
        // Update position
        nebula.x += nebula.speed;

        // Wrap around edges
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          nebula.x,
          nebula.y,
          0,
          nebula.x,
          nebula.y,
          nebula.radius
        );

        const colorBase = nebula.color.substring(
          0,
          nebula.color.lastIndexOf(",") + 1
        );
        gradient.addColorStop(0, nebula.color.replace("0.02", "0.1"));
        gradient.addColorStop(0.5, nebula.color);
        gradient.addColorStop(1, `${colorBase} 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw stars
      starsRef.current.forEach((star) => {
        // Update twinkle effect
        star.twinkleState += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinkleState) * 0.5 + 0.5;

        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Create/update lightning effect
      createLightning();

      if (lightningRef.current.active) {
        lightningRef.current.timer++;

        // Calculate alpha based on timer and duration
        const alpha =
          1 - lightningRef.current.timer / lightningRef.current.duration;

        // Draw all branches
        lightningRef.current.branches.forEach((branch: any) => {
          drawLightning(branch, alpha);
        });

        // Add glow overlay for lightning
        ctx.fillStyle = `rgba(234, 142, 234, ${0.1 * alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset lightning when duration is reached
        if (lightningRef.current.timer >= lightningRef.current.duration) {
          lightningRef.current.active = false;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, speed]);

  return (
    <div className="enhanced-background">
      <canvas ref={canvasRef} className="background-canvas" />

      {/* Add scan lines effect */}
      <div className="scan-lines"></div>

      {/* Add vignette effect */}
      <div className="vignette"></div>

      <style jsx>{`
        .enhanced-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .background-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.05) 1px,
            rgba(0, 0, 0, 0.05) 2px
          );
          pointer-events: none;
          opacity: 0.3;
          z-index: 1;
        }

        .vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at center,
            transparent 60%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default EnhancedBackground;
