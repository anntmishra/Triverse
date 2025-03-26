import React from 'react';
import burger from './Burger_Singh-removebg-preview.png'
import waffle from './waffle-removebg-preview.png'
import interview from './interview-removebg-preview.png'

// Sponsor data directly in the file
const sponsorsData = [
  {
    id: '1',
    name: 'Skippi',
    logo: 'https://skippi.in/cdn/shop/files/skippi_font.png?v=1690357134',
  },
  {
    id: '2', 
    name: 'KwikPic',
    logo: 'https://www.kwikpic.in/blog/wp-content/uploads/2022/10/Primary-Logo-e1667194420295-1024x266.png',
  },
  {
    id: '3',
    name: 'Burger Singh',
    logo: burger.src,
  },
  {
    id: '4',
    name: 'Waffle and Co.',
    logo: waffle.src,
  },
  {
    id: '5',
    name: 'Interview Buddy',
    logo: interview.src,
  }
];

interface Sponsor {
  id: string;
  name: string;
  logo: string;
}

interface SponsorsComponentProps {
  sponsors?: Sponsor[];
}

const SponsorsComponent: React.FC<SponsorsComponentProps> = ({ 
  sponsors = sponsorsData 
}) => {
  const styles: Record<string, React.CSSProperties> = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100vh',
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
      overflow: 'hidden',
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      width: '100%',
      maxWidth: '100%',
      padding: '0 1rem',
      boxSizing: 'border-box',
    },
    sponsorItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    logoContainer: {
      width: '100%',
      maxWidth: '250px',
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      opacity: 0.8,
    },
  };

  // Add global style to remove margins
  React.useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
      body, html {
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

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
      
      {/* Overlay with Sponsors Grid */}
      <div style={styles.content}>
        <h2 style={styles.title}>
          Our Event Sponsors
        </h2>
        
        {/* 3x3 Grid */}
        <div style={styles.grid}>
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.id}
              style={styles.sponsorItem}
            >
              <div style={styles.logoContainer}>
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`}
                  style={styles.logo}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsComponent;