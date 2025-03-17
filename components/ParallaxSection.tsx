import React, { useEffect, useState, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5,
  className = ''
}) => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport with a more generous threshold
      if (rect.top < windowHeight * 1.2) {
        setIsVisible(true);
        
        // Calculate parallax offset
        const scrollPosition = window.scrollY;
        const sectionTop = rect.top + scrollPosition;
        const scrollOffset = scrollPosition - sectionTop;
        const parallaxOffset = scrollOffset * speed;
        
        setOffset(parallaxOffset);
      } else if (rect.top > windowHeight * 1.5) {
        // Only hide when scrolled far away
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check with a small delay to ensure DOM is ready
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={sectionRef}
      className={`parallax-section ${className} ${isVisible ? 'visible' : ''}`}
      style={{ 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className="parallax-content"
        style={{ 
          transform: `translateY(${offset}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out, transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
      
      <style jsx>{`
        .parallax-section {
          position: relative;
          overflow: hidden;
        }
        
        .parallax-section.visible .parallax-content {
          opacity: 1;
        }
        
        .parallax-content {
          opacity: 0;
          transition: opacity 0.8s ease-in-out, transform 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ParallaxSection; 