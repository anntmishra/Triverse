import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  isLogoHovered?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLogoHovered = false }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [triangleLoaded, setTriangleLoaded] = useState(false);

  // Use useCallback to memoize the function
  const triggerTriangleLoad = useCallback(() => {
    setTriangleLoaded(true);
  }, []);

  useEffect(() => {
    // Trigger the animation after component mounts
    const timer = setTimeout(triggerTriangleLoad, 500);

    // Clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, [triggerTriangleLoad]);

  return (
    <>
      {/* Regular dock - visible when logo is not hovered */}
      <div className={`dock-container ${isLogoHovered ? "hidden" : ""}`}>
        <nav className="dock">
          <Link href="/" legacyBehavior>
            <a
              className={`dock-item ${router.pathname === "/" ? "active" : ""}`}
            >
              <div className="dock-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <span className="dock-label">Home</span>
            </a>
          </Link>

          <Link href="/events" legacyBehavior>
            <a
              className={`dock-item ${
                router.pathname === "/events" ? "active" : ""
              }`}
            >
              <div className="dock-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <span className="dock-label">Events</span>
            </a>
          </Link>

          <Link href="/about" legacyBehavior>
            <a
              className={`dock-item ${
                router.pathname === "/about" ? "active" : ""
              }`}
            >
              <div className="dock-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="dock-label">Team</span>
            </a>
          </Link>

          <Link href="/contact" legacyBehavior>
            <a
              className={`dock-item ${
                router.pathname === "/contact" ? "active" : ""
              }`}
            >
              <div className="dock-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z"></path>
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <span className="dock-label">Contact</span>
            </a>
          </Link>

          <Link href="/register" legacyBehavior>
            <a
              className={`dock-item startup-icon ${
                router.pathname === "/register" ? "active" : ""
              } ${triangleLoaded ? "loaded" : ""}`}
            >
              <div className="dock-icon triangle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="12 2 22 20 2 20" />
                </svg>
              </div>
              <span className="dock-label">Register</span>
            </a>
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .dock-container {
          position: fixed;
          bottom: 20px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: auto;
        }

        .dock-container.hidden {
          opacity: 0;
          transform: translateY(80px);
          pointer-events: none;
        }

        .dock {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: rgba(20, 20, 20, 0.8);
          border-radius: 18px;
          padding: 10px 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          height: 70px;
          transition: all 0.3s ease;
        }

        .dock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .dock-icon {
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          transition: all 0.3s ease;
          transform-origin: bottom;
        }

        .dock-icon svg {
          width: 24px;
          height: 24px;
        }

        .dock-label {
          position: absolute;
          top: -30px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          pointer-events: none;
          white-space: nowrap;
          font-family: "Roboto", sans-serif;
        }

        .dock-item:hover .dock-icon {
          transform: scale(1.5);
        }

        .dock-item:hover .dock-label {
          opacity: 1;
          transform: translateY(0);
        }

        .dock-item.active .dock-icon {
          color: #ea8eea;
        }

        /* Triangle startup icon styles */
        .startup-icon {
          position: relative;
        }

        .triangle {
          color: #ea8eea;
        }

        /* Initial state - triangle starts from outside the dock */
        .startup-icon .dock-icon {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 0;
        }

        /* Loaded state - triangle moves into place */
        .startup-icon.loaded .dock-icon {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          transition: transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.8s ease;
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.2s;
        }

        .startup-icon:hover .dock-icon {
          transform: scale(1.8) translateY(5px);
          animation-play-state: paused;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(10deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
          }
        }

        @media (max-width: 768px) {
          .dock {
            width: 90%;
            padding: 10px;
          }

          .dock-item {
            margin: 0 10px;
          }
        }

        @media (max-width: 480px) {
          /* Mobile styles preserved */
        }
      `}</style>
    </>
  );
};

export default Navbar;
