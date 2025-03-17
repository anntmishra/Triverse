import React, { useEffect, useRef } from "react";
import styles from "./pixelcard.module.css";

class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }

  disappear() {
    this.isIdle = false;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= this.sizeStep;
    this.draw();
  }
}

function getEffectiveSpeed(
  value: number | string,
  reducedMotion: boolean
): number {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value.toString(), 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const VARIANTS = {
  default: {
    activeColor: null,
    gap: 5,
    speed: 35,
    colors: "#f8fafc,#f1f5f9,#cbd5e1",
    noFocus: false,
  },
  blue: {
    activeColor: "#e0f2fe",
    gap: 10,
    speed: 25,
    colors: "#e0f2fe,#7dd3fc,#0ea5e9",
    noFocus: false,
  },
  yellow: {
    activeColor: "#fef08a",
    gap: 3,
    speed: 20,
    colors: "#fef08a,#fde047,#eab308",
    noFocus: false,
  },
  pink: {
    activeColor: "#fecdd3",
    gap: 6,
    speed: 80,
    colors: "#fecdd3,#fda4af,#e11d48",
    noFocus: true,
  },
};

interface PixelCardProps {
  variant?: keyof typeof VARIANTS;
  gap?: number;
  speed?: number;
  colors?: string;
  noFocus?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const PixelCard: React.FC<PixelCardProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case "blue":
        return "pixel-card-blue";
      case "pink":
        return "pixel-card-pink";
      case "green":
        return "pixel-card-green";
      case "yellow":
        return "pixel-card-yellow";
      case "purple":
        return "pixel-card-purple";
      default:
        return "pixel-card-default";
    }
  };

  return (
    <div className={`pixel-card ${getVariantClass()} ${className}`}>
      {children}
      <style jsx>{`
        .pixel-card {
          position: relative;
          background-color: rgba(20, 10, 30, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .pixel-card:before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          padding: 1px;
          background: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .pixel-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .pixel-card-blue:before {
          background: linear-gradient(
            to bottom right,
            rgba(56, 189, 248, 0.7),
            rgba(56, 189, 248, 0)
          );
        }

        .pixel-card-pink:before {
          background: linear-gradient(
            to bottom right,
            rgba(236, 72, 153, 0.7),
            rgba(236, 72, 153, 0)
          );
        }

        .pixel-card-green:before {
          background: linear-gradient(
            to bottom right,
            rgba(74, 222, 128, 0.7),
            rgba(74, 222, 128, 0)
          );
        }

        .pixel-card-yellow:before {
          background: linear-gradient(
            to bottom right,
            rgba(250, 204, 21, 0.7),
            rgba(250, 204, 21, 0)
          );
        }

        .pixel-card-purple:before {
          background: linear-gradient(
            to bottom right,
            rgba(234, 142, 234, 0.7),
            rgba(234, 142, 234, 0)
          );
        }
      `}</style>
    </div>
  );
};

export default PixelCard;
