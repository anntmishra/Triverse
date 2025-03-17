import React, { useEffect, useRef } from "react";

interface CursorProps {
  colors?: string[];
  customCursor?: boolean; // Enable custom cursor
  glowColor?: string; // Color for the glow effect
}

const CustomCursor: React.FC<CursorProps> = ({
  colors = ["#ea8eea", "#925da1", "#d4c499", "#ffffff"],
  customCursor = true,
  glowColor = "rgba(234, 142, 234, 0.8)",
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!customCursor) return;
    const cursor = cursorRef.current;

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Move custom cursor
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursor.style.opacity = "1";
      }
    };

    // Handle mouse enter/leave for document
    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Clean up
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [customCursor]);

  if (!customCursor) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        pointerEvents: "none",
        zIndex: 10000,
        transform: "translate(-100px, -100px)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="pixelated-cursor" />
      <style jsx>{`
        .custom-cursor {
          will-change: transform;
        }

        .pixelated-cursor {
          position: absolute;
          width: 24px;
          height: 24px;
          background-color: transparent;
          /* Triangle cursor shape */
          box-shadow: 
                        /* Triangle shape */ 6px 0px 0 2px
              #ffffff,
            4px 2px 0 2px #ffffff, 6px 2px 0 2px #ffffff, 8px 2px 0 2px #ffffff,
            2px 4px 0 2px #ffffff, 4px 4px 0 2px #ffffff, 6px 4px 0 2px #ffffff,
            8px 4px 0 2px #ffffff, 10px 4px 0 2px #ffffff, 0px 6px 0 2px #ffffff,
            2px 6px 0 2px #ffffff, 4px 6px 0 2px #ffffff, 6px 6px 0 2px #ffffff,
            8px 6px 0 2px #ffffff, 10px 6px 0 2px #ffffff,
            12px 6px 0 2px #ffffff;
          transform: scale(1.2);
          filter: drop-shadow(0 0 6px ${glowColor})
            drop-shadow(0 0 12px ${glowColor.replace("0.8", "0.4")});
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 6px ${glowColor})
              drop-shadow(0 0 12px ${glowColor.replace("0.8", "0.4")});
          }
          50% {
            filter: drop-shadow(0 0 10px ${glowColor.replace("0.8", "1")})
              drop-shadow(0 0 18px ${glowColor.replace("0.8", "0.7")});
          }
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
