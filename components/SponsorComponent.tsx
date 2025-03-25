import React from "react";
import sponsorsData from "./sponsordata";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
}

const SponsorsComponent: React.FC = () => {
  // Group sponsors by tier
  const sponsorsByTier = sponsorsData.reduce((acc, sponsor) => {
    const tier = sponsor.tier || 'bronze';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(sponsor);
    return acc;
  }, {} as Record<string, Sponsor[]>);

  // Tier order and display names
  const tierOrder = ['platinum', 'gold', 'silver', 'bronze'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Sponsors</h2>
      
      {tierOrder.map((tier) => {
        const tierSponsors = sponsorsByTier[tier];
        if (!tierSponsors || tierSponsors.length === 0) return null;

        return (
          <div key={tier} className="mb-6">
            <h3 className="text-xl font-semibold capitalize mb-4">{tier} Sponsors</h3>
            <div className={`grid ${
              tier === 'platinum' ? 'grid-cols-3' : 
              tier === 'gold' ? 'grid-cols-3' : 
              tier === 'silver' ? 'grid-cols-4' : 
              'grid-cols-6'
            } gap-4`}>
              {tierSponsors.map((sponsor) => (
                <div 
                  key={sponsor.id} 
                  className="flex flex-col items-center p-4 border rounded-md hover:shadow-md transition-shadow"
                >
                  {sponsor.website ? (
                    <a 
                      href={sponsor.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`} 
                        className={`
                          ${tier === 'platinum' ? 'w-48 h-24' : 
                            tier === 'gold' ? 'w-36 h-20' : 
                            tier === 'silver' ? 'w-28 h-16' : 
                            'w-20 h-12'} 
                          object-contain mb-2
                        `}
                      />
                      <p className="text-sm font-medium text-center">{sponsor.name}</p>
                    </a>
                  ) : (
                    <>
                      <img 
                        src={sponsor.logo} 
                        alt={`${sponsor.name} logo`} 
                        className={`
                          ${tier === 'platinum' ? 'w-48 h-24' : 
                            tier === 'gold' ? 'w-36 h-20' : 
                            tier === 'silver' ? 'w-28 h-16' : 
                            'w-20 h-12'} 
                          object-contain mb-2
                        `}
                      />
                      <p className="text-sm font-medium text-center">{sponsor.name}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SponsorsComponent;