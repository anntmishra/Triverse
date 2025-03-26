import React, { useState, useEffect } from 'react';
import burger from './Burger_Singh-removebg-preview.png'
import waffle from './waffle-removebg-preview.png'
import interview from './interview-removebg-preview.png'

// Sponsor data directly in the file
const sponsorsData = [
  {
    id: '1',
    name: 'Skippi',
    logo: 'https://skippi.in/cdn/shop/files/skippi_font.png?v=1690357134',
    website: 'https://skippi.in',
    featured: true,
    color: '#ea8eea'
  },
  {
    id: '2', 
    name: 'KwikPic',
    logo: 'https://www.kwikpic.in/blog/wp-content/uploads/2022/10/Primary-Logo-e1667194420295-1024x266.png',
    website: 'https://www.kwikpic.in',
    featured: true,
    color: '#925da1'
  },
  {
    id: '3',
    name: 'Burger Singh',
    logo: burger.src,
    website: 'https://burgersingh.com',
    featured: true,
    color: '#ea8eea'
  },
  {
    id: '4',
    name: 'Waffle and Co.',
    logo: waffle.src,
    website: 'https://example.com',
    featured: true,
    color: '#925da1'
  },
  {
    id: '5',
    name: 'Interview Buddy',
    logo: interview.src,
    website: 'https://example.com',
    featured: true,
    color: '#d4c499'
  }
];

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  featured?: boolean;
  color?: string;
}

interface SponsorsComponentProps {
  sponsors?: Sponsor[];
}

