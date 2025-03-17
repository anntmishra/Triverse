import { useState, useEffect } from "react";

const teams = [
  {
    name: "Office Bearers",
    members: [
      "John Doe",
      "Jane Smith",
      "Alice Brown",
      "Bob White",
      "Charlie Green",
      "David Black",
      "Emily Red",
      "Frank Blue",
    ],
  },
  {
    name: "Management",
    members: [
      "George Yellow",
      "Hannah Grey",
      "Ivy Purple",
      "Jack Orange",
      "Kelly Cyan",
      "Liam Magenta",
      "Mia Lime",
      "Nathan Teal",
    ],
  },
  {
    name: "Design",
    members: [
      "Oliver Sky",
      "Paula Pink",
      "Quinn Indigo",
      "Ryan Violet",
      "Sophia Gold",
      "Thomas Silver",
      "Uma Bronze",
      "Victor Copper",
    ],
  },
  {
    name: "Technical",
    members: [
      "William Code",
      "Xander Debug",
      "Yara Build",
      "Zane Compile",
      "Amy Syntax",
      "Ben Logic",
      "Cindy Stack",
      "Derek Function",
    ],
  },
  {
    name: "Multimedia",
    members: [
      "Eva Render",
      "Finn Edit",
      "Grace Motion",
      "Henry Frame",
      "Isla Clip",
      "Jackie Sound",
      "Kyle Light",
      "Lena Cut",
    ],
  },
  {
    name: "PR & Outreach",
    members: [
      "Mike Network",
      "Nina Buzz",
      "Oscar Hype",
      "Paul Reach",
      "Quincy Brand",
      "Rachel Media",
      "Sam Connect",
      "Tina Influence",
    ],
  },
  {
    name: "Content",
    members: [
      "Uma Write",
      "Victor Edit",
      "Wendy Proof",
      "Xavier Blog",
      "Yasmine Story",
      "Zack Publish",
      "Amber Copy",
      "Brian Draft",
    ],
  },
  {
    name: "Social Media",
    members: [
      "Chris Tweet",
      "Diana Post",
      "Ethan Share",
      "Fiona Tag",
      "Gavin Viral",
      "Holly Engage",
      "Ian Trend",
      "Jasmine Boost",
    ],
  },
];

export default function TeamShowcase() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
    }, 3000); // Change team every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTeam = teams[currentTeamIndex];

  return (
    <div className="team-container">
      <div className="notch"></div>
      <h2 className="team-name">{currentTeam.name}</h2>
      <ul className="team-members">
        {currentTeam.members.map((member, index) => (
          <li key={index} className="member">
            {member}
          </li>
        ))}
      </ul>
    </div>
  );
}
<style jsx>{`

.team-container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background: #1e1e1e;
  color: #fff;
  text-align: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
}

.notch {
  width: 100px;
  height: 10px;
  background: #ea8eea;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px 10px 0 0;
}

.team-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.team-members {
  list-style: none;
  padding: 0;
}

.member {
  font-size: 16px;
  margin: 5px 0;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

`}</style>
    </div>
  );
};

export default teams;