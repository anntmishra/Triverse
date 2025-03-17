import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import ParallaxSection from "../components/ParallaxSection";
const BackgroundEffects = dynamic(
  () => import("../components/BackgroundEffects"),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  const { theme: _ } = useTheme();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Throttle scroll event for better performance
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set page as loaded after components are mounted
    requestAnimationFrame(() => {
      setIsPageLoaded(true);
    });

    document.documentElement.style.backgroundColor = "transparent";
    document.body.style.backgroundColor = "transparent";

    // Use passive event listeners for better performance
    let ticking = false;
    const preventOverscroll = () => {
      if (window.scrollY < 0) {
        window.scrollTo(0, 0);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(preventOverscroll);
        ticking = true;
      }
    };

    // Basic document setup
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.overflowX = "hidden";

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Memoize logo hover handlers for better performance
  const handleLogoEnter = useCallback(() => setIsLogoHovered(true), []);
  const handleLogoLeave = useCallback(() => setIsLogoHovered(false), []);

  return (
    <div
      className={`container ${isPageLoaded ? "page-loaded" : "page-loading"}`}
    >
      <Head>
        <title>Triverse</title>
        <meta name="description" content="Triverse 2.0 - March 28-30" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Add meta for better mobile performance */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        {/* Add theme color for mobile browsers */}
        <meta name="theme-color" content="#111111" />
      </Head>

      {/* Only load background effects when page is loaded */}
      {isPageLoaded && <BackgroundEffects />}

      <div className="background-layer">
        <div className="img-background">
          <img
            src="/assets/website.png"
            alt="Triverse Background"
            className="background-img"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <div className="background-overlay"></div>
      </div>

      <Navbar isLogoHovered={isLogoHovered} />

      <main className="main">
        <div className="sponsors-bar">
          <div className="sponsors-wrapper">
            <div className="sponsor-item">
              <img src="/assets/ieeelogo.png" alt="IEEE" />
            </div>
            <div className="sponsor-divider"></div>
            <div className="sponsor-item">
              <img src="/assets/bennettlogo.png" alt="Bennett University" />
            </div>
            <div className="sponsor-divider"></div>
            <div className="sponsor-item">
              <img src="/assets/eth.png" alt="ETH India" />
            </div>
            <div className="sponsor-divider"></div>
            <div className="sponsor-item">
              <img src="/assets/dev.png" alt="Devfolio" />
            </div>
          </div>
        </div>

        <div className="fixed-logo-panel">
          <div className="triverse-logo-small">
            <img src="/assets/logonobg (1).png" alt="TRIVERSE 2.0" />
          </div>
        </div>

        <section className="hero-section">
          <div className="hero-content">
            <div className="title-container">
              <div
                className="triverse-logo"
                onMouseEnter={handleLogoEnter}
                onMouseLeave={handleLogoLeave}
              >
                <img
                  src="/assets/logonobg (1).png"
                  alt="TRIVERSE 2.0"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
              <div className="divider"></div>
              <p className="subtitle">Connect • Create • Transform</p>
              <Link href="/register">
                <button className="register-button">
                  <span className="register-text">REGISTER</span>
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="dual-section">
          <div className="section-container">
            <ParallaxSection className="about-us-section" speed={0.3}>
              <div className="section-content about-section">
                <div className="floating-particles">
                  <div className="particle p1"></div>
                  <div className="particle p2"></div>
                  <div className="particle p3"></div>
                  <div className="particle p4"></div>
                  <div className="particle p5"></div>
                </div>

                <div className="section-header">
                  <div className="section-badge">Core Mission</div>
                  <h2 className="section-title">About Triverse</h2>
                  <div className="section-divider">
                    <div className="divider-gem"></div>
                  </div>
                </div>

                <div className="about-grid">
                  <div className="about-content">
                    <p className="section-text">
                      <span className="text-highlight">Triverse</span> is
                      Bennett University's flagship tech fest that brings
                      together the brightest minds in technology, innovation,
                      and creativity. Our mission is to create a platform where
                      students can showcase their talents, learn from industry
                      experts, and collaborate on groundbreaking projects.
                    </p>
                    <p className="section-text">
                      With a focus on cutting-edge technology and
                      interdisciplinary collaboration, Triverse offers
                      workshops, hackathons, tech talks, and competitions
                      designed to challenge and inspire the next generation of
                      innovators.
                    </p>

                    <div className="stats-container">
                      <div className="stat-item">
                        <div className="stat-number">2500+</div>
                        <div className="stat-label">Participants</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">30+</div>
                        <div className="stat-label">Events</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Sponsors</div>
                      </div>
                    </div>
                  </div>
                  <div className="about-visual">
                    <div className="image-container">
                      <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Tech Event Crowd"
                        className="about-image"
                      />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="visual-quote">
                      <span>
                        "Innovation is where preparation meets opportunity"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Move pillars section outside the grid for better spacing */}
                <div className="pillars-section">
                  <h3 className="pillars-title">Our Core Pillars</h3>

                  <div className="about-icons">
                    <div className="icon-item">
                      <div className="icon-circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                      </div>
                      <span>Innovation</span>
                      <p className="icon-description">
                        Fostering new ideas and solutions
                      </p>
                    </div>
                    <div className="icon-item">
                      <div className="icon-circle">
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
                      <span>Community</span>
                      <p className="icon-description">
                        Building connections that last
                      </p>
                    </div>
                    <div className="icon-item">
                      <div className="icon-circle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                      </div>
                      <span>Technology</span>
                      <p className="icon-description">
                        Exploring cutting-edge solutions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="navigation-button-container">
                  <Link href="/events">
                    <button className="explore-button">
                      <span className="button-text">Explore Events</span>
                      <svg
                        className="arrow-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </ParallaxSection>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          width: 100vw;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          font-family: "Roboto", sans-serif;
          background: transparent;
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
        }

        .background-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
        }

        .img-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .background-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: subtle-zoom 60s infinite alternate ease-in-out;
          will-change: transform;
          transform: translateZ(0); /* Force hardware acceleration */
        }

        @keyframes subtle-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(212, 196, 153, 0.7) 0%,
            rgba(146, 93, 161, 0.8) 30%,
            rgba(60, 20, 80, 0.9) 60%,
            rgba(10, 10, 20, 1) 100%
          );
          /* Add noise texture */
          background-blend-mode: overlay;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
        }

        .main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 120px;
        }

        .sponsors-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          width: 100%;
          display: flex;
          justify-content: center;
          height: auto;
          background: transparent;
        }

        .sponsors-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: transparent;
          padding: 1.2rem 3rem;
          width: 100%;
        }

        .sponsor-item {
          width: 180px;
          height: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .sponsor-item img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: brightness(1);
          transition: transform 0.3s ease, filter 0.3s ease;
          will-change: transform;
        }

        .sponsor-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 2rem;
        }

        .fixed-logo-panel {
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          z-index: 99;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.5rem 0;
          background: rgba(10, 10, 20, 0.7);
          backdrop-filter: blur(10px);
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .fixed-logo-panel.visible {
          transform: translateY(0);
          opacity: 1;
        }

        .triverse-logo-small {
          width: 150px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .triverse-logo-small img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .sponsors-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: transparent;
          padding: 1.2rem 3rem;
          width: 100%;
        }

        .sponsor-item {
          width: 180px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .sponsor-item img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: brightness(1);
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .sponsor-item:hover {
          transform: translateY(-2px);
        }

        .sponsor-item:hover img {
          filter: brightness(1.2) drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
        }

        .sponsor-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 2rem;
        }

        .hero-section {
          margin: 0 auto;
          padding: 0 1rem;
          min-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: transparent;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: -1;
        }

        .hero-content {
          padding: 2rem;
          margin: 0 auto;
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          backdrop-filter: none;
          border-radius: 20px;
          background: transparent;
          box-shadow: none;
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          gap: 0;
          padding: 0;
          margin: 0 auto 1.5rem;
          background: transparent;
        }

        .triverse-logo {
          width: 100%;
          max-width: 800px;
          margin: 0 auto 0;
          position: relative;
          display: flex;
          justify-content: center;
          transform-origin: center;
          animation: logoEntrance 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
          background: transparent;
          cursor: pointer;
        }

        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .triverse-logo::after {
          content: "";
          position: absolute;
          width: 180%;
          height: 180%;
          top: -40%;
          left: -40%;
          z-index: -1;
          pointer-events: none;
          animation: pulseGlow 8s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .triverse-logo img {
          width: 100%;
          height: auto;
          animation: subtle-float 6s ease-in-out infinite;
          will-change: transform;
          transform: translateZ(0); /* Hardware acceleration */
          display: block;
          margin: 0 auto;
          background: transparent;
        }

        @keyframes subtle-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(0.5deg);
          }
          50% {
            transform: translateY(-12px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-5px) rotate(0.2deg);
          }
        }

        .divider {
          width: 240px;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(187, 145, 191, 0) 0%,
            rgba(187, 145, 191, 0.9) 50%,
            rgba(187, 145, 191, 0) 100%
          );
          margin: 0 auto;
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(187, 145, 191, 0.5);
          position: relative;
          animation: expandDivider 1.2s ease-out;
        }

        @keyframes expandDivider {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 240px;
            opacity: 1;
          }
        }

        .divider::after {
          content: "";
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: rgba(187, 145, 191, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(187, 145, 191, 0.8);
          animation: pulseDot 3s infinite;
        }

        @keyframes pulseDot {
          0%,
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateX(-50%) scale(1.5);
            opacity: 1;
          }
        }

        .subtitle {
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.95);
          text-align: center;
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(187, 145, 191, 0.6);
          margin: 1rem 0 0;
          font-weight: 300;
          transform: none;
          animation: fadeInUp 1.2s ease-out 0.3s both;
          background: linear-gradient(90deg, #f8f8f8, #e0c5e3, #f8f8f8);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .register-button {
          padding: 1rem 3.5rem;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          background: #ea8eea;
          border: none;
          border-radius: 50px;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(234, 142, 234, 0.3);
          transition: all 0.3s ease;
          display: block;
          margin: 1.8rem auto 0;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        @keyframes buttonPulse {
          0% {
            box-shadow: 0 4px 15px rgba(234, 142, 234, 0.3);
          }
          50% {
            box-shadow: 0 4px 15px rgba(234, 142, 234, 0.4);
          }
          100% {
            box-shadow: 0 4px 15px rgba(234, 142, 234, 0.3);
          }
        }

        .register-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          transition: all 0.75s ease;
        }

        .register-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(234, 142, 234, 0.4);
          background: #f49cf4;
        }

        .register-button:hover::before {
          left: 100%;
        }

        .register-button:active {
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(234, 142, 234, 0.3);
        }

        .register-text {
          position: relative;
          z-index: 2;
          text-shadow: none;
        }

        .dual-section {
          width: 100%;
          padding: 6rem 0;
          position: relative;
          margin-top: 2rem;
        }

        .dual-section::before {
          content: "";
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100px;
          background: linear-gradient(
            to bottom,
            rgba(187, 145, 191, 0),
            rgba(187, 145, 191, 0.6)
          );
        }

        .section-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-content {
          padding: 3.5rem;
          border-radius: 24px;
          backdrop-filter: blur(15px);
          transition: all 0.5s ease;
          position: relative;
          overflow: visible; /* Changed from 'hidden' to allow elements to expand beyond bounds if needed */
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(146, 93, 161, 0.1);
          width: 100%;
        }

        .about-section {
          background: rgba(40, 15, 60, 0.75);
          border: 1px solid rgba(146, 93, 161, 0.3);
          position: relative;
          margin-bottom: 6rem; /* Added extra space at the bottom to prevent cutoff */
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(8px);
          z-index: 0;
        }

        .p1 {
          width: 80px;
          height: 80px;
          background: rgba(234, 142, 234, 0.2);
          top: 10%;
          left: 5%;
          animation: float-slow 15s ease-in-out infinite alternate;
        }

        .p2 {
          width: 120px;
          height: 120px;
          background: rgba(212, 196, 153, 0.15);
          top: 70%;
          right: 8%;
          animation: float-slow 18s ease-in-out infinite alternate-reverse;
        }

        .p3 {
          width: 150px;
          height: 150px;
          background: rgba(146, 93, 161, 0.12);
          bottom: 15%;
          left: 10%;
          animation: float-slow 20s ease-in-out infinite alternate;
        }

        .p4 {
          width: 60px;
          height: 60px;
          background: rgba(162, 126, 195, 0.15);
          top: 30%;
          right: 15%;
          animation: float-slow 12s ease-in-out infinite alternate-reverse;
        }

        .p5 {
          width: 40px;
          height: 40px;
          background: rgba(212, 196, 153, 0.18);
          top: 60%;
          left: 40%;
          animation: float-slow 17s ease-in-out infinite alternate;
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(30px) translateX(20px) scale(1.1);
          }
          100% {
            transform: translateY(-30px) translateX(-20px) scale(1);
          }
        }

        .section-header {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-badge {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          background: linear-gradient(
            90deg,
            rgba(234, 142, 234, 0.15),
            rgba(146, 93, 161, 0.15)
          );
          color: #ea8eea;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          border: 1px solid rgba(234, 142, 234, 0.3);
          box-shadow: 0 4px 15px rgba(234, 142, 234, 0.15);
        }

        .section-title {
          font-family: "Playfair Display", serif;
          font-size: 3.2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-align: center;
          position: relative;
          z-index: 2;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          letter-spacing: 1px;
          background: linear-gradient(180deg, #ffffff, #e0c5e3);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          width: 140px;
          height: 3px;
          background: linear-gradient(
            90deg,
            rgba(146, 93, 161, 0),
            #925da1,
            rgba(146, 93, 161, 0)
          );
          position: relative;
        }

        .divider-gem {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #ea8eea;
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(234, 142, 234, 0.8);
          animation: pulse 3s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
            transform: rotate(45deg) scale(1);
          }
          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.2);
          }
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          position: relative;
          z-index: 2;
          margin-bottom: 5rem; /* Increased spacing after grid */
        }

        .about-content {
          display: flex;
          flex-direction: column;
        }

        .section-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .text-highlight {
          color: #ea8eea;
          font-weight: 600;
        }

        .stats-container {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ea8eea;
          margin-bottom: 0.5rem;
          position: relative;
        }

        .stat-number::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(234, 142, 234, 0),
            rgba(234, 142, 234, 0.8),
            rgba(234, 142, 234, 0)
          );
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .about-visual {
          position: relative;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          height: 360px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s ease;
        }

        .image-container:hover .about-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(60, 20, 80, 0.2),
            rgba(60, 20, 80, 0.6)
          );
          z-index: 1;
        }

        .visual-quote {
          position: absolute;
          bottom: -25px;
          right: 20px;
          background: rgba(234, 142, 234, 0.9);
          padding: 1rem 1.5rem;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          max-width: 70%;
          transform: rotate(2deg);
        }

        .visual-quote span {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .pillars-section {
          margin-top: 2rem; /* Reduced top margin */
          position: relative;
          z-index: 2;
          text-align: center;
          clear: both; /* Ensure it's not affected by preceding floats */
          width: 100%; /* Full width */
          padding: 0 1rem; /* Add some padding */
        }

        .pillars-title {
          font-family: "Playfair Display", serif;
          font-size: 2rem;
          color: #ffffff;
          margin-bottom: 3rem;
          letter-spacing: 1px;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          position: relative;
          display: inline-block;
        }

        .pillars-title::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #d4c499, #925da1);
          border-radius: 3px;
        }

        .about-icons {
          display: flex;
          justify-content: center; /* Changed to center alignment */
          flex-wrap: wrap; /* Allow wrapping on smaller screens */
          margin-top: 2rem;
          gap: 2rem; /* Increased gap between icons */
          position: relative;
          z-index: 2;
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: transform 0.5s ease;
          padding: 1.5rem;
          border-radius: 16px;
          width: 28%; /* Slightly reduced width */
          min-width: 200px; /* Minimum width to maintain readability */
        }

        .icon-item:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
        }

        .icon-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(234, 142, 234, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(234, 142, 234, 0.3);
          transition: all 0.4s ease;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          margin-bottom: 0.5rem;
        }

        .icon-circle svg {
          width: 40px;
          height: 40px;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.4s ease;
        }

        .icon-item:hover .icon-circle {
          background: rgba(234, 142, 234, 0.25);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.25);
        }

        .icon-item:hover .icon-circle svg {
          transform: scale(1.2);
          color: #ffffff;
        }

        .icon-item span {
          font-size: 1.25rem;
          color: #ea8eea;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .icon-description {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          max-width: 200px;
          margin: 0;
        }

        .navigation-button-container {
          margin-top: 4.5rem;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .explore-button {
          padding: 1.2rem 2.8rem;
          font-size: 1.1rem;
          font-weight: 500;
          background: rgba(234, 142, 234, 0.15);
          border: 2px solid #ea8eea;
          border-radius: 50px;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .explore-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(234, 142, 234, 0.1),
            rgba(234, 142, 234, 0.2)
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .explore-button:hover {
          transform: translateY(-3px);
          background: rgba(234, 142, 234, 0.25);
          box-shadow: 0 6px 20px rgba(234, 142, 234, 0.3);
        }

        .explore-button:hover::before {
          transform: translateX(0);
        }

        .explore-button:active {
          transform: translateY(-1px);
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .explore-button:hover .arrow-icon {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .sponsors-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 100;
          }

          .fixed-logo-panel {
            top: 60px;
          }

          .triverse-logo-small {
            width: 120px;
            height: 40px;
          }

          .sponsors-wrapper {
            padding: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
            background: transparent;
            box-shadow: none;
            border: none;
          }

          .sponsor-item {
            width: 120px;
            height: 60px;
          }

          .sponsor-date {
            font-size: 0.75rem;
          }

          .sponsor-divider {
            display: none;
          }

          .main {
            padding-top: 100px; /* Adjust padding for mobile */
          }

          .hero-section {
            margin-top: 0;
            padding: 0 1rem;
          }

          .hero-content {
            padding: 1rem;
          }

          .triverse-logo {
            max-width: 650px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
          }

          .subtitle {
            font-size: 1.6rem;
            margin: 0;
          }

          .register-button {
            padding: 0.8rem 2.5rem;
            font-size: 1rem;
            margin-top: 1.8rem;
          }

          .section-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .section-content {
            padding: 2.5rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .section-text {
            font-size: 1.1rem;
          }

          .about-icons {
            margin-top: 2.5rem;
          }

          .icon-circle {
            width: 70px;
            height: 70px;
          }

          .icon-circle svg {
            width: 35px;
            height: 35px;
          }

          .glimpses-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .glimpse-item {
            height: 150px;
          }

          .about-grid {
            grid-template-columns: 1fr; /* Single column on mobile */
            gap: 2rem;
          }

          .about-visual {
            margin-bottom: 1rem; /* Add space after visual */
          }

          .pillars-section {
            margin-top: 3rem; /* Increase space before pillars section on mobile */
          }

          .about-icons {
            flex-direction: column; /* Stack icons vertically on mobile */
            align-items: center;
            gap: 2rem;
          }

          .icon-item {
            width: 90%; /* Wider on mobile */
            max-width: 300px; /* Maximum width on mobile */
            padding: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .sponsors-wrapper {
            padding: 1rem;
            gap: 1.5rem;
          }

          .sponsor-item {
            width: 100px;
            height: 50px;
          }

          .sponsor-date {
            font-size: 0.7rem;
          }

          .sponsor-divider {
            height: 20px;
            margin: 0 0.8rem;
          }

          .hero-content {
            padding: 0.5rem;
          }

          .triverse-logo {
            max-width: 400px;
            margin: 0 auto;
          }

          .subtitle {
            font-size: 1.3rem;
            letter-spacing: 2px;
          }

          .register-button {
            padding: 0.7rem 2rem;
            font-size: 0.9rem;
            margin-top: 1.5rem;
          }

          .section-container {
            padding: 0 1rem;
          }

          .section-content {
            padding: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .section-text {
            font-size: 1rem;
            line-height: 1.7;
          }

          .about-icons {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 2rem;
            justify-content: center;
          }

          .icon-circle {
            width: 55px;
            height: 55px;
          }

          .icon-circle svg {
            width: 28px;
            height: 28px;
          }

          .icon-item span {
            font-size: 1rem;
          }

          .glimpses-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }

          .glimpse-item {
            height: 200px;
          }

          .icon-item {
            width: 100%; /* Full width on small mobile */
            padding: 1rem;
            min-width: 0; /* Remove minimum width on small screens */
          }

          .icon-description {
            max-width: 100%; /* Allow description to use full width */
          }
        }

        .navigation-button-container {
          margin-top: 4rem;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .explore-button {
          padding: 1.2rem 2.8rem;
          font-size: 1.1rem;
          font-weight: 500;
          background: rgba(234, 142, 234, 0.15);
          border: 2px solid #ea8eea;
          border-radius: 50px;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .explore-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            rgba(234, 142, 234, 0.1),
            rgba(234, 142, 234, 0.2)
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .explore-button:hover {
          transform: translateY(-3px);
          background: rgba(234, 142, 234, 0.25);
          box-shadow: 0 6px 20px rgba(234, 142, 234, 0.3);
        }

        .explore-button:hover::before {
          transform: translateX(0);
        }

        .explore-button:active {
          transform: translateY(-1px);
        }

        .button-text {
          position: relative;
          z-index: 1;
        }

        .arrow-icon {
          width: 20px;
          height: 20px;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .explore-button:hover .arrow-icon {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .explore-button {
            padding: 1rem 2.4rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .explore-button {
            padding: 0.9rem 2rem;
            font-size: 0.9rem;
          }
        }

        .site-footer,
        .footer-content,
        .footer-logo,
        .footer-sections,
        .footer-section,
        .social-icons,
        .footer-bottom {
          display: block;
        }

        /* Add styles for stars */
        .star-background {
          opacity: 0.6;
          mix-blend-mode: screen;
        }

        @media (max-width: 768px) {
          .star-background {
            opacity: 0.4;
          }
        }

        @media (max-width: 1024px) {
          .about-grid {
            gap: 2rem;
          }

          .section-content {
            padding: 3rem;
          }

          .pillars-section {
            margin-top: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-content {
            padding: 2.5rem;
            overflow: visible;
          }

          .about-visual {
            margin-bottom: 2.5rem;
          }

          .pillars-section {
            margin-top: 1rem;
            margin-bottom: 2rem;
            padding: 0;
          }

          .about-icons {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
          }

          .icon-item {
            width: calc(50% - 1.5rem);
            min-width: 150px;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .section-content {
            padding: 2rem 1.5rem;
          }

          .about-icons {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .icon-item {
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }

          .icon-description {
            max-width: 90%;
          }

          .visual-quote {
            max-width: 90%;
            right: 5%;
          }
        }

        /* Add extra padding to ensure everything is visible in the ParallaxSection */
        .about-us-section {
          padding-bottom: 2rem;
        }

        /* Space background styles */
        .space-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
        }

        .stars-mid {
          opacity: 0.6;
          mix-blend-mode: screen;
        }

        .stars-foreground {
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        /* Deep space nebula glow effect */
        .space-background::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(146, 93, 161, 0.05) 0%,
            rgba(212, 196, 153, 0.03) 40%,
            rgba(10, 10, 20, 0) 80%
          );
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .stars-mid,
          .stars-foreground {
            opacity: 0.4;
          }
        }

        .page-loading {
          opacity: 0;
        }

        .page-loaded {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Home;
