import React from 'react';
import { 
  BarChart, // Use this instead of ChartBar
  ChevronLeft,
  Code, 
  Cpu, 
  Speech,
  // Import any other icons you need here
} from 'lucide-react';

// This object maps icon names to components
export const Icons = {
  Chart: BarChart, // Changed from ChartBar to BarChart
  ChevronLeft,
  Code,
  Cpu,
  Speech,
  // Add other icons here
};

// Helper function to get an icon by name with fallback
export const getIcon = (name: string, props = {}) => {
  // @ts-ignore - dynamic access
  const IconComponent = Icons[name] || BarChart; // Fallback to BarChart
  return <IconComponent {...props} />;
};

export default Icons;
