import React, { useState } from "react";
import MemberCard from "./MemberCard";
import { Team } from "./type";

interface TeamSectionProps {
  team: Team;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  const [expanded, setExpanded] = useState(false);

  // Special case for Office Bearers - combine heads and members
  const isOfficeBearers = team.id === "office-bearers";
  const allMembers = isOfficeBearers ? [...team.heads, ...team.members] : [];

  return (
    <section className="team-section" id={`team-${team.id}`}>
      <div className="team-header">
        <h2 className="team-title">{team.name}</h2>
        <div className="divider-container">
          <div className="divider"></div>
          <div className="divider-gem"></div>
        </div>
      </div>

      {team.description && (
        <p className="team-description">{team.description}</p>
      )}

      {isOfficeBearers ? (
        // Display all Office Bearers equally
        <div className="members-section">
          <div className="members-grid office-bearers-grid">
            {allMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                isLeader={false} // Treat all as equals
              />
            ))}
          </div>
        </div>
      ) : (
        // For other teams, maintain separation between leaders and members
        <>
          <div className="leaders-section">
            <h3 className="section-subtitle">Leadership</h3>
            <div className="members-grid leaders-grid">
              {team.heads.map((member) => (
                <MemberCard key={member.id} member={member} isLeader={true} />
              ))}
            </div>
          </div>

          {team.members.length > 0 && (
            <div className="members-section">
              <h3 className="section-subtitle">Team Members</h3>
              <div className={`members-grid ${expanded ? "expanded" : ""}`}>
                {team.members
                  .slice(0, expanded ? team.members.length : 6)
                  .map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      isLeader={false}
                    />
                  ))}
              </div>

              {team.members.length > 6 && (
                <button
                  className="expand-button"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show Less" : "Show More"}
                  <span className="button-glow"></span>
                </button>
              )}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .team-section {
          background: rgba(30, 30, 60, 0.6);
          border-radius: 16px;
          padding: 35px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
          position: relative;
        }

        .team-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(147, 51, 234, 0.5),
            transparent
          );
        }

        .team-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(147, 51, 234, 0.1);
          border-color: rgba(147, 51, 234, 0.2);
        }

        .team-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .team-title {
          font-size: 2.2rem;
          color: white;
          margin-bottom: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }

        .divider-container {
          position: relative;
          display: flex;
          justify-content: center;
          margin: 10px 0 20px;
        }

        .divider {
          height: 3px;
          width: 80px;
          background: linear-gradient(
            to right,
            rgba(147, 51, 234, 0.2),
            rgba(147, 51, 234, 0.8),
            rgba(147, 51, 234, 0.2)
          );
          border-radius: 3px;
        }

        .divider-gem {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #9333ea;
          top: -2.5px;
          transform: rotate(45deg);
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.8);
        }

        .team-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 30px;
          line-height: 1.6;
          text-align: center;
          font-weight: 300;
        }

        .section-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 25px;
          font-weight: 500;
          position: relative;
          display: inline-block;
          padding-bottom: 8px;
        }

        .section-subtitle::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(147, 51, 234, 0.8),
            rgba(147, 51, 234, 0.5),
            transparent
          );
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .leaders-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .members-grid:not(.expanded) {
          max-height: 650px;
          overflow: hidden;
          position: relative;
        }

        .members-grid:not(.expanded)::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(
            to bottom,
            rgba(30, 30, 46, 0),
            rgba(30, 30, 46, 0.9)
          );
          pointer-events: none;
          opacity: 0.8;
        }

        .leaders-section,
        .members-section {
          margin-top: 40px;
        }

        .expand-button {
          background: rgba(147, 51, 234, 0.2);
          color: white;
          border: 1px solid rgba(147, 51, 234, 0.4);
          padding: 12px 30px;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          display: block;
          margin: 0 auto;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 10;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .expand-button:hover {
          background: rgba(147, 51, 234, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2),
            0 0 10px rgba(147, 51, 234, 0.3);
        }

        .button-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(74, 144, 226, 0.2) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .expand-button:hover .button-glow {
          opacity: 1;
        }

        .office-bearers-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          padding-top: 10px;
        }

        @media (max-width: 768px) {
          .team-section {
            padding: 25px 20px;
          }

          .team-title {
            font-size: 1.8rem;
          }

          .section-subtitle {
            font-size: 1.3rem;
          }

          .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }

          .team-description {
            font-size: 1rem;
          }

          .expand-button {
            padding: 10px 25px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
