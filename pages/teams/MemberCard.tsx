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
            <div className="avatar-glow"></div>
          </div>
          <h4 className="member-name">{member.name}</h4>
          <p className="member-position">{isLeader ? "" : member.position}</p>
          <div className="card-shine"></div>
        </div>

        <div className="card-back">
          <div className="back-pattern"></div>
          <p className="member-bio">{member.bio || "Team member"}</p>
          <div className="card-border"></div>
        </div>
      </div>

      <style jsx>{`
        .member-card {
          perspective: 1000px;
          height: 320px;
          background-color: transparent;
          cursor: pointer;
        }

        .leader-card {
          height: 350px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
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
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card-front {
          background: linear-gradient(145deg, #ffffff, #f0f0f0);
          color: #333;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .leader-card .card-front {
          background: linear-gradient(145deg, #f8f9fd, #e8ecf1);
          border: 1px solid rgba(147, 51, 234, 0.1);
        }

        .card-back {
          background: linear-gradient(135deg, #9333ea, #6366f1);
          color: white;
          transform: rotateY(180deg);
          box-shadow: 0 15px 35px rgba(147, 51, 234, 0.2);
        }

        .leader-card .card-back {
          background: linear-gradient(135deg, #7e22ce, #3b82f6);
        }

        .back-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          background-image: radial-gradient(
              circle at 25px 25px,
              white 2%,
              transparent 2.5%
            ),
            radial-gradient(circle at 75px 75px, white 2%, transparent 2.5%);
          background-size: 100px 100px;
          pointer-events: none;
        }

        .member-avatar {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 15px;
          border: 3px solid #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .avatar-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(147, 51, 234, 0.3) 0%,
            rgba(147, 51, 234, 0) 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .member-card:hover .avatar-glow {
          opacity: 1;
        }

        .leader-card .member-avatar {
          width: 140px;
          height: 140px;
          border: 4px solid rgba(147, 51, 234, 0.3);
        }

        .member-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .member-card:hover .member-avatar img {
          transform: scale(1.05);
        }

        .leader-badge {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #9333ea, #6366f1);
          color: white;
          padding: 3px 0;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 5px 0;
          background: linear-gradient(90deg, #6366f1, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .leader-card .member-name {
          font-size: 1.3rem;
        }

        .member-position {
          font-size: 0.9rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        .member-bio {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
          font-weight: 400;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: all 0.6s ease;
          transform: skewX(-15deg);
          pointer-events: none;
        }

        .member-card:hover .card-shine {
          left: 150%;
          transition: all 0.6s ease 0.1s;
        }

        .card-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 15px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 25px rgba(147, 51, 234, 0.3);
          opacity: 0.7;
          pointer-events: none;
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
