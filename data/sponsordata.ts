interface Sponsor {
    id: string;
    name: string;
    logo: string;
    website?: string;
    tier?: 'platinum' | 'gold' | 'silver' | 'bronze';
  }
  
  const sponsorsData: Sponsor[] = [
    {
      id: 'tech-innovations',
      name: 'Tech Innovations Inc.',
      logo: '/logos/tech-innovations.png',
      website: 'https://techinnovations.com',
      tier: 'platinum'
    },
    {
      id: 'global-solutions',
      name: 'Global Solutions',
      logo: '/logos/global-solutions.png',
      website: 'https://globalsolutions.org',
      tier: 'gold'
    },
    {
      id: 'startup-nest',
      name: 'Startup Nest',
      logo: '/logos/startup-nest.png',
      website: 'https://startupnest.com',
      tier: 'silver'
    },
    {
      id: 'innovate-labs',
      name: 'Innovate Labs',
      logo: '/logos/innovate-labs.png',
      website: 'https://innovatelabs.tech',
      tier: 'silver'
    },
    {
      id: 'future-tech',
      name: 'Future Tech',
      logo: '/logos/future-tech.png',
      website: 'https://futuretech.com',
      tier: 'bronze'
    },
    {
      id: 'code-masters',
      name: 'Code Masters',
      logo: '/logos/code-masters.png',
      website: 'https://codemasters.dev',
      tier: 'bronze'
    }
  ];
  
  export default sponsorsData;