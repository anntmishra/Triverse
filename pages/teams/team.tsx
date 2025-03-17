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

import PixelCard from "../../components/pixelcard";
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

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {teams.map((team) => (
            <div key={team.id} className="relative">
              <PixelCard
                onClick={() => handleTeamClick(team.id)}
                className={`h-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                  activeTeam === team.id
                    ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20"
                    : ""
                }`}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      {team.icon}
                    </div>
                    <h3 className="text-xl font-bold">{team.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-4 flex-grow">
                    {team.description}
                  </p>

                  {/* Only show this when team is active */}
                  {activeTeam === team.id && (
                    <div className="mt-4 animate-fadeIn">
                      <h4 className="text-lg font-semibold mb-2 text-blue-400">
                        Team Members
                      </h4>
                      <ul className="space-y-2">
                        {team.members.map((member, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <span>{member.name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-400">
                                {member.position}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTeam !== team.id && (
                    <p className="text-blue-400 mt-auto">
                      Click to see members →
                    </p>
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

      {/* Add some custom styles for animations */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default TeamPage;
