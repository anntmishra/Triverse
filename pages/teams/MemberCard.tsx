import React from "react";
import { Member } from "./type";

interface MemberCardProps {
  member: Member;
  isLeader: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isLeader }) => {
  return (
    <div className={`member-card ${isLeader ? "leader-card" : ""}`}>
      <div className="card-inner">
        <div className="card-front">
          <div className="member-avatar">
            <img
              src={
                member.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  member.name
                )}&background=random&color=fff&size=200`
              }
              alt={member.name}
            />
            {isLeader && <div className="leader-badge">{member.position}</div>}
          </div>
          <h4 className="member-name">{member.name}</h4>
          <p className="member-position">{isLeader ? "" : member.position}</p>
        </div>

        <div className="card-back">
          <p className="member-bio">{member.bio || "Team member"}</p>
        </div>
      </div>

      <style jsx>{`
        .member-card {
          perspective: 1000px;
          height: 320px;
          background-color: transparent;
        }

        .leader-card {
          height: 350px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
        }

        .member-card:hover .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card-front {
          background-color: white;
          color: #333;
        }

        .leader-card .card-front {
          background: linear-gradient(to bottom, #f5f7fa, #e8ecf1);
        }

        .card-back {
          background-color: #4a90e2;
          color: white;
          transform: rotateY(180deg);
        }

        .leader-card .card-back {
          background: linear-gradient(45deg, #3a7bd5, #00d2ff);
        }

        .member-avatar {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 15px;
          border: 3px solid #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .leader-card .member-avatar {
          width: 140px;
          height: 140px;
          border: 4px solid #4a90e2;
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .leader-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(74, 144, 226, 0.9);
          color: white;
          padding: 3px 0;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 5px 0;
        }

        .leader-card .member-name {
          font-size: 1.3rem;
        }

        .member-position {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        .member-bio {
          font-size: 0.95rem;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: auto;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.2s ease;
        }

        .social-links a:hover {
          background-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .member-card {
            height: 300px;
          }

          .leader-card {
            height: 330px;
          }

          .member-avatar {
            width: 100px;
            height: 100px;
          }

          .leader-card .member-avatar {
            width: 120px;
            height: 120px;
          }

          .member-name {
            font-size: 1.1rem;
          }

          .leader-card .member-name {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MemberCard;
