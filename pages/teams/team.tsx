import React from "react";
import {teamData} from "./teamdata"; // Assuming the previous artifact is saved as teamdata.ts

interface Social {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface Member {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  bio?: string;
  social?: Social;
}

interface Team {
  id: string;
  name: string;
  description?: string;
  heads: Member[];
  members: Member[];
}

const TeamComponent: React.FC = () => {
  // Using the first team in the array or provide a teamId prop to select a specific team
  const team = teamData[0]; // Access the first team in the array

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{team.name}</h2>
      {team.description && <p className="text-gray-600">{team.description}</p>}

      <h3 className="mt-4 text-xl font-semibold">Team Leads</h3>
      <div className="flex gap-4">
        {team.heads.map((head) => (
          <div key={head.id} className="p-2 border rounded-md text-center">
            <img
              src={head.avatar || "default-avatar.png"}
              alt={head.name}
              className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="font-semibold">{head.name}</p>
            <p className="text-sm text-gray-500">{head.position}</p>
            {head.bio && <p className="text-xs text-gray-600 mt-1">{head.bio}</p>}
            {head.social && (
              <div className="flex justify-center gap-2 mt-2">
                {head.social.linkedin && <a href={head.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                {head.social.twitter && <a href={`https://twitter.com/${head.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">Twitter</a>}
                {head.social.github && <a href={head.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-xl font-semibold">Team Members</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.members.map((member) => (
          <div key={member.id} className="p-2 border rounded-md text-center">
            <img
              src={member.avatar || "default-avatar.png"}
              alt={member.name}
              className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="font-semibold">{member.name}</p>
            <p className="text-sm text-gray-500">{member.position}</p>
            {member.social && (
              <div className="flex justify-center gap-2 mt-2">
                {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                {member.social.twitter && <a href={`https://twitter.com/${member.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">Twitter</a>}
                {member.social.github && <a href={member.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                {member.social.email && <a href={`mailto:${member.social.email}`}>Email</a>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComponent;