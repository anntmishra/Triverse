import React, { useState, useEffect, useRef } from "react";
import TeamPage from "./TeamPage";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const TeamPageWrapper: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Track mouse movement for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize canvas particles
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle settings
    const particles: any[] = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: `rgba(234, 142, 234, ${Math.random() * 0.5 + 0.1})`,
        velocity: {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * 0.5 - 0.25,
        },
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Move particles
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="team-page-container">
      <Head>
        <title>Our Teams | Triverse</title>
        <meta
          name="description"
          content="Meet the talented team members behind Triverse - the innovative tech community driving the future"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Particle background */}
      <canvas ref={canvasRef} className="particle-canvas"></canvas>

      {/* Enhanced background with better colors */}
      <div className="background-layer">
        <div
          className="img-background"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${
              mousePosition.y * -20
            }px)`,
          }}
        ></div>
        <div className="light-beam-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="light-beam"
              style={{
                left: `${(i + 1) * 20 - 10}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="color-orbs">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="color-orb"
              style={{
                left: `${i * 30 + 20}%`,
                top: `${i % 2 === 0 ? 20 : 70}%`,
                animationDelay: `${i * 0.7}s`,
                background:
                  i === 0
                    ? "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.4), rgba(147, 51, 234, 0.01) 70%)"
                    : i === 1
                    ? "radial-gradient(circle at 30% 30%, rgba(61, 90, 254, 0.4), rgba(61, 90, 254, 0.01) 70%)"
                    : "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.4), rgba(236, 72, 153, 0.01) 70%)",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Background overlay gradient */}
      <div className="background-overlay"></div>
      <div className="vignette-effect"></div>

      <Link href="/" className="back-link">
        <ChevronLeft className="back-icon" />
        <span>Back to Home</span>
      </Link>

      <div className={`page-content ${isLoaded ? "fade-in" : ""}`}>
        <TeamPage />
      </div>

      <Footer />

      <style jsx>{`
        .team-page-container {
          position: relative;
          min-height: 100vh;
          background-color: #0a0a1a;
          background-image: linear-gradient(
            to bottom,
            #0f0f2d,
            #191945,
            #111133
          );
          overflow-x: hidden;
        }

        .particle-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .background-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .img-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at bottom,
            #1b2735 0%,
            #090a0f 100%
          );
          opacity: 0.7;
          transition: transform 0.3s ease-out;
          will-change: transform;
        }

        .light-beam-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .light-beam {
          position: absolute;
          width: 5%;
          height: 100vh;
          background: linear-gradient(
            to bottom,
            rgba(147, 51, 234, 0),
            rgba(147, 51, 234, 0.05) 15%,
            rgba(147, 51, 234, 0.1) 40%,
            rgba(147, 51, 234, 0.05) 80%,
            rgba(147, 51, 234, 0)
          );
          transform: skewX(-15deg);
          animation: lightBeam 8s infinite ease-in-out;
          opacity: 0;
          filter: blur(5px);
        }

        .color-orbs {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .color-orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
          mix-blend-mode: screen;
          animation: orbFloat 15s infinite ease-in-out;
          z-index: -1;
        }

        @keyframes orbFloat {
          0%,
          100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-50px) translateX(30px) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes lightBeam {
          0%,
          100% {
            opacity: 0;
            transform: skewX(-15deg) translateY(0);
          }
          10%,
          90% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
            transform: skewX(-15deg) translateY(-30px);
          }
        }

        .background-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at center,
            rgba(15, 15, 35, 0.3) 0%,
            rgba(10, 10, 25, 0.8) 100%
          );
          z-index: -1;
        }

        .vignette-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .back-link {
          position: fixed;
          top: 2rem;
          left: 2rem;
          display: flex;
          align-items: center;
          color: white;
          background-color: rgba(74, 144, 226, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          z-index: 100;
        }

        .back-link:hover {
          background-color: rgba(74, 144, 226, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .back-icon {
          margin-right: 0.5rem;
        }

        .page-content {
          position: relative;
          z-index: 1;
          opacity: 0;
        }

        .fade-in {
          animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .back-link {
            top: 1.5rem;
            left: 1.5rem;
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPageWrapper;
