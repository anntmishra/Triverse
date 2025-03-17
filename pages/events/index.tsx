import React, { useState, useEffect } from "react";
import { Calendar, Brain, Lightbulb, Mic, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import PixelCard from "../../components/pixelcard";

function App() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Animation delay for page elements
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const events = [
    {
      id: "finlit",
      title: "FinLit",
      icon: <Lightbulb className="icon" />,
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
      icon: <Calendar className="icon" />,
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
      icon: <Brain className="icon" />,
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
    {
      id: "tedtalk",
      title: "TED Talk + Prizes",
      icon: <Mic className="icon" />,
      description:
        "Inspiring talks from industry leaders, innovators, and thought pioneers sharing their insights on technology, entrepreneurship, and digital transformation.",
      highlights: [
        "Keynote presentations",
        "Interactive Q&A sessions",
        "Prize distribution ceremony",
        "Networking opportunities",
      ],
      date: "March 30, 2025",
      time: "4 PM – 8 PM",
      venue: "ALH 002",
      variant: "green", // Adding variant for PixelCard
    },
  ];

  const timelineEvents = [
    ...events,
    {
      id: "seekhathon-end",
      title: "Seekhathon Finale",
      icon: <Brain className="icon" />,
      description:
        "The culmination of our 24-hour learning marathon. Teams present their completed projects, demonstrate their solutions, and share their learning experiences with the community.",
      date: "March 30, 2025",
      time: "2:00 PM",
      venue: "P Block",
    },
  ].sort((a, b) => {
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
      </Head>

      <div className="container">
        {/* Fix background image path */}
        <div className="background-layer">
          <div className="img-background">
            <img
              src="/assets/website2.png"
              alt="Tech Event Background"
              className="background-img"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          {/* Add a semi-transparent overlay to improve content visibility */}
          <div className="background-overlay"></div>
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

        <style jsx>{`
          .container {
            min-height: 100vh;
            position: relative;
            padding-bottom: 4rem;
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

          /* Add a semi-transparent overlay for better content visibility */
          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              to bottom,
              rgba(60, 20, 80, 0.8),
              rgba(30, 15, 50, 0.85)
            );
            pointer-events: none;
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
            transition: all 0.3s ease;
          }

          .date {
            color: #e9d5ff;
          }

          .time {
            color: #ea8eea;
            font-weight: 500;
          }

          .event-wrapper:hover .time {
            color: white;
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
          }

          @media (max-width: 480px) {
            .title {
              font-size: 2.75rem;
            }

            .timeline-title {
              font-size: 2.25rem;
            }

            .back-link {
              padding: 0.4rem 0.8rem;
            }

            .back-icon {
              width: 1rem;
              height: 1rem;
            }

            .event-title {
              font-size: 1.75rem;
            }

            .timeline-event-title {
              font-size: 1.5rem;
            }

            .timeline-content {
              width: 85%;
              padding: 1.5rem;
              padding-left: 3.5rem;
            }

            .timeline-line {
              left: 1.5rem;
            }

            .timeline-marker {
              left: 1.5rem;
              width: 2rem;
              height: 2rem;
            }
          }

          /* Ensure scrolling works properly on all devices */
          @media (max-height: 800px) {
            .container {
              height: auto;
              min-height: 100vh;
            }
          }

          /* Fix potential Safari background-attachment issues */
          @supports (-webkit-touch-callout: none) {
            .container {
              background-attachment: scroll;
            }
          }
        `}</style>
      </div>
    </>
  );
}

// Explicitly export with named export for better Next.js compatibility
export default App;
