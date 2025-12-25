
import React from "react";

interface FadeLoaderProps {
  /** Size of each dot (default 10px) */
  size?: number;
  /** Space between dots (default 8px) */
  gap?: number;
  /** Color of dots (default Tailwind sky-400) */
  color?: string;
  /** Animation speed in seconds (default 1.2s) */
  speed?: number;
  /** Additional classes */
  className?: string;
}

/**
 * FadeLoader — animated fading dots (like chat bubbles).
 * ```tsx
 * import FadeLoader from '@/components/FadeLoader';
 *
 * <FadeLoader size={12} color="gray" />
 * ```
 */
const FadeLoader: React.FC<FadeLoaderProps> = ({
  size = 10,
  gap = 8,
  color = "oklch(52.7% 0.154 150.069)",
  speed = 1.2,
  className = "",
}) => {
  const dotStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    borderRadius: "50%",
    marginLeft: `${gap / 2}px`,
    marginRight: `${gap / 2}px`,
  };

  return (
    <div
      role="status"
      aria-label="loading"
      className={`flex items-center justify-center ${className}`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-fadeDot"
          style={{
            ...dotStyle,
            animationDelay: `${(i * speed) / 5}s`,
            animationDuration: `${speed}s`,
          }}
        />
      ))}

      <style>
        {`
          @keyframes fadeDot {
            0%, 100% {
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeDot {
            display: inline-block;
            animation-name: fadeDot;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default FadeLoader;