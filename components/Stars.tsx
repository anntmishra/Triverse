import React, { useEffect, useRef, useMemo } from "react";

interface StarsProps {
  count?: number;
  speed?: number;
  className?: string;
  color?: string;
  size?: [number, number]; // [min, max] in pixels
  twinkleFrequency?: number; // 0-1 value, higher means more twinkling
  colorVariation?: boolean; // Add slight color variations
  shootingStars?: boolean; // Enable shooting stars effect
}

const Stars: React.FC<StarsProps> = ({
  count = 150,
  speed = 0.5,
  className = "",
  color = "rgba(255, 255, 255, 0.8)",
  size = [1, 3],
  twinkleFrequency = 0.03,
  colorVariation = false,
  shootingStars = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      twinkle: number;
      twinkleSpeed: number;
      color: string;
    }>
  >([]);

  const shootingStarsRef = useRef<
    Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      active: boolean;
      angle: number;
    }>
  >([]);

  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const FPS_CAP = 60; // Cap framerate for smoother rendering
  const FRAME_MIN_TIME = 1000 / FPS_CAP;

  // Memoize the star color function to avoid recreating it on every render
  const getStarColor = useMemo(() => {
    return (baseColor: string): string => {
      if (!colorVariation) return baseColor;

      // Extract RGB from rgba format
      const rgbaMatch = baseColor.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
      );

      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1]);
        const g = parseInt(rgbaMatch[2]);
        const b = parseInt(rgbaMatch[3]);
        const a = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;

        // Add slight random variation to each component
        const variation = 30;
        const newR = Math.max(
          0,
          Math.min(255, r + (Math.random() - 0.5) * variation)
        );
        const newG = Math.max(
          0,
          Math.min(255, g + (Math.random() - 0.5) * variation)
        );
        const newB = Math.max(
          0,
          Math.min(255, b + (Math.random() - 0.5) * variation)
        );

        // Add a hue tint towards gold, purple, or white
        const hueChoice = Math.random();
        let finalR = newR,
          finalG = newG,
          finalB = newB;

        if (hueChoice < 0.3) {
          // Purple tint
          finalR = newR * 0.9;
          finalB = newB * 1.1;
        } else if (hueChoice < 0.6) {
          // Gold tint
          finalR = newR * 1.1;
          finalG = newG * 0.9;
        }

        return `rgba(${Math.floor(finalR)}, ${Math.floor(finalG)}, ${Math.floor(
          finalB
        )}, ${a})`;
      }

      return baseColor;
    };
  }, [colorVariation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Enable alpha optimization for better performance
    ctx.globalCompositeOperation = "lighter";

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear any existing stars and reinitialize
      starsRef.current = [];
      initStars();

      if (shootingStars) {
        shootingStarsRef.current = [];
        initShootingStars();
      }
    };

    const initStars = () => {
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * (size[1] - size[0]) + size[0];
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          opacity: Math.random() * 0.8 + 0.2,
          speed: (Math.random() + 0.2) * speed,
          twinkle: 0,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          color: getStarColor(color),
        });
      }
    };

    const initShootingStars = () => {
      const shootingStarCount = Math.floor(count * 0.01); // About 1% of regular star count

      for (let i = 0; i < shootingStarCount; i++) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2), // Start in top half
          length: Math.random() * 80 + 40, // Length of shooting star trail
          speed: Math.random() * 10 + 5,
          opacity: 0, // Start invisible
          active: false, // Not active initially
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 4, // Angle between PI/4 and PI/2
        });
      }
    };

    const drawStars = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Throttle frame rate for performance
      if (timestamp - lastFrameTimeRef.current < FRAME_MIN_TIME) {
        animationFrameRef.current = requestAnimationFrame(drawStars);
        return;
      }

      lastFrameTimeRef.current = timestamp;

      // Clear with optimized alpha for better performance
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars in batch for better performance
      ctx.save();

      // Draw regular stars
      starsRef.current.forEach((star) => {
        // Update twinkle value
        star.twinkle += star.twinkleSpeed;
        if (star.twinkle > 1 || star.twinkle < 0) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        // Calculate current opacity with twinkle effect
        const twinkleOpacity = Math.sin(star.twinkle * Math.PI) * 0.3 + 0.7;
        const currentOpacity = star.opacity * twinkleOpacity;

        // Random occasional twinkle based on twinkleFrequency
        const doTwinkle = Math.random() < twinkleFrequency;
        const finalRadius = doTwinkle
          ? star.radius * (1 + Math.random() * 0.5)
          : star.radius;

        // Draw the star
        ctx.beginPath();
        ctx.arc(star.x, star.y, finalRadius, 0, Math.PI * 2);

        // Use star's specific color
        const starColor = star.color.replace(")", `, ${currentOpacity})`);
        ctx.fillStyle = starColor;
        ctx.fill();

        // Move star
        star.y += star.speed;

        // If star goes off screen, reset it to the top
        if (star.y > canvas.height) {
          star.y = -10;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars with optimizations
      if (shootingStars) {
        // Less frequent shooting star creation for better performance
        if (Math.random() < 0.005) {
          const inactiveStar = shootingStarsRef.current.find(
            (star) => !star.active
          );
          if (inactiveStar) {
            inactiveStar.active = true;
            inactiveStar.opacity = 1;
            inactiveStar.x = Math.random() * canvas.width;
            inactiveStar.y = Math.random() * (canvas.height / 3);
            inactiveStar.angle = Math.PI / 4 + (Math.random() * Math.PI) / 4;
          }
        }

        // Draw and update active shooting stars
        shootingStarsRef.current.forEach((star) => {
          if (!star.active) return;

          // Calculate end points of the shooting star
          const endX = star.x + Math.cos(star.angle) * star.length;
          const endY = star.y + Math.sin(star.angle) * star.length;

          // Create gradient for tail
          const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

          // Draw the shooting star
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Move shooting star
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;

          // Fade out as it moves
          star.opacity -= 0.02;

          // Reset if it's out of bounds or faded out
          if (
            star.x > canvas.width ||
            star.y > canvas.height ||
            star.opacity <= 0
          ) {
            star.active = false;
          }
        });
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(drawStars);
    };

    resizeCanvas();

    // Use passive event listener for better performance
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(drawStars);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    count,
    speed,
    color,
    size,
    twinkleFrequency,
    shootingStars,
    getStarColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`stars-canvas ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        willChange: "transform", // Hardware acceleration hint
        transform: "translateZ(0)",
      }}
    />
  );
};

// Prevent unnecessary re-renders
export default React.memo(Stars);
