import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useTheme } from "../../context/ThemeContext";

// Define types for team members and teams
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
}

const Teams: NextPage = () => {
  const { theme } = useTheme();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeTeam, setActiveTeam] = useState(0);
  const teamRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set page as loaded after components are mounted
    requestAnimationFrame(() => {
      setIsPageLoaded(true);
    });

    // Basic document setup
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  // Advanced animations for team sections when they come into view
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const teamSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setActiveTeam(index);
          entry.target.classList.add('in-view');
          
          // Animate member cards sequentially
          const memberCards = entry.target.querySelectorAll('.member-card');
          memberCards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add('animate-in');
            }, i * 100);
          });
        }
      });
    }, observerOptions);

    // Observe each team section
    document.querySelectorAll('.team-section').forEach((section, index) => {
      section.setAttribute('data-index', index.toString());
      teamSectionObserver.observe(section);
    });

    return () => {
      teamSectionObserver.disconnect();
    };
  }, [isPageLoaded]);

  // Improve TypeScript for the mouse move effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    const memberCards = document.querySelectorAll('.member-card');
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      
      // Update the position of the shine effect
      const shine = card.querySelector('.card-shine') as HTMLElement | null;
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, transparent 80%)`;
      }
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      
      const shine = card.querySelector('.card-shine') as HTMLElement | null;
      if (shine) {
        shine.style.background = 'transparent';
      }
    };

    memberCards.forEach(card => {
      // Add shine element to each card
      const shine = document.createElement('div');
      shine.classList.add('card-shine');
      card.appendChild(shine);
      
      card.addEventListener('mousemove', handleMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      memberCards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, [isPageLoaded]);

  // Mock data for teams - replace with real data
  const teams: Team[] = [
    {
      id: 1,
      name: "Office Bearers",
      description: "The leadership team that guides our organization's vision and direction",
      members: [
        { name: "Team Member 1", role: "Team Lead", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 2", role: "Deputy Lead", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 3", role: "Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 4", role: "Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 5", role: "Organizer", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 6", role: "Organizer", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 7", role: "Organizer", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 8", role: "Organizer", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 9", role: "Organizer", image: "/assets/member-placeholder.svg" },
        { name: "Team Member 10", role: "Organizer", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 2,
      name: "Tech Team",
      description: "Managing all technical aspects and digital infrastructure",
      members: [
        { name: "Tech Member 1", role: "Tech Lead", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 2", role: "Deputy Tech Lead", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 3", role: "Developer", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 4", role: "Developer", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 5", role: "Designer", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 6", role: "Designer", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 7", role: "System Admin", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 8", role: "System Admin", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 9", role: "QA Engineer", image: "/assets/member-placeholder.svg" },
        { name: "Tech Member 10", role: "QA Engineer", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 3,
      name: "Design Team",
      description: "Handling design, branding, and creative aspects",
      members: [
        { name: "Creative Member 1", role: "Creative Lead", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 2", role: "Deputy Creative Lead", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 3", role: "Graphic Designer", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 4", role: "Graphic Designer", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 5", role: "Content Creator", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 6", role: "Content Creator", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 7", role: "Video Editor", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 8", role: "Video Editor", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 9", role: "Animator", image: "/assets/member-placeholder.svg" },
        { name: "Creative Member 10", role: "Animator", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 4,
      name: "Management",
      description: "Overseeing organization, planning, and operational details",
      members: [
        { name: "Management Member 1", role: "Management Lead", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 2", role: "Deputy Management Lead", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 3", role: "Project Manager", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 4", role: "Project Manager", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 5", role: "Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 6", role: "Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 7", role: "Operations", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 8", role: "Operations", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 9", role: "Logistics", image: "/assets/member-placeholder.svg" },
        { name: "Management Member 10", role: "Logistics", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 5,
      name: "Multimedia",
      description: "Creating and managing photos, videos, and visual content",
      members: [
        { name: "Multimedia Member 1", role: "Multimedia Lead", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 2", role: "Deputy Multimedia Lead", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 3", role: "Videographer", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 4", role: "Videographer", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 5", role: "Photographer", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 6", role: "Photographer", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 7", role: "Editor", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 8", role: "Editor", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 9", role: "Sound Engineer", image: "/assets/member-placeholder.svg" },
        { name: "Multimedia Member 10", role: "Sound Engineer", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 6,
      name: "Content",
      description: "Creating engaging content for all platforms and communications",
      members: [
        { name: "Content Member 1", role: "Content Lead", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 2", role: "Deputy Content Lead", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 3", role: "Writer", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 4", role: "Writer", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 5", role: "Editor", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 6", role: "Editor", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 7", role: "Copywriter", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 8", role: "Copywriter", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 9", role: "Content Strategist", image: "/assets/member-placeholder.svg" },
        { name: "Content Member 10", role: "Content Strategist", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 7,
      name: "Social Media",
      description: "Managing our presence across various social platforms",
      members: [
        { name: "Social Member 1", role: "Social Media Lead", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 2", role: "Deputy Social Media Lead", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 3", role: "Community Manager", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 4", role: "Community Manager", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 5", role: "Content Creator", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 6", role: "Content Creator", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 7", role: "Analytics", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 8", role: "Analytics", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 9", role: "Platform Specialist", image: "/assets/member-placeholder.svg" },
        { name: "Social Member 10", role: "Platform Specialist", image: "/assets/member-placeholder.svg" },
      ]
    },
    {
      id: 8,
      name: "PR Outreach",
      description: "Building relationships and managing external communications",
      members: [
        { name: "PR Member 1", role: "PR Lead", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 2", role: "Deputy PR Lead", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 3", role: "Media Relations", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 4", role: "Media Relations", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 5", role: "Communications", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 6", role: "Communications", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 7", role: "Outreach Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 8", role: "Outreach Coordinator", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 9", role: "Partnerships", image: "/assets/member-placeholder.svg" },
        { name: "PR Member 10", role: "Partnerships", image: "/assets/member-placeholder.svg" },
      ]
    }
  ];

  const scrollToTeam = (index: number) => {
    setActiveTeam(index);
    teamRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={`container ${isPageLoaded ? "page-loaded" : "page-loading"}`}>
      <Head>
        <title>Triverse Teams</title>
        <meta name="description" content="Meet the amazing teams behind Triverse" />
        <link rel="icon" href="/assets/triangle-logo.svg" type="image/svg+xml" />
      </Head>

      <div className="background-layer">
        <div className="img-background">
          <img
            src="/assets/website.png"
            alt="Triverse Background"
            className="background-img"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="background-overlay"></div>
      </div>

      <Navbar />

      <main className="main">
        <section className="teams-hero">
          <div className="hero-content">
            <h1 className="hero-title">Our Teams</h1>
            <div className="title-underline"></div>
            <p className="hero-description">
              Meet the passionate individuals who make Triverse possible. Our dedicated teams work tirelessly to create an unforgettable experience.
            </p>
          </div>
          <div className="floating-particles">
            <div className="particle p1"></div>
            <div className="particle p2"></div>
            <div className="particle p3"></div>
            <div className="particle p4"></div>
            <div className="particle p5"></div>
          </div>
        </section>

        <section className="teams-navigation">
          <div className="nav-container">
            <button
              className={`team-nav-btn ${activeTeam === 0 ? 'active' : ''}`}
              onClick={() => scrollToTeam(0)}
            >
              Office Bearers
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 1 ? 'active' : ''}`}
              onClick={() => scrollToTeam(1)}
            >
              Tech Team
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 2 ? 'active' : ''}`}
              onClick={() => scrollToTeam(2)}
            >
              Design Team
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 3 ? 'active' : ''}`}
              onClick={() => scrollToTeam(3)}
            >
              Management
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 4 ? 'active' : ''}`}
              onClick={() => scrollToTeam(4)}
            >
              Multimedia
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 5 ? 'active' : ''}`}
              onClick={() => scrollToTeam(5)}
            >
              Content
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 6 ? 'active' : ''}`}
              onClick={() => scrollToTeam(6)}
            >
              Social Media
            </button>
            <button
              className={`team-nav-btn ${activeTeam === 7 ? 'active' : ''}`}
              onClick={() => scrollToTeam(7)}
            >
              PR Outreach
            </button>
          </div>
        </section>

        <section className="teams-showcase">
          {teams.map((team, index) => (
            <div 
              key={team.id} 
              className={`team-section ${activeTeam === index ? 'active' : ''}`}
              ref={(el) => { teamRefs.current[index] = el; }}
            >
              <div className="team-header">
                <h2 className="team-name">{team.name}</h2>
                <p className="team-description">{team.description}</p>
              </div>
              
              <div className="team-members">
                {team.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex} 
                    className="member-card"
                    style={{ animationDelay: `${memberIndex * 0.1}s` }}
                  >
                    <div className="member-photo-container">
                      <div className="member-photo">
                        <img src={member.image} alt={member.name} />
                        <div className="photo-glow"></div>
                      </div>
                    </div>
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    
                    <div className="card-background"></div>
                    <div className="sparkles">
                      <div className="sparkle s1"></div>
                      <div className="sparkle s2"></div>
                      <div className="sparkle s3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          min-height: 100vh;
          width: 100vw;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          font-family: "Roboto", sans-serif;
          background: transparent;
          color: #ffffff;
          position: relative;
          overflow-x: hidden;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        .main {
          flex: 1;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        .teams-hero {
          text-align: center;
          padding: 0rem 1rem 1.5rem;
          position: relative;
          margin-bottom: 2rem;
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-family: "Playfair Display", serif;
          font-size: 4.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(180deg, #ffffff, #e0c5e3);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          z-index: 3;
          letter-spacing: 1px;
        }

        .title-underline {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #ea8eea, #925da1);
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 3;
        }

        .hero-description {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          position: relative;
          z-index: 3;
        }

        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.4;
          filter: blur(8px);
          z-index: 1;
        }

        .p1 {
          width: 80px;
          height: 80px;
          background: rgba(234, 142, 234, 0.2);
          top: 10%;
          left: 5%;
          animation: float-slow 15s ease-in-out infinite alternate;
        }

        .p2 {
          width: 120px;
          height: 120px;
          background: rgba(212, 196, 153, 0.15);
          top: 70%;
          right: 8%;
          animation: float-slow 18s ease-in-out infinite alternate-reverse;
        }

        .p3 {
          width: 150px;
          height: 150px;
          background: rgba(146, 93, 161, 0.12);
          bottom: 15%;
          left: 10%;
          animation: float-slow 20s ease-in-out infinite alternate;
        }

        .p4 {
          width: 60px;
          height: 60px;
          background: rgba(162, 126, 195, 0.15);
          top: 30%;
          right: 15%;
          animation: float-slow 12s ease-in-out infinite alternate-reverse;
        }

        .p5 {
          width: 40px;
          height: 40px;
          background: rgba(212, 196, 153, 0.18);
          top: 60%;
          left: 40%;
          animation: float-slow 17s ease-in-out infinite alternate;
        }

        @keyframes float-slow {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(30px) translateX(20px) scale(1.1);
          }
          100% {
            transform: translateY(-30px) translateX(-20px) scale(1);
          }
        }

        .teams-navigation {
          position: sticky;
          top: 70px;
          width: 100%;
          background: rgba(40, 15, 60, 0.75);
          backdrop-filter: blur(10px);
          padding: 0.8rem 0;
          z-index: 10;
          margin-top: 1.5rem;
          margin-bottom: 2rem;
          border-radius: 12px;
          border: 1px solid rgba(146, 93, 161, 0.2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .nav-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          padding: 0.5rem 1rem;
          gap: 1rem;
          scrollbar-width: thin;
          scrollbar-color: #ea8eea rgba(60, 20, 80, 0.5);
          justify-content: center;
        }

        .nav-container::-webkit-scrollbar {
          height: 8px;
        }

        .nav-container::-webkit-scrollbar-track {
          background: rgba(60, 20, 80, 0.5);
          border-radius: 10px;
        }

        .nav-container::-webkit-scrollbar-thumb {
          background-color: #ea8eea;
          border-radius: 10px;
        }

        .team-nav-btn {
          flex: 0 0 auto;
          padding: 0.8rem 1.5rem;
          background: rgba(146, 93, 161, 0.2);
          border: 1px solid rgba(146, 93, 161, 0.3);
          border-radius: 50px;
          color: #ffffff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .team-nav-btn:hover {
          background: rgba(234, 142, 234, 0.3);
          transform: translateY(-2px);
        }

        .team-nav-btn.active {
          background: rgba(234, 142, 234, 0.4);
          border-color: rgba(234, 142, 234, 0.6);
          box-shadow: 0 0 15px rgba(234, 142, 234, 0.3);
        }

        .teams-showcase {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          padding-bottom: 3rem;
        }

        .team-section {
          padding: 2.5rem 2rem;
          background: rgba(40, 15, 60, 0.75);
          border-radius: 24px;
          border: 1px solid rgba(146, 93, 161, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          scroll-margin-top: 120px;
          opacity: 0.7;
          transform: translateY(20px);
          position: relative;
          overflow: hidden;
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(146, 93, 161, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.8s ease;
        }

        .team-section.in-view::before {
          transform: translateX(100%);
        }

        .team-section.active {
          opacity: 1;
          transform: translateY(0);
          border-color: rgba(234, 142, 234, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(146, 93, 161, 0.2);
        }

        .team-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .team-name {
          font-family: "Playfair Display", serif;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
          position: relative;
          display: inline-block;
        }

        .team-name::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, #ea8eea, #925da1);
          border-radius: 3px;
        }

        .team-description {
          max-width: 700px;
          margin: 1.5rem auto 0;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .team-members {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          justify-items: center;
        }

        .member-card {
          background: rgba(60, 20, 80, 0.4);
          border-radius: 16px;
          border: 1px solid rgba(146, 93, 161, 0.2);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: transform;
          width: 100%;
          max-width: 220px;
        }

        .member-card.animate-in {
          animation: cardEntrance 0.6s forwards cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .card-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(80, 30, 100, 0.1), rgba(60, 20, 80, 0.4));
          z-index: -1;
          transform: translateZ(-10px);
          border-radius: 16px;
        }

        .card-shine {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 16px;
          pointer-events: none;
          z-index: 1;
        }

        .member-photo-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin-bottom: 1.5rem;
          z-index: 2;
        }

        .member-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .sparkle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 10px rgba(234, 142, 234, 0.8);
          opacity: 0;
          transform: translateZ(0);
        }

        .member-card:hover .sparkle {
          animation: sparkleAnimation 1.5s ease-in-out infinite;
        }

        .s1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .s2 {
          top: 20%;
          right: 15%;
          animation-delay: 0.3s;
        }

        .s3 {
          bottom: 15%;
          right: 10%;
          animation-delay: 0.6s;
        }

        @keyframes sparkleAnimation {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .member-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(234, 142, 234, 0.3);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: translateZ(10px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .member-card:hover .member-photo {
          border-color: rgba(234, 142, 234, 0.8);
          transform: translateZ(15px);
          box-shadow: 0 10px 25px rgba(234, 142, 234, 0.5);
        }

        .member-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          width: calc(100% + 20px);
          height: calc(100% + 20px);
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(234, 142, 234, 0.4), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
          filter: blur(10px);
        }

        .member-card:hover .member-glow {
          opacity: 1;
          animation: glowPulse 2s infinite alternate;
        }

        @keyframes glowPulse {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .member-info {
          text-align: center;
          margin-bottom: 1.2rem;
          transform: translateZ(5px);
          z-index: 2;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0.5rem 0 0.5rem;
          color: #ffffff;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          z-index: 2;
          position: relative;
          transform: translateZ(5px);
          transition: all 0.3s ease;
        }

        .member-name::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ea8eea, #925da1);
          transition: width 0.3s ease;
        }

        .member-card:hover .member-name::after {
          width: 80%;
        }

        .member-role {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 1.5rem;
          font-weight: 400;
          z-index: 2;
          position: relative;
          transform: translateZ(5px);
          transition: all 0.3s ease;
        }

        .member-card:hover .member-role {
          color: #ea8eea;
        }

        .member-social {
          display: none;
        }

        .social-icon {
          display: none;
        }

        @media (max-width: 1024px) {
          .team-members {
            grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
            gap: 1.5rem;
          }

          .member-photo-container {
            width: 100px;
            height: 100px;
          }
          
          .team-nav-btn {
            padding: 0.7rem 1.3rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .main {
            padding: 30px 1rem 3rem;
          }
          
          .teams-hero {
            padding: 0rem 1rem 1rem;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
          
          .team-members {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1.2rem;
          }
          
          .member-card {
            transform: none !important;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
            padding: 1.2rem 1rem;
            max-width: 180px;
          }
          
          .member-card:hover {
            transform: translateY(-5px) !important;
          }
          
          .background-img {
            animation: none; /* Disable animation on mobile for better performance */
          }
          
          .team-section {
            padding: 2rem 1.5rem;
          }
          
          .team-header {
            margin-bottom: 2rem;
          }
          
          .team-name {
            font-size: 2.2rem;
          }
          
          .nav-container {
            justify-content: flex-start; /* On mobile, align to start for better scrolling */
          }
        }

        @media (max-width: 480px) {
          .main {
            padding: 20px 1rem 3rem;
          }
          
          .teams-hero {
            padding: 0rem 1rem 1rem;
          }
          
          .hero-title {
            font-size: 2.8rem;
          }
          
          .team-members {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .member-card {
            padding: 1rem 0.8rem;
            max-width: 150px;
          }
          
          .member-photo-container {
            width: 80px;
            height: 80px;
            margin-bottom: 1rem;
          }
          
          .team-section {
            padding: 1.5rem 1rem;
          }
          
          .teams-navigation {
            padding: 0.5rem 0;
          }
          
          .team-nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
          
          .member-name {
            font-size: 0.9rem;
          }
          
          .member-role {
            font-size: 0.8rem;
          }
          
          .team-name {
            font-size: 1.8rem;
          }
          
          .team-description {
            font-size: 0.95rem;
          }
        }

        // Add prefers-reduced-motion media query
        @media (prefers-reduced-motion: reduce) {
          .background-img,
          .member-card,
          .member-photo,
          .particle,
          .card-shine {
            animation: none !important;
            transition: none !important;
          }
          
          .member-card:hover {
            transform: translateY(-5px) !important;
          }
          
          .member-card:hover .member-photo {
            transform: none !important;
          }
        }

        .page-loading {
          opacity: 0;
        }

        .page-loaded {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }

        .background-layer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          overflow: hidden;
        }

        .img-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .background-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: subtle-zoom 60s infinite alternate ease-in-out;
          will-change: transform;
          transform: translateZ(0); /* Force hardware acceleration */
        }

        @keyframes subtle-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(212, 196, 153, 0.7) 0%,
            rgba(146, 93, 161, 0.8) 30%,
            rgba(60, 20, 80, 0.9) 60%,
            rgba(10, 10, 20, 1) 100%
          );
          background-blend-mode: overlay;
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default Teams; 