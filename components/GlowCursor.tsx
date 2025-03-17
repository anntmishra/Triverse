import React, { useEffect, useRef } from "react";

interface GlowCursorProps {
  color?: string;
  size?: number;
  trailColor?: string;
  glowIntensity?: number;
  trailLength?: number;
}

const GlowCursor: React.FC<GlowCursorProps> = ({
  color = "#ea8eea",
  size = 20,
  trailColor = "rgba(234, 142, 234, 0.2)",
  glowIntensity = 0.7,
  trailLength = 8,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const positionRef = useRef({ x: -100, y: -100 });
  const trailPositions = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Initialize trail positions
    trailPositions.current = Array(trailLength).fill({ x: -100, y: -100 });

    const updateCursorPosition = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorRef.current.style.opacity = "1";
      }

      // Check if cursor is over an interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("icon-item") ||
        target.classList.contains("sponsor-item") ||
        target.classList.contains("triverse-logo") ||
        target.classList.contains("register-button") ||
        target.classList.contains("explore-button") ||
        target.classList.contains("dock-item");

      if (cursorRef.current) {
        if (isInteractive) {
          cursorRef.current.classList.add("interactive");
        } else {
          cursorRef.current.classList.remove("interactive");
        }
      }
    };

    const updateTrail = () => {
      // Update trail positions
      for (let i = trailLength - 1; i > 0; i--) {
        trailPositions.current[i] = { ...trailPositions.current[i - 1] };
      }
      trailPositions.current[0] = { ...positionRef.current };

      // Update trail elements
      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          const pos = trailPositions.current[i];
          const opacity = 1 - (i / trailLength) * 0.8;
          const scale = 1 - (i / trailLength) * 0.5;

          trail.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
          trail.style.opacity = `${opacity}`;
        }
      });

      requestAnimationFrame(updateTrail);
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }

      trailsRef.current.forEach((trail) => {
        if (trail) {
          trail.style.opacity = "0";
        }
      });
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [trailLength]);

  // Create trail elements
  const trails = Array(trailLength)
    .fill(0)
    .map((_, i) => (
      <div
        key={`trail-${i}`}
        className="cursor-trail"
        ref={(el) => {
          if (el) trailsRef.current[i] = el;
        }}
        style={{
          width: `${Math.max(size * 0.6 - i * 1.5, 2)}px`,
          height: `${Math.max(size * 0.6 - i * 1.5, 2)}px`,
          background: trailColor,
        }}
      />
    ));

  return (
    <>
      <div ref={cursorRef} className="glow-cursor">
        <div className="cursor-main" />
      </div>

      {trails}

      <style jsx>{`
        .glow-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: ${size}px;
          height: ${size}px;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-100px, -100px);
          opacity: 0;
          transition: opacity 0.3s ease;
          will-change: transform;
        }

        .cursor-main {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            ${color} 0%,
            rgba(234, 142, 234, ${glowIntensity * 0.3}) 50%,
            transparent 70%
          );
          box-shadow: 0 0 15px ${color};
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
        }

        .glow-cursor::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 4px;
          height: 4px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        .glow-cursor.interactive .cursor-main {
          width: ${size * 2}px;
          height: ${size * 2}px;
          background: radial-gradient(
            circle,
            rgba(234, 142, 234, 0.4) 0%,
            rgba(234, 142, 234, 0.1) 70%
          );
        }

        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-100px, -100px);
          opacity: 0;
          will-change: transform, opacity;
        }

        @media (max-width: 768px) {
          .glow-cursor,
          .cursor-trail {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default GlowCursor;
