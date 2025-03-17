import { useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

// Window size hook with throttling for performance
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          ticking = false;
        });

        ticking = true;
      }
    };

    // Set size on initial load
    handleResize();

    // Add event listener with passive option for better performance
    window.addEventListener("resize", handleResize, { passive: true });

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
