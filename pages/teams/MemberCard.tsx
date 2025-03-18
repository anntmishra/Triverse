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

          <div className="social-links">
            {member.social?.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}

            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}

            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            )}

            {member.social?.email && (
              <a href={`mailto:${member.social.email}`} aria-label="Email">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
              </a>
            )}
          </div>
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
