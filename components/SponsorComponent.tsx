import React from 'react';
import { motion } from 'framer-motion';
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
  },
  
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
  return (
    <div className="relative w-full">
      <div className="relative w-auto h-screen">
        <img
          src="/assets/website.png"
          alt="Triverse Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-white font-heading">Our Event Sponsors</h2>
          <div className="grid grid-cols-3 gap-8 max-w-6xl w-full">
            {sponsors.map((sponsor) => (
              <motion.div 
                key={sponsor.id}
                className="flex flex-col items-center justify-center text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full max-w-[250px] aspect-video mb-2">
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  {sponsor.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsComponent;