import React from "react";

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

const TeamComponent: React.FC<{ team: Team }> = ({ team }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{team.name}</h2>
      {team.description && <p className="text-gray-600">{team.description}</p>}

      <h3 className="mt-4 text-xl font-semibold">Heads</h3>
      <div className="flex gap-4">
        {team.heads.map((head) => (
          <div key={head.id} className="p-2 border rounded-md">
            <img
              src={head.avatar || "default-avatar.png"}
              alt={head.name}
              className="w-16 h-16 rounded-full"
            />
            <p className="font-semibold">{head.name}</p>
            <p className="text-sm text-gray-500">{head.position}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-xl font-semibold">Members</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {team.members.map((member) => (
          <div key={member.id} className="p-2 border rounded-md">
            <img
              src={member.avatar || "default-avatar.png"}
              alt={member.name}
              className="w-16 h-16 rounded-full"
            />
            <p className="font-semibold">{member.name}</p>
            <p className="text-sm text-gray-500">{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComponent;