const SponsorsComponent: React.FC<SponsorsComponentProps> = ({ 
  sponsors = sponsorsData 
}) => {
  const [hoveredSponsor, setHoveredSponsor] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Add animation to sponsors on mount and handle scroll visibility
  useEffect(() => {
    const sponsorElements = document.querySelectorAll('.sponsor-item');
    sponsorElements.forEach((element, index) => {
      setTimeout(() => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'translateY(0)';
      }, 150 * index);
    });
    
    setIsVisible(true);
    
    return () => {};
  }, []);

  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },
    body: {
      margin: 0,
      padding: 0,
    },
    html: {
      margin: 0,
      padding: 0,
    },
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      background: 'linear-gradient(135deg, rgba(60, 20, 80, 0.7), rgba(146, 93, 161, 0.5), rgba(234, 142, 234, 0.3))',
      zIndex: -1,
    },
    content: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      boxSizing: 'border-box',
    },
    titleContainer: {
      marginBottom: '4rem',
      textAlign: 'center',
      position: 'relative',
    },
    titleLine: {
      width: '120px',
      height: '4px',
      background: 'linear-gradient(90deg, #ea8eea, #925da1)',
      borderRadius: '2px',
      margin: '1rem auto 0',
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
      fontFamily: '"Playfair Display", serif',
      margin: 0,
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '1.5rem auto 0',
      fontFamily: '"Roboto", sans-serif',
      lineHeight: '1.6',
    },
    sponsorsContainer: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '3rem',
      marginBottom: '4rem',
    },
    midRow: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4rem',
      marginBottom: '4rem',
    },
    sponsorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'rgba(46, 16, 101, 0.15)',
      backdropFilter: 'blur(8px)',
      borderRadius: '16px',
      padding: '2rem 1.5rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(234, 142, 234, 0.2)',
      transition: 'all 0.4s ease-in-out',
      opacity: 0,
      transform: 'translateY(30px)',
      width: '100%',
      maxWidth: '320px',
      position: 'relative',
      overflow: 'hidden',
    },
    middleSponsorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'rgba(46, 16, 101, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(234, 142, 234, 0.25)',
      transition: 'all 0.4s ease-in-out',
      opacity: 0,
      transform: 'translateY(30px)',
      width: '100%',
      maxWidth: '340px',
      position: 'relative',
      overflow: 'hidden',
    },
    sponsorCardHovered: {
      transform: 'translateY(-10px) scale(1.03)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2), 0 0 15px rgba(234, 142, 234, 0.3)',
      background: 'rgba(46, 16, 101, 0.25)',
      border: '1px solid rgba(234, 142, 234, 0.4)',
    },
    logoContainer: {
      width: '100%',
      height: '150px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      marginBottom: '1.5rem',
      background: 'rgba(255, 255, 255, 0.07)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(234, 142, 234, 0.1)',
      transition: 'all 0.3s ease',
    },
    largeLogoContainer: {
      width: '100%',
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      marginBottom: '1.5rem',
      background: 'rgba(255, 255, 255, 0.07)',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      transition: 'all 0.3s ease',
    },
    logoContainerHovered: {
      background: 'rgba(255, 255, 255, 0.15)',
      boxShadow: '0 0 20px rgba(234, 142, 234, 0.2)',
      border: '1px solid rgba(234, 142, 234, 0.3)',
    },
    logo: {
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
      transition: 'all 0.3s ease',
    },
    logoHovered: {
      transform: 'scale(1.05)',
      filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2)) brightness(1.05)',
    },
    sponsorName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginTop: '1rem',
      marginBottom: '0.5rem',
      position: 'relative',
      display: 'inline-block',
      fontFamily: '"Playfair Display", serif',
    },
    middleSponsorName: {
      fontSize: '1.7rem',
      fontWeight: 'bold',
      color: 'white',
      marginTop: '1rem',
      marginBottom: '0.7rem',
      position: 'relative',
      display: 'inline-block',
      fontFamily: '"Playfair Display", serif',
    },
    featuredBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-40px',
      background: 'linear-gradient(90deg, #ea8eea, #925da1)',
      color: 'white',
      fontSize: '0.7rem',
      padding: '2px 8px',
      borderRadius: '4px',
      transform: 'rotate(3deg)',
    },
    websiteButton: {
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 'auto',
      padding: '0.6rem 1.2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      borderRadius: '30px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
      fontFamily: '"Roboto", sans-serif',
    },
    websiteButtonHovered: {
      background: 'linear-gradient(45deg, #ea8eea, #925da1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
    },
    middleButton: {
      display: 'inline-flex',
      alignItems: 'center',
      marginTop: 'auto',
      padding: '0.7rem 1.4rem',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      borderRadius: '30px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s ease',
      fontFamily: '"Roboto", sans-serif',
    },
    websiteButtonText: {
      marginRight: '6px',
    },
    arrowIcon: {
      transition: 'transform 0.3s ease',
    },
    arrowIconHovered: {
      transform: 'translateX(3px)',
    },
    stars: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
    },
    glowEffect: {
      position: 'absolute',
      width: '250px',
      height: '250px',
      borderRadius: '50%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.15,
      filter: 'blur(60px)',
      zIndex: 0,
    }
  };

  // Add global style to handle overflow and animations
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      body, html {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        font-family: "Roboto", sans-serif;
      }
      
      @media (max-width: 992px) {
        .main-row, .mid-row {
          gap: 2rem !important;
        }
      }
      
      @media (max-width: 768px) {
        .main-row, .mid-row {
          flex-direction: column;
          gap: 3rem !important;
        }
        
        .sponsor-title {
          font-size: 2.5rem !important;
        }
        
        .sponsor-subtitle {
          font-size: 1rem !important;
        }
      }
      
      @keyframes twinkling {
        0% { opacity: 0.3; }
        50% { opacity: 0.8; }
        100% { opacity: 0.3; }
      }
      
      .star {
        position: absolute;
        background-color: #ea8eea;
        border-radius: 50%;
        animation: twinkling ease infinite;
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      
      .sponsor-item {
        animation: float 6s ease-in-out infinite;
      }
      
      .sponsor-item:nth-child(1) {
        animation-delay: 0s;
      }
      
      .sponsor-item:nth-child(2) {
        animation-delay: 1s;
      }
      
      .sponsor-item:nth-child(3) {
        animation-delay: 2s;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0.6; }
      }
      
      .glow-effect {
        animation: pulse 5s ease-in-out infinite;
      }
      
      @keyframes shine {
        0% { left: -100%; top: -100%; }
        100% { left: 100%; top: 100%; }
      }
      
      .sponsor-card {
        position: relative;
        overflow: hidden;
      }
      
      .sponsor-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0) 40%,
          rgba(234, 142, 234, 0.2) 50%,
          rgba(255, 255, 255, 0) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(45deg);
        transition: all 0.3s;
        animation: shine 5s infinite;
        z-index: 1;
      }
      
      .middle-card::before {
        animation: shine 4s infinite;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: "Playfair Display", serif;
      }
    `;
    document.head.appendChild(styleTag);

    // Create stars
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2;
        
        star.className = 'star';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
      }
    }

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // Organize sponsors for specific positions
  const topSponsors = sponsors.slice(0, 3); // First 3 sponsors (Skippi, KwikPic, Burger Singh)
  const middleSponsors = sponsors.slice(3); // Last 2 sponsors (Waffle and Co., Interview Buddy)

  return (
    <div style={styles.container}>
      {/* Background Image */}
      <img
        src="/assets/website.png"
        alt="Triverse Background"
        style={styles.background}
        loading="eager"
        fetchPriority="high"
      />
      
      {/* Background overlay for better contrast */}
      <div style={styles.overlay}></div>
      
      {/* Stars effect */}
      <div id="stars-container" style={styles.stars}></div>
      
      {/* Content */}
      <div style={styles.content}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title} className="sponsor-title">
            Our Event Sponsors
          </h2>
          <div style={styles.titleLine}></div>
          <p style={styles.subtitle} className="sponsor-subtitle">
            We're grateful to our amazing partners who make Triverse possible. Together, we're creating an unforgettable experience.
          </p>
        </div>
        
        <div style={styles.sponsorsContainer}>
          {/* Top Row - First 3 sponsors */}
          <div className="main-row" style={styles.mainRow}>
            {topSponsors.map((sponsor) => (
              <div 
                key={sponsor.id}
                className="sponsor-item sponsor-card"
                style={{
                  ...styles.sponsorCard,
                  ...(hoveredSponsor === sponsor.id ? styles.sponsorCardHovered : {})
                }}
                onMouseEnter={() => setHoveredSponsor(sponsor.id)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                {/* Glowing effect */}
                <div 
                  className="glow-effect"
                  style={{
                    ...styles.glowEffect,
                    background: sponsor.color || 'rgba(121, 40, 202, 0.5)'
                  }}
                ></div>
                
                <div style={{
                  ...styles.logoContainer,
                  ...(hoveredSponsor === sponsor.id ? styles.logoContainerHovered : {})
                }}>
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`}
                    style={{
                      ...styles.logo,
                      ...(hoveredSponsor === sponsor.id ? styles.logoHovered : {})
                    }}
                  />
                </div>
                
                <h3 style={styles.sponsorName}>
                  {sponsor.name}
                  {sponsor.featured && (
                    <span style={styles.featuredBadge}>Featured</span>
                  )}
                </h3>
                
                {sponsor.website && (
                  <a 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...styles.websiteButton,
                      ...(hoveredSponsor === sponsor.id ? styles.websiteButtonHovered : {})
                    }}
                  >
                    <span style={styles.websiteButtonText}>Visit Website</span>
                    <svg 
                      style={{
                        ...styles.arrowIcon,
                        ...(hoveredSponsor === sponsor.id ? styles.arrowIconHovered : {})
                      }}
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
          
          {/* Middle Row - Last 2 sponsors (Waffle and Co., Interview Buddy) */}
          <div className="mid-row" style={styles.midRow}>
            {middleSponsors.map((sponsor) => (
              <div 
                key={sponsor.id}
                className="sponsor-item middle-card"
                style={{
                  ...styles.middleSponsorCard,
                  ...(hoveredSponsor === sponsor.id ? styles.sponsorCardHovered : {})
                }}
                onMouseEnter={() => setHoveredSponsor(sponsor.id)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                {/* Glowing effect */}
                <div 
                  className="glow-effect"
                  style={{
                    ...styles.glowEffect,
                    background: sponsor.color || 'rgba(121, 40, 202, 0.5)'
                  }}
                ></div>
                
                <div style={{
                  ...styles.largeLogoContainer,
                  ...(hoveredSponsor === sponsor.id ? styles.logoContainerHovered : {})
                }}>
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`}
                    style={{
                      ...styles.logo,
                      ...(hoveredSponsor === sponsor.id ? styles.logoHovered : {})
                    }}
                  />
                </div>
                
                <h3 style={styles.middleSponsorName}>
                  {sponsor.name}
                  {sponsor.featured && (
                    <span style={styles.featuredBadge}>Featured</span>
                  )}
                </h3>
                
                {sponsor.website && (
                  <a 
                    href={sponsor.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      ...styles.middleButton,
                      ...(hoveredSponsor === sponsor.id ? styles.websiteButtonHovered : {})
                    }}
                  >
                    <span style={styles.websiteButtonText}>Visit Website</span>
                    <svg 
                      style={{
                        ...styles.arrowIcon,
                        ...(hoveredSponsor === sponsor.id ? styles.arrowIconHovered : {})
                      }}
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsComponent;