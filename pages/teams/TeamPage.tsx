import React from "react";
import TeamSection from "./TeamSection";
import { teamData } from "./teamData";

const TeamPage: React.FC = () => {
  return (
    <div className="team-page">
      <div className="container">
        <h1 className="page-title">Our Team</h1>
        <p className="page-description">
          Meet the talented individuals who make our organization successful
        </p>

        <div className="teams-container">
          {teamData.map((team) => (
            <TeamSection key={team.id} team={team} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-page {
          padding: 60px 0;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .page-title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 15px;
          color: #333;
          font-weight: 700;
        }

        .page-description {
          text-align: center;
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 50px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .teams-container {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.2rem;
          }

          .page-description {
            font-size: 1rem;
          }

          .teams-container {
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
