import { useState, useEffect } from "react";

const teams = [
  {
    name: "Office Bearers",
    members: [
      { name: "John Doe", image: "/images/john_doe.jpg" },
      { name: "Jane Smith", image: "/images/jane_smith.jpg" },
      { name: "Alice Brown", image: "/images/alice_brown.jpg" },
      { name: "Bob White", image: "/images/bob_white.jpg" },
      { name: "Charlie Green", image: "/images/charlie_green.jpg" },
      { name: "David Black", image: "/images/david_black.jpg" },
      { name: "Emily Red", image: "/images/emily_red.jpg" },
      { name: "Frank Blue", image: "/images/frank_blue.jpg" },
    ],
  },
  {
    name: "Management",
    members: [
      { name: "George Yellow", image: "/images/george_yellow.jpg" },
      { name: "Hannah Grey", image: "/images/hannah_grey.jpg" },
      { name: "Ivy Purple", image: "/images/ivy_purple.jpg" },
      { name: "Jack Orange", image: "/images/jack_orange.jpg" },
      { name: "Kelly Cyan", image: "/images/kelly_cyan.jpg" },
      { name: "Liam Magenta", image: "/images/liam_magenta.jpg" },
      { name: "Mia Lime", image: "/images/mia_lime.jpg" },
      { name: "Nathan Teal", image: "/images/nathan_teal.jpg" },
    ],
  },
  {
    name: "Design",
    members: [
      { name: "Oliver Sky", image: "/images/oliver_sky.jpg" },
      { name: "Paula Pink", image: "/images/paula_pink.jpg" },
      { name: "Quinn Indigo", image: "/images/quinn_indigo.jpg" },
      { name: "Ryan Violet", image: "/images/ryan_violet.jpg" },
      { name: "Sophia Gold", image: "/images/sophia_gold.jpg" },
      { name: "Thomas Silver", image: "/images/thomas_silver.jpg" },
      { name: "Uma Bronze", image: "/images/uma_bronze.jpg" },
      { name: "Victor Copper", image: "/images/victor_copper.jpg" },
    ],
  },
  {
    name: "Technical",
    members: [
      { name: "William Code", image: "/images/william_code.jpg" },
      { name: "Xander Debug", image: "/images/xander_debug.jpg" },
      { name: "Yara Build", image: "/images/yara_build.jpg" },
      { name: "Zane Compile", image: "/images/zane_compile.jpg" },
      { name: "Amy Syntax", image: "/images/amy_syntax.jpg" },
      { name: "Ben Logic", image: "/images/ben_logic.jpg" },
      { name: "Cindy Stack", image: "/images/cindy_stack.jpg" },
      { name: "Derek Function", image: "/images/derek_function.jpg" },
    ],
  },
  {
    name: "Multimedia",
    members: [
      { name: "Eva Render", image: "/images/eva_render.jpg" },
      { name: "Finn Edit", image: "/images/finn_edit.jpg" },
      { name: "Grace Motion", image: "/images/grace_motion.jpg" },
      { name: "Henry Frame", image: "/images/henry_frame.jpg" },
      { name: "Isla Clip", image: "/images/isla_clip.jpg" },
      { name: "Jackie Sound", image: "/images/jackie_sound.jpg" },
      { name: "Kyle Light", image: "/images/kyle_light.jpg" },
      { name: "Lena Cut", image: "/images/lena_cut.jpg" },
    ],
  },
  {
    name: "PR & Outreach",
    members: [
      { name: "Mike Network", image: "/images/mike_network.jpg" },
      { name: "Nina Buzz", image: "/images/nina_buzz.jpg" },
      { name: "Oscar Hype", image: "/images/oscar_hype.jpg" },
      { name: "Paul Reach", image: "/images/paul_reach.jpg" },
      { name: "Quincy Brand", image: "/images/quincy_brand.jpg" },
      { name: "Rachel Media", image: "/images/rachel_media.jpg" },
      { name: "Sam Connect", image: "/images/sam_connect.jpg" },
      { name: "Tina Influence", image: "/images/tina_influence.jpg" },
    ],
  },
  {
    name: "Content",
    members: [
      { name: "Uma Write", image: "/images/uma_write.jpg" },
      { name: "Victor Edit", image: "/images/victor_edit.jpg" },
      { name: "Wendy Proof", image: "/images/wendy_proof.jpg" },
      { name: "Xavier Blog", image: "/images/xavier_blog.jpg" },
      { name: "Yasmine Story", image: "/images/yasmine_story.jpg" },
      { name: "Zack Publish", image: "/images/zack_publish.jpg" },
      { name: "Amber Copy", image: "/images/amber_copy.jpg" },
      { name: "Brian Draft", image: "/images/brian_draft.jpg" },
    ],
  },
  {
    name: "Social Media",
    members: [
      { name: "Chris Tweet", image: "/images/chris_tweet.jpg" },
      { name: "Diana Post", image: "/images/diana_post.jpg" },
      { name: "Ethan Share", image: "/images/ethan_share.jpg" },
      { name: "Fiona Tag", image: "/images/fiona_tag.jpg" },
      { name: "Gavin Viral", image: "/images/gavin_viral.jpg" },
      { name: "Holly Engage", image: "/images/holly_engage.jpg" },
      { name: "Ian Trend", image: "/images/ian_trend.jpg" },
      { name: "Jasmine Boost", image: "/images/jasmine_boost.jpg" },
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

  const handlePrevClick = () => {
    setCurrentTeamIndex(
      (prevIndex) => (prevIndex - 1 + teams.length) % teams.length
    );
  };

  const handleNextClick = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  return (
    <div className="team-container">
      <div className="notch">
        <button onClick={handlePrevClick} className="nav-button">
          {"<"}
        </button>
        <h2 className="team-name">{currentTeam.name}</h2>
        <button onClick={handleNextClick} className="nav-button">
          {">"}
        </button>
      </div>
      <ul className="team-members">
        {currentTeam.members.map((member, index) => (
          <li key={index} className="member">
            <img
              src={member.image}
              alt={member.name}
              className="member-image"
            />
            {member.name}
          </li>
        ))}
      </ul>
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
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 40px;
          background: #ea8eea;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 10px 10px 0 0;
        }

        .nav-button {
          background: none;
          border: none;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          margin: 0 10px;
        }

        .team-name {
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .team-members {
          list-style: none;
          padding: 0;
          margin-top: 30px;
        }

        .member {
          font-size: 16px;
          margin: 10px 0;
          opacity: 0;
          animation: fadeIn 1s forwards;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .member-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
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
}
