import React, { useState } from "react";
import MemberCard from "./MemberCard";
import { Team } from "./type";

interface TeamSectionProps {
  team: Team;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="team-section" id={`team-${team.id}`}>
      <h2 className="team-title">{team.name}</h2>
      <div className="divider"></div>

      {team.description && (
        <p className="team-description">{team.description}</p>
      )}

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
                <MemberCard key={member.id} member={member} isLeader={false} />
              ))}
          </div>

          {team.members.length > 6 && (
            <button
              className="expand-button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .team-section {
          background-color: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .team-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .team-title {
          font-size: 2.2rem;
          color: #333;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .divider {
          height: 4px;
          width: 60px;
          background-color: #4a90e2;
          margin-bottom: 20px;
          border-radius: 2px;
        }

        .team-description {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .section-subtitle {
          font-size: 1.5rem;
          color: #444;
          margin-bottom: 20px;
          font-weight: 500;
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
        }

        .leaders-section,
        .members-section {
          margin-top: 30px;
        }

        .expand-button {
          background-color: transparent;
          color: #4a90e2;
          border: 2px solid #4a90e2;
          padding: 10px 25px;
          font-size: 1rem;
          border-radius: 50px;
          cursor: pointer;
          display: block;
          margin: 0 auto;
          transition: all 0.3s ease;
        }

        .expand-button:hover {
          background-color: #4a90e2;
          color: white;
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
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
