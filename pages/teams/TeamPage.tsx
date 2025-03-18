import React, { useState, useEffect } from "react";
import TeamSection from "./TeamSection";
import { teamData } from "./teamData";

const TeamPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading for smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToTeam = (teamId: string) => {
    setSelectedTeam(teamId);
    const element = document.getElementById(`team-${teamId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="team-page">
      <div className="container">
        <h1 className="page-title">
          <span className="title-text">Our Team</span>
          <div className="title-underline"></div>
        </h1>

        <p className="page-description">
          Meet the talented individuals driving innovation and excellence at
          Triverse
        </p>

        <div className="teams-navigation">
          {teamData.map((team) => (
            <button
              key={team.id}
              className={`team-nav-button ${
                selectedTeam === team.id ? "active" : ""
              }`}
              onClick={() => scrollToTeam(team.id)}
            >
              {team.name}
              {selectedTeam === team.id && (
                <span className="active-indicator"></span>
              )}
            </button>
          ))}
        </div>

        <div className={`teams-container ${isLoaded ? "loaded" : ""}`}>
          {teamData.map((team, index) => (
            <div
              key={team.id}
              className="team-section-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TeamSection key={team.id} team={team} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-page {
          padding: 100px 0 60px;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .page-title {
          text-align: center;
          position: relative;
          padding-bottom: 0.5rem;
          margin-bottom: 15px;
        }

        .title-text {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: "Playfair Display", serif;
          text-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          background: linear-gradient(to right, #ffffff, #d8b4fe, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-underline {
          position: relative;
          height: 3px;
          width: 150px;
          background: linear-gradient(
            to right,
            rgba(147, 51, 234, 0),
            rgba(147, 51, 234, 1),
            rgba(147, 51, 234, 0)
          );
          margin: 0.5rem auto 0;
        }

        .title-underline::after {
          content: "";
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #9333ea;
          transform: translateX(-50%) rotate(45deg);
          box-shadow: 0 0 15px rgba(147, 51, 234, 0.8);
        }

        .page-description {
          text-align: center;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 50px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          font-weight: 300;
          letter-spacing: 0.5px;
          line-height: 1.6;
        }

        .teams-navigation {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          padding: 10px;
          background: rgba(20, 20, 40, 0.5);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .team-nav-button {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .team-nav-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          transform: translateY(-2px);
        }

        .team-nav-button.active {
          background: rgba(147, 51, 234, 0.2);
          color: white;
          box-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
        }

        .active-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, #9333ea, #ea8eea);
          animation: indicatorPulse 2s infinite;
        }

        @keyframes indicatorPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }

        .teams-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .teams-container.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .team-section-wrapper {
          animation: slideUp 0.8s forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .title-text {
            font-size: 2.5rem;
          }

          .page-description {
            font-size: 1rem;
          }

          .teams-container {
            gap: 40px;
          }

          .teams-navigation {
            overflow-x: auto;
            padding: 15px 10px;
            -webkit-overflow-scrolling: touch;
            flex-wrap: nowrap;
            justify-content: flex-start;
          }

          .team-nav-button {
            padding: 10px 15px;
            font-size: 0.8rem;
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
