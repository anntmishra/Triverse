import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useWindowSize } from "../hooks/useWindowSize"; // We'll create this hook

// Dynamically import heavy components
const Stars = dynamic(() => import("./Stars"), { ssr: false });
const Particles = dynamic(() => import("./Particles"), { ssr: false });

// Create a new custom hook (we'll define this below)
const useBackgroundSettings = () => {
  const { width } = useWindowSize();

  // Adjust particle and star counts based on screen size for better performance
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return useMemo(
    () => ({
      particles: {
        count: isMobile ? 80 : isTablet ? 140 : 200,
        spread: 20,
        speed: isMobile ? 0.03 : 0.05,
        size: isMobile ? 40 : 60,
      },
      midStars: {
        count: isMobile ? 100 : isTablet ? 200 : 300,
        speed: 0.02,
      },
      foregroundStars: {
        count: isMobile ? 50 : isTablet ? 100 : 150,
        speed: 0.05,
        shootingStars: !isMobile, // Disable shooting stars on mobile
      },
    }),
    [isMobile, isTablet]
  );
};

const BackgroundEffects: React.FC = () => {
  const settings = useBackgroundSettings();

  return (
    <div className="background-effects">
      {/* Deep space particles layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={settings.particles.count}
          particleSpread={settings.particles.spread}
          speed={settings.particles.speed}
          particleColors={["#925da1", "#d4c499", "#ea8eea", "#ffffff"]}
          alphaParticles={true}
          particleBaseSize={settings.particles.size}
          sizeRandomness={1.2}
          cameraDistance={30}
        />
      </div>

      {/* Mid-distance stars layer */}
      <Stars
        count={settings.midStars.count}
        speed={settings.midStars.speed}
        color="rgba(255, 255, 255, 0.7)"
        size={[1, 3]}
        className="stars-mid"
        twinkleFrequency={0.03}
        colorVariation={true}
        shootingStars={false}
      />

      {/* Foreground stars with shooting stars */}
      <Stars
        count={settings.foregroundStars.count}
        speed={settings.foregroundStars.speed}
        color="rgba(234, 142, 234, 0.8)"
        size={[1.5, 4]}
        className="stars-foreground"
        twinkleFrequency={0.05}
        colorVariation={true}
        shootingStars={settings.foregroundStars.shootingStars}
      />

      {/* Ambient glow effects */}
      <div className="nebula-glow top-left"></div>
      <div className="nebula-glow bottom-right"></div>
      <div className="nebula-glow center"></div>

      {/* Add scan lines for a tech feel */}
      <div className="scan-lines"></div>

      <style jsx>{`
        .background-effects {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .nebula-glow {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
          filter: blur(60px);
          will-change: opacity, transform;
          transform: translateZ(0);
        }

        .nebula-glow.top-left {
          top: -10%;
          left: -10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(
            circle,
            rgba(146, 93, 161, 0.8) 0%,
            rgba(146, 93, 161, 0) 70%
          );
          animation: pulse-slow 15s ease-in-out infinite alternate;
        }

        .nebula-glow.bottom-right {
          bottom: -15%;
          right: -15%;
          width: 60%;
          height: 60%;
          background: radial-gradient(
            circle,
            rgba(234, 142, 234, 0.6) 0%,
            rgba(234, 142, 234, 0) 70%
          );
          animation: pulse-slow 12s ease-in-out infinite alternate-reverse;
        }

        .nebula-glow.center {
          top: 30%;
          left: 40%;
          width: 70%;
          height: 70%;
          background: radial-gradient(
            circle,
            rgba(212, 196, 153, 0.2) 0%,
            rgba(212, 196, 153, 0) 70%
          );
          animation: pulse-slow 20s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1) translateZ(0);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.1) translateZ(0);
          }
        }

        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.02) 50%,
            rgba(0, 0, 0, 0) 100%
          );
          background-size: 100% 4px;
          z-index: 2;
          opacity: 0.3;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        @media (max-width: 768px) {
          .nebula-glow {
            opacity: 0.1;
          }

          .scan-lines {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
};

// Prevent unnecessary re-renders
export default React.memo(BackgroundEffects);
