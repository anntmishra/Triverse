import React, { useState, useEffect, useRef } from 'react';

const InteractiveTriangle: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [triangleSize, setTriangleSize] = useState(100); // Fixed size
  
  const triangleRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const targetRotation = useRef(0);
  const isMountedRef = useRef(false);

  // Find the TRIVERSE title element and calculate the position
  const updatePosition = () => {
    if (typeof window === 'undefined' || !isMountedRef.current) return;
    
    // Try to find the title element if we don't have it yet
    if (!titleRef.current) {
      titleRef.current = document.querySelector('.main-title');
    }
    
    if (titleRef.current) {
      // Position triangle to the right of the title
      const titleRect = titleRef.current.getBoundingClientRect();
      const triangleWidth = triangleRef.current?.offsetWidth || triangleSize;
      const triangleHeight = triangleRef.current?.offsetHeight || triangleSize;
      
      // Calculate absolute position (including scroll)
      const scrollY = window.scrollY;
      const absoluteTop = titleRect.top + scrollY;
      
      // Position triangle to the right of the title, vertically centered
      const newX = titleRect.right + 40; // 40px gap between title and triangle
      const newY = absoluteTop + (titleRect.height / 2) - (triangleHeight / 2);
      
      setPosition({
        x: newX,
        y: newY
      });
      
      // Only show the triangle if it's properly positioned
      if (!isVisible && titleRect.top > 0) {
        setIsVisible(true);
      }
    } else {
      // Fallback if title not found - position safely
      setPosition({
        x: window.innerWidth * 0.75,
        y: window.innerHeight / 2
      });
    }
  };

  // Initialize position
  useEffect(() => {
    isMountedRef.current = true;
    
    if (typeof window === 'undefined') return;
    
    // Initial position - hide triangle until we find the title
    setPosition({
      x: window.innerWidth / 2 - (triangleSize / 2),
      y: window.innerHeight / 3 - 40
    });
    setIsVisible(false);
    
    // Wait for DOM to be ready, then find title and update position
    const timer = setTimeout(() => {
      if (!isMountedRef.current) return;
      updatePosition();
    }, 300);
    
    // Check position again after a longer delay to ensure everything is loaded
    const secondTimer = setTimeout(() => {
      if (!isMountedRef.current) return;
      updatePosition();
    }, 1000);
    
    // Set up an interval to continuously update position
    const positionInterval = setInterval(() => {
      if (!isMountedRef.current) return;
      updatePosition();
    }, 2000);
    
    // Start animation loop for smooth rotation
    const animateRotation = () => {
      if (!isMountedRef.current) return;
      
      // Smoothly interpolate towards target rotation
      setRotation(prev => {
        const diff = targetRotation.current - prev;
        return prev + diff * 0.1;
      });
      
      animationRef.current = requestAnimationFrame(animateRotation);
    };
    
    animationRef.current = requestAnimationFrame(animateRotation);
    
    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      clearTimeout(secondTimer);
      clearInterval(positionInterval);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  // Handle window resize and scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (!isMountedRef.current) return;
      updatePosition();
    };

    const handleScroll = () => {
      if (!isMountedRef.current) return;
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mouse movement for rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!triangleRef.current || !isMountedRef.current) return;
    
    const rect = triangleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle between mouse and center of triangle
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Set target rotation (add 90 to adjust for triangle orientation)
    targetRotation.current = angle + 90;
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    targetRotation.current = 0;
    setIsHovering(false);
  };

  return (
    <div 
      className="triangle-container" 
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        zIndex: 10,
        position: 'absolute'
      }}
    >
      <div 
        ref={triangleRef}
        className="interactive-triangle"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotate(${rotation}deg)`,
          cursor: 'pointer'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width={triangleSize} 
          height={triangleSize} 
          fill="#ff3366"
        >
          <polygon points="12 2 22 20 2 20" />
        </svg>
      </div>
      
      <style jsx>{`
        .triangle-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        
        .interactive-triangle {
          user-select: none;
          filter: drop-shadow(0 0 15px rgba(255, 51, 102, 0.7));
          will-change: transform;
          transition: filter 0.3s ease;
          position: relative;
          pointer-events: auto;
        }
        
        .interactive-triangle:hover {
          filter: drop-shadow(0 0 20px rgba(255, 51, 102, 0.9));
        }
        
        .interactive-triangle::after {
          content: "2.0";
          position: absolute;
          top: ${triangleSize * 0.375}px;
          left: 50%;
          transform: translateX(-50%);
          font-size: ${14 + (triangleSize - 80) * 0.05}px;
          font-weight: bold;
          color: #ff3366;
          text-shadow: 0 0 10px rgba(255, 51, 102, 0.7);
          pointer-events: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTriangle;