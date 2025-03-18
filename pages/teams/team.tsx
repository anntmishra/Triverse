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
  const [transitioning, setTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const currentTeam = teams[currentTeamIndex];

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleTeamChange = (newIndex) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentTeamIndex(newIndex);
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  const handlePrevClick = () => {
    const newIndex = (currentTeamIndex - 1 + teams.length) % teams.length;
    handleTeamChange(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentTeamIndex + 1) % teams.length;
    handleTeamChange(newIndex);
  };

  const renderTeamMembers = (members, headsCount) => {
    const heads = members.slice(0, headsCount);
    const teamMembers = members.slice(headsCount);

    // Calculate optimal columns based on member count for balanced layout
    const memberCount = teamMembers.length;
    let columnsCount = 4; // Default

    // Layout optimization for different head counts
    if (headsCount === 2) {
      // Refined layout logic for 2 heads teams
      if (memberCount <= 3) columnsCount = memberCount;
      else if (memberCount === 4)
        columnsCount = 4; // 4 columns for 4 members (single row)
      else if (memberCount === 5)
        columnsCount = 5; // 5 columns for 5 members (single row)
      else if (memberCount === 6)
        columnsCount = 3; // 3 columns for 6 members (2 rows of 3)
      else columnsCount = 4; // Default to 4 columns for other counts
    } else if (headsCount === 3) {
      // New specialized logic for 3 heads
      if (memberCount <= 3) columnsCount = memberCount;
      else if (memberCount === 5) columnsCount = 5;
      else if (memberCount === 4 || memberCount === 6) columnsCount = 3;
      else if (memberCount % 3 === 0) columnsCount = 3;
      else columnsCount = Math.min(3, memberCount);
    }

    // Calculate head grid styles with refined positioning for 2 heads
    const headsGridStyle = {
      ...styles.headsGrid,
      gridTemplateColumns: `repeat(${headsCount}, 1fr)`,
      maxWidth: headsCount === 2 ? "500px" : "900px", // Narrower for 2 heads
      margin: "40px auto 20px",
      gap: headsCount === 2 ? "50px" : "30px", // Adjusted spacing for 2 heads
    };

    return (
      <>
        <div
          style={headsGridStyle}
          className={`${transitioning ? "fade-out" : "fade-in"} ${
            headsCount === 2 ? "two-heads-grid" : ""
          }`}
        >
          {heads.map((member, index) => (
            <div key={index} style={styles.headCard} className="head-card">
              <div style={styles.headImageContainer}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={styles.memberImage}
                />
              </div>
              <p style={styles.headName}>{member.name}</p>
              <span style={styles.headBadge}>Head</span>
            </div>
          ))}
        </div>

        {/* Only render team members section if there are any */}
        {teamMembers.length > 0 && (
          <div
            style={{
              ...styles.teamGrid,
              gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
              maxWidth:
                headsCount === 2
                  ? columnsCount <= 3
                    ? `${columnsCount * 220}px`
                    : "900px"
                  : columnsCount <= 3
                  ? `${columnsCount * 220}px`
                  : "100%",
              margin: "30px auto 0",
            }}
            className={`${transitioning ? "fade-out" : "fade-in"} ${
              headsCount === 2 ? "two-heads-members" : ""
            }`}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={styles.memberCard}
                className="member-card"
              >
                <div style={styles.imageContainer}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={styles.memberImage}
                  />
                </div>
                <p style={styles.memberName}>{member.name}</p>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div style={styles.pageContainer}>
      {/* Enhanced background elements */}
      <div className="background-elements">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
        <div className="gradient-orb orb4"></div>
        <div className="dots-pattern"></div>
        <div className="light-streaks"></div>
      </div>

      <div className="section-title-container">
        <h1 className="section-title">Our Teams</h1>
        <div className="title-underline">
          <span className="title-gem"></span>
        </div>
        <p className="section-subtitle">
          Meet the talented individuals behind Triverse
        </p>
      </div>

      <div
        style={{
          ...styles.teamContainer,
          transform: `translate(${(mousePosition.x - 0.5) * -5}px, ${
            (mousePosition.y - 0.5) * -5
          }px)`,
        }}
        className="team-card-container"
      >
        <div style={styles.notchContainer}>
          <div style={styles.notch} className="floating-notch">
            <button
              onClick={handlePrevClick}
              style={styles.navButton}
              className="nav-button"
            >
              <span>{"❮"}</span>
            </button>
            <h2
              style={styles.teamName}
              className={transitioning ? "fade-out" : "fade-in"}
            >
              {currentTeam.name}
            </h2>
            <button
              onClick={handleNextClick}
              style={styles.navButton}
              className="nav-button"
            >
              <span>{"❯"}</span>
            </button>
          </div>
        </div>

        {/* Teams rendering - existing code */}
        {currentTeam.name === "Office Bearers" &&
          renderTeamMembers(currentTeam.members, 3)}
        {currentTeam.name === "Design" &&
          renderTeamMembers(currentTeam.members, 3)}
        {currentTeam.name === "Content" &&
          renderTeamMembers(currentTeam.members, 2)}
        {currentTeam.name === "Multimedia" &&
          renderTeamMembers(currentTeam.members, 3)}
        {currentTeam.name === "PR & Outreach" &&
          renderTeamMembers(currentTeam.members, 2)}
        {currentTeam.name === "Social Media" &&
          renderTeamMembers(currentTeam.members, 2)}
        {currentTeam.name === "Technical" &&
          renderTeamMembers(currentTeam.members, 2)}
        {currentTeam.name === "Management" &&
          renderTeamMembers(currentTeam.members, 2)}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glowing {
          0% {
            box-shadow: 0 0 5px rgba(234, 142, 234, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(234, 142, 234, 0.8);
          }
          100% {
            box-shadow: 0 0 5px rgba(234, 142, 234, 0.5);
          }
        }

        @keyframes floatingOrb {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
        }

        @keyframes rotateSlowly {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulseNotch {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -500px 0;
          }
          100% {
            background-position: 500px 0;
          }
        }

        @keyframes floatStreaks {
          0% {
            transform: rotate(45deg) translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: rotate(45deg) translateY(-30px);
            opacity: 0.4;
          }
          100% {
            transform: rotate(45deg) translateY(0);
            opacity: 0.2;
          }
        }

        .fade-in {
          opacity: 1;
          transition: opacity 0.3s ease-in;
        }

        .fade-out {
          opacity: 0;
          transition: opacity 0.3s ease-out;
        }

        .nav-button:hover span {
          transform: scale(1.3);
          display: inline-block;
          text-shadow: 0 0 10px rgba(234, 142, 234, 0.8);
        }

        .head-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
        }

        .head-card:hover img {
          transform: scale(1.1);
        }

        .member-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .member-card:hover img {
          transform: scale(1.08);
        }

        .background-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
        }

        .orb1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(234, 142, 234, 0.2) 0%,
            rgba(146, 93, 161, 0.1) 50%,
            rgba(0, 0, 0, 0) 80%
          );
          top: 10%;
          left: 15%;
          animation: floatingOrb 20s ease-in-out infinite;
        }

        .orb2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle,
            rgba(76, 29, 149, 0.15) 0%,
            rgba(88, 28, 135, 0.1) 50%,
            rgba(0, 0, 0, 0) 80%
          );
          bottom: 15%;
          right: 10%;
          animation: floatingOrb 16s ease-in-out infinite;
          animation-delay: -5s;
        }

        .orb3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(
            circle,
            rgba(30, 58, 138, 0.1) 0%,
            rgba(37, 99, 235, 0.05) 50%,
            rgba(0, 0, 0, 0) 80%
          );
          top: 40%;
          right: 30%;
          animation: floatingOrb 18s ease-in-out infinite;
          animation-delay: -8s;
        }

        .orb4 {
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(157, 23, 77, 0.07) 0%,
            rgba(131, 24, 67, 0.04) 50%,
            rgba(0, 0, 0, 0) 80%
          );
          top: 60%;
          left: 25%;
          animation: floatingOrb 22s ease-in-out infinite;
          animation-delay: -12s;
        }

        .dots-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.15) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
          opacity: 0.3;
        }

        .light-streaks {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 50%,
            transparent 100%
          );
          background-size: 200% 200%;
          animation: floatStreaks 15s ease-in-out infinite;
          opacity: 0.3;
        }

        .section-title-container {
          text-align: center;
          margin-bottom: 40px;
          position: relative;
        }

        .section-title {
          font-family: "Playfair Display", serif;
          font-size: 2.5rem;
          background: linear-gradient(to right, #e9d5ff, #ffffff, #ea8eea);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 15px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .title-underline {
          width: 120px;
          height: 2px;
          background: linear-gradient(
            to right,
            rgba(234, 142, 234, 0),
            rgba(234, 142, 234, 0.8),
            rgba(234, 142, 234, 0)
          );
          margin: 0 auto;
          position: relative;
        }

        .title-gem {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ea8eea;
          transform: rotate(45deg);
          top: -4px;
          left: 55px;
          box-shadow: 0 0 8px #ea8eea;
          animation: glowing 3s infinite alternate;
        }

        .floating-notch {
          animation: pulseNotch 3s ease-in-out infinite;
        }

        .team-card-container {
          transition: transform 0.1s ease-out;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .orb1,
          .orb2,
          .orb3,
          .orb4 {
            opacity: 0.5;
            width: 200px;
            height: 200px;
          }

          .section-title {
            font-size: 2rem;
          }

          .dots-pattern {
            background-size: 20px 20px;
          }

          .two-heads-grid {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    padding: "80px 20px",
    position: "relative",
    overflow: "hidden",
  },
  teamContainer: {
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    borderRadius: "20px",
    background:
      "linear-gradient(145deg, rgba(30, 30, 46, 0.85), rgba(36, 36, 50, 0.9))",
    color: "#fff",
    textAlign: "center",
    boxShadow:
      "0px 8px 30px rgba(0, 0, 0, 0.3), 0px 0px 1px rgba(255, 255, 255, 0.1)",
    position: "relative",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "all 0.3s ease",
  },
  notchContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "-25px",
    left: 0,
  },
  notch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "300px",
    height: "50px",
    background:
      "linear-gradient(145deg, rgba(36, 36, 50, 0.9), rgba(30, 30, 46, 0.95))",
    borderRadius: "25px",
    boxShadow:
      "0 4px 15px rgba(234, 142, 234, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.05)",
    padding: "0 15px",
    border: "1px solid rgba(234, 142, 234, 0.2)",
    animation: "glowing 3s infinite alternate",
    backdropFilter: "blur(10px)",
  },
  headsGrid: {
    display: "grid",
    gap: "30px",
    padding: "0 20px",
    justifyItems: "center", // Ensure heads are centered in their columns
  },
  teamGrid: {
    display: "grid",
    gap: "25px",
    padding: "20px",
    marginTop: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "30px",
    justifyItems: "center",
  },
  memberCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.03)",
    borderRadius: "15px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  headCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 15px",
    background: "rgba(234, 142, 234, 0.05)",
    borderRadius: "15px",
    transition: "all 0.4s ease",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    position: "relative",
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "15px",
    border: "3px solid rgba(234, 142, 234, 0.2)",
    transition: "all 0.3s ease",
  },
  headImageContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    marginBottom: "15px",
    border: "4px solid rgba(234, 142, 234, 0.4)",
    boxShadow: "0 0 15px rgba(234, 142, 234, 0.3)",
    transition: "all 0.3s ease",
  },
  memberImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  memberName: {
    fontSize: "16px",
    fontWeight: "500",
    margin: "0",
    color: "#ffffff",
  },
  headName: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0",
    marginBottom: "8px",
    color: "#ffffff",
  },
  headBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "linear-gradient(135deg, #ea8eea, #c76ec7)",
    color: "white",
    padding: "3px 8px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  },
  navButton: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "5px 10px",
    transition: "all 0.2s ease",
    textShadow: "0 0 5px rgba(234, 142, 234, 0.3)",
  },
  teamName: {
    fontSize: "22px",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "0",
    letterSpacing: "2px",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(135deg, #ffffff, #e9d5ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};
