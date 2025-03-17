import React, { useState, useEffect, useRef } from "react";
import {
  ChartBar,
  Cpu,
  Code,
  Speech,
  ChevronLeft,
  Users,
  Palette,
  FileText,
  Camera,
  Share2,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

import PixelCard from "../../components/pixelcard"; // Ensure PixelCard is imported
import Footer from "@/components/Footer";

// Team data structure
interface TeamMember {
  name: string;
  position: string;
  image?: string;
}

interface Team {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  members: TeamMember[];
}

const TeamPage = () => {
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [showcaseTeam, setShowcaseTeam] = useState<string>("office-bearers");

  // Define teams data
  const teams: Team[] = [
    {
      id: "office-bearers",
      name: "Office Bearers",
      icon: <Users className="h-6 w-6" />,
      description:
        "The leadership team guiding our organization's vision and strategic direction.",
      members: [
        { name: "Alex Johnson", position: "President" },
        { name: "Sarah Williams", position: "Vice President" },
        { name: "Michael Chen", position: "Secretary" },
      ],
    },
    {
      id: "management",
      name: "Management Team",
      icon: <ChartBar className="h-6 w-6" />,
      description:
        "Coordinating all activities and ensuring smooth operation of the organization.",
      members: [
        { name: "Jessica Lee", position: "Project Manager" },
        { name: "Robert Smith", position: "Operations Lead" },
        { name: "Emma Davis", position: "Resource Coordinator" },
      ],
    },
    {
      id: "tech",
      name: "Tech Team",
      icon: <Code className="h-6 w-6" />,
      description:
        "Building and maintaining the technological infrastructure and applications.",
      members: [
        { name: "David Park", position: "Lead Developer" },
        { name: "Priya Sharma", position: "Backend Engineer" },
        { name: "Ryan Wilson", position: "Frontend Developer" },
      ],
    },
    {
      id: "design",
      name: "Design Team",
      icon: <Palette className="h-6 w-6" />,
      description:
        "Creating visually appealing designs and user experiences for all our platforms.",
      members: [
        { name: "Sophia Martinez", position: "UI/UX Lead" },
        { name: "Liam Brown", position: "Graphic Designer" },
        { name: "Aisha Khan", position: "Motion Designer" },
      ],
    },
    {
      id: "content",
      name: "Content Team",
      icon: <FileText className="h-6 w-6" />,
      description:
        "Developing and curating engaging content across all our channels.",
      members: [
        { name: "Noah Taylor", position: "Content Strategist" },
        { name: "Olivia Garcia", position: "Writer" },
        { name: "Ethan Wright", position: "Editor" },
      ],
    },
    {
      id: "multimedia",
      name: "Multimedia Team",
      icon: <Camera className="h-6 w-6" />,
      description:
        "Creating videos, photos, and interactive media to enhance our communication.",
      members: [
        { name: "Isabella Lopez", position: "Video Producer" },
        { name: "Lucas Nelson", position: "Photographer" },
        { name: "Zoe Thomas", position: "Audio Engineer" },
      ],
    },
    {
      id: "social-media",
      name: "Social Media Team",
      icon: <Share2 className="h-6 w-6" />,
      description:
        "Managing our presence and engagement across various social platforms.",
      members: [
        { name: "Mason Clark", position: "Social Media Manager" },
        { name: "Ava Rodriguez", position: "Community Manager" },
        { name: "Leo Kim", position: "Analytics Specialist" },
      ],
    },
    {
      id: "pr-outreach",
      name: "PR & Outreach Team",
      icon: <Megaphone className="h-6 w-6" />,
      description:
        "Building relationships with external partners and promoting our initiatives.",
      members: [
        { name: "Charlotte Evans", position: "PR Lead" },
        { name: "Benjamin White", position: "Outreach Coordinator" },
        { name: "Amara Okafor", position: "Partnership Manager" },
      ],
    },
  ];

  // Toggle team details
  const handleTeamClick = (teamId: string) => {
    setActiveTeam(activeTeam === teamId ? null : teamId);
  };

  // Auto cycle through teams for the showcase
  useEffect(() => {
    const interval = setInterval(() => {
      // Get current team index
      const currentIndex = teams.findIndex((team) => team.id === showcaseTeam);
      // Get next team index (or loop back to start)
      const nextIndex = (currentIndex + 1) % teams.length;
      // Set next team
      setShowcaseTeam(teams[nextIndex].id);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [showcaseTeam, teams]);

  // Get the currently showcased team
  const currentShowcaseTeam = teams.find((team) => team.id === showcaseTeam);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Our Teams | Triverse</title>
        <meta name="description" content="Meet the teams behind Triverse" />
      </Head>
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Our Teams
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the incredible people who make everything possible. Each team
            brings unique skills and passion to our mission.
          </p>
        </div>

        {/* Team Showcase Section - Auto-cycling */}
        <div className="team-showcase">
          <div className="team-tabs">
            {teams.map((team) => (
              <button
                key={team.id}
                className={`team-tab ${
                  showcaseTeam === team.id ? "active" : ""
                }`}
                onClick={() => setShowcaseTeam(team.id)}
              >
                <div className="tab-icon">{team.icon}</div>
                <span className="tab-name">{team.name}</span>
              </button>
            ))}
          </div>

          {currentShowcaseTeam && (
            <div className="showcase-content">
              <div className="showcase-header">
                <h2 className="showcase-title">{currentShowcaseTeam.name}</h2>
                <p className="showcase-description">
                  {currentShowcaseTeam.description}
                </p>
              </div>

              <div className="showcase-members">
                {currentShowcaseTeam.members.map((member, idx) => (
                  <div key={idx} className="showcase-member">
                    <div className="member-avatar-large">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="avatar-image-large"
                        />
                      ) : (
                        <span>{member.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="member-info">
                      <h3 className="showcase-member-name">{member.name}</h3>
                      <p className="showcase-member-position">
                        {member.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Teams Grid */}
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team.id} className="team-card-container">
              <PixelCard
                onClick={() => handleTeamClick(team.id)}
                className={`team-card ${
                  activeTeam === team.id ? "active" : ""
                }`}
              >
                <div className="team-card-content">
                  <div className="team-header">
                    <div className="team-icon">{team.icon}</div>
                    <h3 className="team-name">{team.name}</h3>
                  </div>
                  <p className="team-description">{team.description}</p>

                  {/* Only show this when team is active */}
                  {activeTeam === team.id && (
                    <div className="team-members animate-fadeIn">
                      <h4 className="members-title">Team Members</h4>
                      <ul className="members-list">
                        {team.members.map((member, idx) => (
                          <li key={idx} className="member-item">
                            <div className="member-avatar">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="avatar-image"
                                />
                              ) : (
                                <span>{member.name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="member-name">{member.name}</p>
                              <p className="member-position">
                                {member.position}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTeam !== team.id && (
                    <p className="team-cta">Click to see members →</p>
                  )}
                </div>
              </PixelCard>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CTA Section */}
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Passionate about what we do? We're always looking for talented
            individuals to join our teams.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      <Footer />

      {/* Add some custom styles for animations and team components */}
      <style jsx>{`
        .teams-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }

        .team-card-container {
          position: relative;
        }

        .team-card {
          height: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .team-card:hover {
          transform: scale(1.05);
        }

        .team-card.active {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
          border: 2px solid #3b82f6;
        }

        .team-card-content {
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .team-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .team-icon {
          background-color: rgba(59, 130, 246, 0.2);
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-right: 1rem;
        }

        .team-name {
          font-size: 1.25rem;
          font-weight: bold;
        }

        .team-description {
          color: #d1d5db;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .team-cta {
          color: #60a5fa;
          margin-top: auto;
        }

        .team-members {
          margin-top: 1rem;
        }

        .members-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #60a5fa;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .member-item {
          display: flex;
          align-items: center;
        }

        .member-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: linear-gradient(to right, #2563eb, #9333ea);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }

        .avatar-image {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }

        .member-name {
          font-weight: 500;
        }

        .member-position {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Media queries for responsive grid */
        @media (min-width: 768px) {
          .teams-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .teams-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
        }

        /* New styles for team showcase */
        .team-showcase {
          background: rgba(30, 41, 59, 0.4);
          border-radius: 10px;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .team-tabs {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 0.5rem;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .team-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 100px;
          text-align: center;
        }

        .team-tab:hover {
          color: #f8fafc;
          background: rgba(59, 130, 246, 0.1);
        }

        .team-tab.active {
          color: #f8fafc;
          background: rgba(59, 130, 246, 0.2);
          border-bottom: 2px solid #3b82f6;
        }

        .tab-icon {
          margin-bottom: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .active .tab-icon {
          background: rgba(59, 130, 246, 0.3);
        }

        .tab-name {
          font-weight: 500;
          font-size: 0.875rem;
          white-space: nowrap;
        }

        .showcase-content {
          animation: fadeIn 0.5s ease-out;
        }

        .showcase-header {
          margin-bottom: 2rem;
        }

        .showcase-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .showcase-description {
          font-size: 1.125rem;
          color: #cbd5e1;
          max-width: 800px;
        }

        .showcase-members {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .showcase-member {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: rgba(30, 41, 59, 0.6);
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .showcase-member:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        .member-avatar-large {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #9333ea);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-size: 1.5rem;
          color: white;
        }

        .avatar-image-large {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .member-info {
          flex: 1;
        }

        .showcase-member-name {
          font-weight: 600;
          font-size: 1.125rem;
          color: #f8fafc;
        }

        .showcase-member-position {
          font-size: 0.9375rem;
          color: #94a3b8;
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .showcase-members {
            grid-template-columns: 1fr;
          }

          .team-tabs {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
