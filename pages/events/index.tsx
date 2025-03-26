import React, { useState, useEffect, useRef } from "react";
import { Cpu, Code, Speech, ChevronLeft, BarChart } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

import PixelCard from "../../components/pixelcard";
import Footer from "@/components/Footer";

function App() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation delay for page elements
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        setMousePosition({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Particle animation effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      lifespan: number;
      currentLife: number;
    }> = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: getRandomColor(),
          opacity: Math.random() * 0.5 + 0.1,
          lifespan: 100 + Math.random() * 100,
          currentLife: 0,
        });
      }
    };

    const getRandomColor = () => {
      const colors = ["#EA8EEA", "#9C27B0", "#4A148C", "#7B1FA2", "#6A1B9A"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle, index) => {
        particle.currentLife++;
        if (particle.currentLife >= particle.lifespan) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            color: getRandomColor(),
            opacity: Math.random() * 0.5 + 0.1,
            lifespan: 100 + Math.random() * 100,
            currentLife: 0,
          };
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }

        // Calculate opacity based on lifecycle
        const lifecycleOpacity =
          particle.opacity *
          (1 - Math.abs((particle.currentLife / particle.lifespan) * 2 - 1));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(
          lifecycleOpacity * 255
        ).toString(16)}`;
        ctx.fill();
      });

      // Draw light beams
      drawLightBeams(ctx, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    // Create light beam effect
    const drawLightBeams = (
      context: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const beamCount = 5;

      for (let i = 0; i < beamCount; i++) {
        const x = (width / beamCount) * i + (width / beamCount) * 0.5;
        const y = 0;

        // Create gradient
        const gradient = context.createLinearGradient(x, y, x, height * 0.8);

        gradient.addColorStop(0, "rgba(234, 142, 234, 0.15)");
        gradient.addColorStop(0.5, "rgba(234, 142, 234, 0.05)");
        gradient.addColorStop(1, "rgba(234, 142, 234, 0)");

        context.beginPath();
        context.moveTo(x, y);

        // Calculate beam width
        const topWidth = 50 + Math.sin(Date.now() * 0.001 + i) * 20;
        const bottomWidth = 150 + Math.sin(Date.now() * 0.0015 + i) * 50;

        // Draw beam shape
        context.lineTo(x - topWidth / 2, y);
        context.lineTo(x - bottomWidth / 2, height * 0.8);
        context.lineTo(x + bottomWidth / 2, height * 0.8);
        context.lineTo(x + topWidth / 2, y);

        context.closePath();
        context.fillStyle = gradient;
        context.fill();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const events = [
    {
      id: "finlit",
      title: "FinLit",
      link: "https://forms.gle/534XMo5YDYeVfpuC8",
      icon: <BarChart className="icon" />,
      description:
        "A comprehensive financial literacy competition that challenges participants to demonstrate their understanding of financial markets, investment strategies, and economic principles.",
      highlights: [
        "Market simulation challenges",
        "Investment strategy competitions",
        "Financial case studies",
        "Expert panel discussions",
      ],
      date: "March 27, 2025",
      time: "5:30 PM",
      venue: "ALH 002",
      variant: "purple", // Adding variant for PixelCard
    },
    {
      id: "betfortech",
      title: "Bet for Tech",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeM3OCOlmS7l8yGrc_LWLDm-AZ6pzvj6ZCIdUycSPzuvm5qzQ/viewform?usp=header",
      icon: <Cpu className="icon" />,
      description:
        "An innovative tech betting platform where participants predict future technology trends and developments. Compete to forecast the next big innovations in the tech industry.",
      highlights: [
        "Tech trend analysis",
        "Innovation forecasting",
        "Industry expert insights",
        "Predictive modeling challenges",
      ],
      date: "March 28, 2025",
      time: "5:30 PM",
      venue: "B Block Admission Lounge",
      variant: "blue", // Adding variant for PixelCard
    },
    {
      id: "code-roast",
      title: "Code Roast",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdXeDcHd0dz6N7vFLfm8ApzIJ3YkGqbzi3yuSRhkedV_WMSkw/viewform?usp=dialog",
      icon: <Code className="icon" />,
      description:
        "A collaborative code review session where experts analyze and critique your code in a constructive environment. Get valuable feedback on your projects and improve your coding skills.",
      highlights: [
        "Live code reviews",
        "Expert feedback",
        "Best practices discussion",
        "Performance optimization tips",
      ],
      date: "March 28, 2025",
      time: "7:00 PM onwards",
      venue: "103 BLA",
      variant: "pink", // Adding variant for PixelCard
    },
    // {
    //   id: "tedtalk",
    //   title: "TED Talk + Prizes",
    //   link: "https://triverse-official.vercel.app/",
    //   icon: <Speech className="icon" />,
    //   description:
    //     "Inspiring talks from industry leaders, innovators, and thought pioneers sharing their insights on technology, entrepreneurship, and digital transformation.",
    //   highlights: [
    //     "Keynote presentations",
    //     "Interactive Q&A sessions",
    //     "Prize distribution ceremony",
    //     "Networking opportunities",
    //   ],
    //   date: "March 30, 2025",
    //   time: "4 PM – 8 PM",
    //   venue: "ALH 002",
    //   variant: "green", // Adding variant for PixelCard
    // },
  ].map((event) => ({
    ...event,
    registrationUrl: event.link // Use each event's link property
  }));

  const timelineEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Explore the exciting tech events at TRIVERSE 2.0"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Add favicon links for the triangle logo */}
        <link
          rel="icon"
          href="/assets/triangle-logo.svg"
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" href="/assets/triangle-logo-192.png" />
        <link rel="shortcut icon" href="/assets/triangle-logo.ico" />

        {/* Add a web app manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <div className="container" ref={containerRef}>
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="particle-canvas"></canvas>

        {/* Background with enhanced effects */}
        <div className="background-layer">
          <div
            className="img-background"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${
                mousePosition.y * -20
              }px)`,
            }}
          >
            <img
              src="/assets/website2.png"
              alt="Tech Event Background"
              className="background-img"
              loading="eager"
              fetchPriority="high"
            />
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
          </div>
          {/* Enhanced overlay with gradient animation */}
          <div className="background-overlay"></div>
          <div className="vignette-effect"></div>
        </div>

        <Link href="/" className="back-link">
          <ChevronLeft className="back-icon" />
          <span>Back to Home</span>
        </Link>

        <div className="content">
          <div className="header">
            <div className="title-container">
              <h1 className="title">
                FEATURED EVENTS
                <div className="title-underline"></div>
              </h1>
              <div className="title-border"></div>
            </div>
            <p className="subtitle">
              Join us for an extraordinary journey through technology,
              innovation, and learning
            </p>
          </div>

          <div className={`events-grid ${isLoaded ? "fade-in" : ""}`}>
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`event-wrapper ${
                  selectedEvent === event.id ? "selected" : ""
                } ${isLoaded ? "slide-up" : ""}`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                onClick={() => setSelectedEvent(event.id)}
              >
                <PixelCard
                  variant={
                    event.variant as
                      | "blue"
                      | "pink"
                      | "green"
                      | "yellow"
                      | "purple"
                      | "default"
                  }
                  className="event-card-pixel"
                >
                  <div className="card-content">
                    <div className="card-header">
                      <div className="icon-container">{event.icon}</div>
                      <div className="date-time">
                        <div className="date">{event.date}</div>
                        <div className="time">{event.time}</div>
                      </div>
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="highlights">
                      {event.highlights.map((highlight, index) => (
                        <div key={index} className="highlight">
                          <span className="highlight-dot"></span>
                          <span className="highlight-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="venue-container">
                      <div className="venue">
                        <span className="venue-label">Venue:</span>
                        <span className="venue-text">{event.venue}</span>
                      </div>

                      {/* Add register button */}
                      <button
                        className="register-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card click
                          window.open(event.registrationUrl, "_blank");
                        }}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </PixelCard>
              </div>
            ))}
          </div>

          <div className={`timeline-section ${isLoaded ? "fade-in" : ""}`}>
            <h2 className="timeline-title">EVENT TIMELINE</h2>
            <div className="divider-container">
              <div className="section-divider"></div>
              <div className="divider-gem"></div>
            </div>

            <div className="timeline">
              <div className="timeline-line"></div>

              {timelineEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`timeline-event ${
                    index % 2 === 0 ? "left" : "right"
                  } ${isLoaded ? "fade-in" : ""}`}
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                >
                  <div className="timeline-content">
                    <h3 className="timeline-event-title">{event.title}</h3>
                    <div className="timeline-datetime">
                      <span>{event.date}</span>
                      <span className="dot">•</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="timeline-venue">
                      <span className="venue-label">Venue:</span>
                      <span>{event.venue}</span>
                    </div>
                    <p className="timeline-description">{event.description}</p>
                  </div>
                  <div className="timeline-marker">
                    <div className="timeline-ping"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />

        <style jsx>{`
          .container {
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            /* Remove the padding-bottom that's creating extra space */
            padding-bottom: 0;
            display: flex;
            flex-direction: column;
          }

          .particle-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
            pointer-events: none;
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
            transition: transform 0.1s ease-out;
          }

          .background-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: subtle-zoom 60s infinite alternate ease-in-out;
            will-change: transform;
            transform: translateZ(0); /* Force hardware acceleration */
            filter: brightness(0.8) contrast(1.1);
          }

          @keyframes subtle-zoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.05);
            }
          }

          .light-beam-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            mix-blend-mode: screen;
          }

          .light-beam {
            position: absolute;
            top: -50%;
            width: 100px;
            height: 150vh;
            background: linear-gradient(
              to bottom,
              rgba(234, 142, 234, 0.15) 0%,
              rgba(234, 142, 234, 0.05) 50%,
              rgba(234, 142, 234, 0) 100%
            );
            transform: rotate(20deg) translateY(-100px);
            filter: blur(30px);
            animation: beam-movement 20s infinite alternate ease-in-out;
            opacity: 0.6;
          }

          @keyframes beam-movement {
            0% {
              transform: rotate(20deg) translateY(-100px) translateX(-50px);
              width: 100px;
              opacity: 0.4;
            }
            50% {
              transform: rotate(15deg) translateY(-50px) translateX(30px);
              width: 140px;
              opacity: 0.7;
            }
            100% {
              transform: rotate(25deg) translateY(-150px) translateX(70px);
              width: 80px;
              opacity: 0.5;
            }
          }

          /* Enhanced background overlay with gradient animation */
          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              135deg,
              rgba(60, 20, 80, 0.85),
              rgba(30, 15, 50, 0.9),
              rgba(90, 30, 100, 0.8)
            );
            animation: gradient-shift 15s infinite alternate ease-in-out;
            mix-blend-mode: multiply;
            pointer-events: none;
          }

          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          /* Vignette effect */
          .vignette-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.7);
            pointer-events: none;
            z-index: 2;
          }

          .container::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
          }

          .back-link {
            position: fixed;
            top: 2rem;
            left: 2rem;
            display: flex;
            align-items: center;
            color: #e9d5ff;
            font-size: 1rem;
            z-index: 10;
            transition: all 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .back-link:hover {
            background: rgba(234, 142, 234, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }

          .back-icon {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: 0.5rem;
          }

          .content {
            max-width: 80rem;
            margin: 0 auto;
            padding: 1rem 1rem 4rem;
            position: relative;
            z-index: 1;
          }

          .header {
            text-align: center;
            margin-bottom: 1rem;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s forwards ease-out;
          }

          .title-container {
            position: relative;
            display: inline-block;
            margin-bottom: 1.5rem;
          }

          .title {
            font-family: "Playfair Display", serif;
            font-size: 4.5rem;
            font-weight: 700;
            color: white;
            margin-bottom: 1rem;
            letter-spacing: 0.12em;
            position: relative;
            z-index: 1;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(234, 142, 234, 0.3);
            background: linear-gradient(to bottom, #ffffff, #e0c5e3);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
          }

          @media (min-width: 768px) {
            .title {
              font-size: 6.5rem;
            }
          }

          .title-underline {
            position: absolute;
            bottom: -0.5rem;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #ea8eea;
            transform: scaleX(0);
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            transform-origin: left;
          }

          .title-container:hover .title-underline {
            transform: scaleX(1);
          }

          .title-border {
            position: absolute;
            bottom: -0.25rem;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent,
              #ea8eea,
              transparent
            );
            opacity: 0.5;
          }

          .subtitle {
            font-size: 1.25rem;
            color: #e9d5ff;
            max-width: 42rem;
            margin: 1.5rem auto 0;
            line-height: 1.6;
            font-weight: 300;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }

          .events-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            opacity: 0;
          }

          .fade-in {
            animation: fadeIn 1s forwards;
          }

          .slide-up {
            animation: slideUp 0.8s forwards;
          }

          @media (min-width: 768px) {
            .events-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .events-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }

          .event-wrapper {
            position: relative;
            transform: translateY(20px);
            opacity: 0;
            cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          }

          .event-wrapper:hover {
            transform: translateY(-5px);
            z-index: 2;
          }

          .event-wrapper.selected::after {
            content: "";
            position: absolute;
            inset: -4px;
            border: 4px solid #ea8eea;
            border-radius: 1rem;
            pointer-events: none;
            z-index: 3;
            animation: glowBorder 1.5s infinite alternate;
          }

          @keyframes glowBorder {
            from {
              box-shadow: 0 0 5px rgba(234, 142, 234, 0.5);
            }
            to {
              box-shadow: 0 0 15px rgba(234, 142, 234, 0.8);
            }
          }

          .event-card-pixel {
            width: 100%;
            height: 100%;
            transition: all 0.3s ease;
          }

          .card-content {
            padding: 1.75rem;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.25rem;
          }

          .icon-container {
            padding: 0.85rem;
            border-radius: 9999px;
            background-color: rgba(234, 142, 234, 0.2);
            color: #ea8eea;
            transition: all 0.3s ease;
          }

          .event-wrapper:hover .icon-container {
            background-color: rgba(234, 142, 234, 0.3);
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(234, 142, 234, 0.4);
          }

          .icon {
            width: 2rem;
            height: 2rem;
          }

          .date-time {
            text-align: right;
          }

          .date,
          .time {
            font-size: 0.875rem;
            /* Remove transition to prevent hover animation */
            transition: none;
          }

          .date {
            color: #e9d5ff;
          }

          .time {
            color: #ea8eea;
            font-weight: 500;
          }

          /* Remove the hover style for time that caused the color change */
          .event-wrapper:hover .time {
            /* Remove color change on hover */
            color: #ea8eea;
          }

          .event-title {
            font-family: "Playfair Display", serif;
            font-size: 2rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.85rem;
            letter-spacing: 0.03em;
            transition: all 0.3s ease;
            line-height: 1.1;
          }

          .event-wrapper:hover .event-title {
            transform: scale(1.02);
            text-shadow: 0 2px 10px rgba(234, 142, 234, 0.5);
          }

          .event-description {
            color: rgba(233, 213, 255, 0.9);
            margin-bottom: 1.25rem;
            line-height: 1.5;
            font-weight: 300;
            flex-grow: 1;
          }

          .highlights {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin-bottom: 1rem;
          }

          .highlight {
            display: flex;
            align-items: center;
            color: #e9d5ff;
            transition: transform 0.3s ease;
          }

          .event-wrapper:hover .highlight {
            transform: translateX(3px);
          }

          .highlight-dot {
            width: 0.5rem;
            height: 0.5rem;
            background-color: #ea8eea;
            border-radius: 9999px;
            margin-right: 0.5rem;
            box-shadow: 0 0 5px rgba(234, 142, 234, 0.5);
          }

          .highlight-text {
            font-size: 0.875rem;
            font-weight: 300;
          }

          .venue-container {
            margin-top: 1.25rem;
            padding-top: 1.25rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .venue {
            display: flex;
            align-items: center;
            color: #e9d5ff;
          }

          .venue-label {
            color: #ea8eea;
            margin-right: 0.5rem;
            font-weight: 500;
          }

          .venue-text {
            font-size: 0.875rem;
          }

          .register-button {
            padding: 0.75rem 1.5rem;
            background: linear-gradient(
              135deg,
              rgba(234, 142, 234, 0.2),
              rgba(156, 39, 176, 0.3)
            );
            border: 1px solid rgba(234, 142, 234, 0.5);
            border-radius: 0.5rem;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-size: 0.9rem;
            transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
          }

          .register-button::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            transition: all 0.4s ease;
          }

          .register-button:hover {
            background: linear-gradient(
              135deg,
              rgba(234, 142, 234, 0.4),
              rgba(156, 39, 176, 0.5)
            );
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
              0 0 10px rgba(234, 142, 234, 0.4);
          }

          .register-button:hover::after {
            left: 100%;
          }

          .register-button:active {
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
          }

          /* Add variant-specific button styling */
          .event-wrapper:nth-child(1) .register-button {
            background: linear-gradient(
              135deg,
              rgba(156, 39, 176, 0.2),
              rgba(106, 27, 154, 0.3)
            );
            border-color: rgba(156, 39, 176, 0.5);
          }

          .event-wrapper:nth-child(1) .register-button:hover {
            background: linear-gradient(
              135deg,
              rgba(156, 39, 176, 0.4),
              rgba(106, 27, 154, 0.5)
            );
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
              0 0 10px rgba(156, 39, 176, 0.4);
          }

          .event-wrapper:nth-child(2) .register-button {
            background: linear-gradient(
              135deg,
              rgba(66, 165, 245, 0.2),
              rgba(21, 101, 192, 0.3)
            );
            border-color: rgba(66, 165, 245, 0.5);
          }

          .event-wrapper:nth-child(2) .register-button:hover {
            background: linear-gradient(
              135deg,
              rgba(66, 165, 245, 0.4),
              rgba(21, 101, 192, 0.5)
            );
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
              0 0 10px rgba(66, 165, 245, 0.4);
          }

          .event-wrapper:nth-child(3) .register-button {
            background: linear-gradient(
              135deg,
              rgba(236, 64, 122, 0.2),
              rgba(194, 24, 91, 0.3)
            );
            border-color: rgba(236, 64, 122, 0.5);
          }

          .event-wrapper:nth-child(3) .register-button:hover {
            background: linear-gradient(
              135deg,
              rgba(236, 64, 122, 0.4),
              rgba(194, 24, 91, 0.5)
            );
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
              0 0 10px rgba(236, 64, 122, 0.4);
          }

          .event-wrapper:nth-child(4) .register-button {
            background: linear-gradient(
              135deg,
              rgba(76, 175, 80, 0.2),
              rgba(27, 94, 32, 0.3)
            );
            border-color: rgba(76, 175, 80, 0.5);
          }

          .event-wrapper:nth-child(4) .register-button:hover {
            background: linear-gradient(
              135deg,
              rgba(76, 175, 80, 0.4),
              rgba(27, 94, 32, 0.5)
            );
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2),
              0 0 10px rgba(76, 175, 80, 0.4);
          }

          /* Mobile responsiveness for the button */
          @media (max-width: 480px) {
            .register-button {
              padding: 0.6rem 1.2rem;
              font-size: 0.8rem;
            }
          }

          .timeline-section {
            margin-top: 7rem;
            opacity: 0;
            animation-delay: 0.3s;
          }

          .timeline-title {
            font-family: "Playfair Display", serif;
            font-size: 3.5rem;
            font-weight: 700;
            color: white;
            text-align: center;
            margin-bottom: 1rem;
            letter-spacing: 0.08em;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(234, 142, 234, 0.3);
            background: linear-gradient(to bottom, #ffffff, #e0c5e3);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .divider-container {
            position: relative;
            display: flex;
            justify-content: center;
            margin-bottom: 4rem;
          }

          .section-divider {
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
            top: -4.5px;
            box-shadow: 0 0 10px rgba(234, 142, 234, 0.8);
            animation: pulseDivider 3s infinite;
          }

          @keyframes pulseDivider {
            0%,
            100% {
              transform: rotate(45deg) scale(1);
              box-shadow: 0 0 10px rgba(234, 142, 234, 0.8);
            }
            50% {
              transform: rotate(45deg) scale(1.2);
              box-shadow: 0 0 15px rgba(234, 142, 234, 1);
            }
          }

          .timeline {
            position: relative;
            padding-top: 2rem;
          }

          .timeline-line {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
            width: 3px;
            background: linear-gradient(
              to bottom,
              rgba(234, 142, 234, 0.1),
              rgba(234, 142, 234, 0.6),
              rgba(234, 142, 234, 0.1)
            );
            box-shadow: 0 0 10px rgba(234, 142, 234, 0.3);
          }

          .timeline-event {
            position: relative;
            display: flex;
            align-items: center;
            margin-bottom: 4rem;
            opacity: 0;
            transform: translateY(20px);
          }

          .timeline-event.left {
            justify-content: flex-start;
          }

          .timeline-event.right {
            justify-content: flex-end;
          }

          .timeline-content {
            width: 41.666667%;
            background-color: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            padding: 1.75rem;
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
          }

          .timeline-content:hover {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: rgba(234, 142, 234, 0.4);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25),
              0 0 15px rgba(234, 142, 234, 0.2);
            transform: translateY(-5px);
          }

          .timeline-event.left .timeline-content {
            text-align: right;
            padding-right: 2.5rem;
            clip-path: polygon(0 0, 94% 0, 100% 50%, 94% 100%, 0 100%);
          }

          .timeline-event.right .timeline-content {
            text-align: left;
            padding-left: 2.5rem;
            clip-path: polygon(6% 0, 100% 0, 100% 100%, 6% 100%, 0 50%);
          }

          .timeline-event-title {
            font-family: "Playfair Display", serif;
            font-size: 1.75rem;
            font-weight: 600;
            color: white;
            margin-bottom: 0.75rem;
            letter-spacing: 0.03em;
          }

          .timeline-datetime {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #ea8eea;
            font-size: 0.875rem;
            margin-bottom: 0.75rem;
            font-weight: 500;
          }

          .timeline-content:hover .timeline-datetime {
            color: white;
          }

          .dot {
            color: #ea8eea;
          }

          .timeline-venue {
            color: #e9d5ff;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }

          .timeline-description {
            color: rgba(233, 213, 255, 0.9);
            line-height: 1.5;
            font-weight: 300;
          }

          .timeline-marker {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 2.25rem;
            height: 2.25rem;
            background-color: #ea8eea;
            border-radius: 9999px;
            border: 4px solid #4c1d95;
            z-index: 10;
            box-shadow: 0 0 20px rgba(234, 142, 234, 0.6);
            transition: all 0.3s ease;
          }

          .timeline-event:hover .timeline-marker {
            transform: translateX(-50%) scale(1.2);
            box-shadow: 0 0 25px rgba(234, 142, 234, 0.8);
          }

          .timeline-ping {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background-color: #ea8eea;
            opacity: 0.25;
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }

          @keyframes ping {
            75%,
            100% {
              transform: scale(2.2);
              opacity: 0;
            }
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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .title {
              font-size: 3.5rem;
            }

            .subtitle {
              font-size: 1.1rem;
            }

            .timeline-title {
              font-size: 2.75rem;
            }

            .content {
              padding: 5rem 1rem 2rem;
            }

            .back-link {
              top: 1.5rem;
              left: 1.5rem;
              font-size: 0.9rem;
            }

            .timeline-content {
              width: 80%;
              clip-path: none !important;
            }

            .timeline-event.left,
            .timeline-event.right {
              justify-content: flex-start;
            }

            .timeline-line {
              left: 2rem;
            }

            .timeline-marker {
              left: 2rem;
            }

            .timeline-event.left .timeline-content,
            .timeline-event.right .timeline-content {
              text-align: left;
              padding-left: 4rem;
              padding-right: 1.5rem;
            }

            .event-wrapper {
              box-shadow: none;
            }

            /* Optimize particle effects for better performance */
            .particle-canvas {
              opacity: 0.7;
            }

            .light-beam {
              opacity: 0.4;
              width: 60px;
            }

            .vignette-effect {
              box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
            }

            /* Better touch targets */
            .register-button {
              padding: 0.8rem 1.4rem;
              min-height: 44px; /* Minimum apple recommended touch target */
            }

            .back-link {
              padding: 0.5rem 1rem;
              min-height: 44px;
              display: flex;
              align-items: center;
            }
          }

          /* Small phones (iPhone SE, Galaxy S8, etc.) */
          @media (max-width: 375px) {
            .title {
              font-size: 2.5rem;
              letter-spacing: 0.08em;
            }

            .subtitle {
              font-size: 1rem;
              margin: 1rem auto 0;
            }

            .back-link {
              top: 1rem;
              left: 1rem;
              font-size: 0.8rem;
              padding: 0.4rem 0.8rem;
            }

            .back-icon {
              width: 0.9rem;
              height: 0.9rem;
            }

            .events-grid {
              gap: 1.5rem;
            }

            .event-title {
              font-size: 1.5rem;
            }

            .event-description {
              font-size: 0.9rem;
            }

            .card-content {
              padding: 1.25rem;
            }

            .icon-container {
              padding: 0.7rem;
            }

            .icon {
              width: 1.5rem;
              height: 1.5rem;
            }

            .register-button {
              font-size: 0.75rem;
              padding: 0.6rem 1rem;
            }

            .timeline-title {
              font-size: 2rem;
            }

            .timeline-content {
              padding: 1.25rem;
              padding-left: 3rem;
            }

            .timeline-event-title {
              font-size: 1.3rem;
            }

            .timeline-line {
              left: 1.25rem;
            }

            .timeline-marker {
              left: 1.25rem;
              width: 1.75rem;
              height: 1.75rem;
            }
          }

          /* Medium phones (iPhone X/11/12/13, Pixel, etc.) */
          @media (min-width: 376px) and (max-width: 480px) {
            .title {
              font-size: 2.75rem;
            }

            .timeline-title {
              font-size: 2.25rem;
            }

            .event-title {
              font-size: 1.65rem;
            }

            .register-button {
              font-size: 0.8rem;
              padding: 0.6rem 1.2rem;
            }

            .timeline-marker {
              left: 1.5rem;
              width: 2rem;
              height: 2rem;
            }

            .timeline-line {
              left: 1.5rem;
            }

            .timeline-content {
              width: 85%;
              padding: 1.5rem;
              padding-left: 3.5rem;
            }
          }

          /* Larger phones (iPhone Pro Max, Samsung Galaxy S21 Ultra, etc.) */
          @media (min-width: 481px) and (max-width: 768px) {
            .title {
              font-size: 3.25rem;
            }

            .events-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1.5rem;
            }

            .card-content {
              padding: 1.5rem;
            }

            /* For larger phones, improve readability while preserving design */
            .event-description {
              line-height: 1.6;
            }

            .timeline-content {
              width: 75%;
            }
          }

          /* Landscape orientation specific adjustments */
          @media (max-height: 480px) and (orientation: landscape) {
            .content {
              padding-top: 4rem;
            }

            .back-link {
              top: 0.75rem;
            }

            .header {
              margin-bottom: 0.5rem;
            }

            .title {
              font-size: 2.5rem;
              margin-bottom: 0.5rem;
            }

            .subtitle {
              margin-top: 0.5rem;
            }

            .events-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
            }

            .card-content {
              padding: 1rem;
            }

            .event-title {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
            }

            .event-description {
              margin-bottom: 0.75rem;
              max-height: 80px;
              overflow-y: auto;
            }

            .highlights {
              gap: 0.3rem;
              margin-bottom: 0.5rem;
              max-height: 80px;
              overflow-y: auto;
            }

            .venue-container {
              margin-top: 0.75rem;
              padding-top: 0.75rem;
            }
          }

          /* High pixel density screens (retina and higher) */
          @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .background-img {
              image-rendering: -webkit-optimize-contrast;
            }

            /* Increase contrast for better visibility on high-res screens */
            .event-description,
            .timeline-description {
              color: rgba(233, 213, 255, 0.95);
            }

            .highlight-dot {
              box-shadow: 0 0 7px rgba(234, 142, 234, 0.6);
            }
          }

          /* Dark mode specific adjustments */
          @media (prefers-color-scheme: dark) {
            .background-overlay {
              background: linear-gradient(
                135deg,
                rgba(60, 20, 80, 0.9),
                rgba(30, 15, 50, 0.95),
                rgba(80, 25, 90, 0.85)
              );
            }

            .vignette-effect {
              box-shadow: inset 0 0 180px rgba(0, 0, 0, 0.8);
            }
          }

          /* Special handling for notched phones (iPhone X and newer) */
          @supports (padding: max(0px)) {
            .back-link {
              padding-left: max(1rem, env(safe-area-inset-left));
              top: max(1.5rem, env(safe-area-inset-top));
            }

            .content {
              padding-left: max(1rem, env(safe-area-inset-left));
              padding-right: max(1rem, env(safe-area-inset-right));
              padding-bottom: max(4rem, env(safe-area-inset-bottom) + 2rem);
            }
          }

          /* Ensure scrolling works properly on all devices */
          @media (max-height: 800px) {
            .container {
              height: auto;
              min-height: 100vh;
              /* Ensure no extra padding at bottom */
              padding-bottom: 0;
            }
          }

          /* Fix potential Safari background-attachment issues */
          @supports (-webkit-touch-callout: none) {
            .container {
              background-attachment: scroll;
            }
          }

          /* Footer Styling */
          .footer-wrapper {
            position: relative;
            z-index: 5;
            width: 100%;
            margin-top: 4rem;
            backdrop-filter: blur(10px);
            background: rgba(30, 15, 50, 0.5);
            border-top: 1px solid rgba(234, 142, 234, 0.2);
            box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.2);
            /* Ensure footer sticks to the bottom with no extra space */
            margin-bottom: 0;
          }

          @media (max-width: 768px) {
            .footer-wrapper {
              margin-top: 2rem;
            }
          }

          /* Fix for other responsive styles */
          @media (max-width: 480px) {
            .content {
              padding-bottom: 2rem;
            }
          }

          /* Fix for notched phones */
          @supports (padding: max(0px)) {
            .footer-wrapper {
              padding-bottom: max(1rem, env(safe-area-inset-bottom));
            }
          }
        `}</style>
      </div>
    </>
  );
}

// Explicitly export with named export for better Next.js compatibility
export default App;
