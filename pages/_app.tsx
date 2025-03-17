import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext";
import { useState, useEffect, useRef } from "react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    // Set background color based on theme
    const bgColor = savedTheme === "dark" ? "transparent" : "transparent";
    const textColor = savedTheme === "dark" ? "#ffffff" : "#333333";

    // Set background immediately to prevent flashing
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = bgColor;
      document.body.style.backgroundColor = bgColor;
      document.documentElement.style.color = textColor;
      document.body.style.color = textColor;

      // Ensure the app container has correct background
      if (appRef.current) {
        appRef.current.style.backgroundColor = bgColor;
      }

      // Apply to the next.js wrapper
      const nextWrapper = document.getElementById("__next");
      if (nextWrapper) {
        nextWrapper.style.backgroundColor = bgColor;
      }
    }

    // Simulate loading time and then hide splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Head>
        <meta
          name="theme-color"
          content={theme === "dark" ? "transparent" : "transparent"}
        />
        <style>{`
          html, body, #__next {
            background-color: transparent !important;
            color: ${theme === "dark" ? "#ffffff" : "#333333"} !important;
          }
          
          /* Critical styles to prevent white flash */
          * {
            box-sizing: border-box;
          }
          
          /* Force theme for all browsers */
          @media (prefers-color-scheme: light) {
            html {
              color-scheme: ${theme === "dark" ? "dark" : "light"} !important;
            }
          }
        `}</style>
      </Head>

      <div
        ref={appRef}
        style={{
          backgroundColor: "transparent",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {loading ? (
          <div className="splash-screen">
            <div className="splash-content">
              <div className="splash-triangle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="12 2 22 20 2 20" />
                </svg>
              </div>
              <div className="splash-text">TRIVERSE</div>
            </div>
            <style jsx>{`
              .splash-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #111111 !important;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                pointer-events: none;
              }

              .splash-content {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: fadeIn 0.5s ease-in-out,
                  scaleDown 0.5s ease-in-out 1.5s forwards;
                pointer-events: none;
              }

              .splash-triangle {
                width: 120px;
                height: 120px;
                color: #ea8eea;
                margin-bottom: 20px;
                animation: float 1s ease-in-out infinite;
              }

              .splash-text {
                font-size: 3rem;
                font-weight: 700;
                color: white;
                font-family: "Playfair Display", serif;
                letter-spacing: 2px;
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: scale(0.8);
                }
                to {
                  opacity: 1;
                  transform: scale(1);
                }
              }

              @keyframes float {
                0% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
                100% {
                  transform: translateY(0);
                }
              }

              @keyframes scaleDown {
                0% {
                  transform: scale(1) translateY(0);
                  opacity: 1;
                }
                100% {
                  transform: scale(0.2) translateY(1000px);
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        ) : null}
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
