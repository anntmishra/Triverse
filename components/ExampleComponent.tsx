import React from 'react';
// Remove the problematic import:
// import { ChartBar } from 'lucide-react';

// Use our utility import instead:
import { Icons } from '../utils/icons';

const ExampleComponent = () => {
  return (
    <div>
      {/* Replace direct usage: <ChartBar /> */}
      <Icons.Chart size={24} />
      
      {/* Rest of the component */}
    </div>
  );
};

export default ExampleComponent;
