import React, { useEffect, useState } from 'react';

export function TrustScore({ score = 91, maxScore = 100, isDangerous = false }) {
  const [displayScore, setDisplayScore] = useState(score);

  // Smooth numeric counter animation
  useEffect(() => {
    let start = displayScore;
    const end = score;
    if (start === end) return;

    const stepTime = 15;
    const steps = 18;
    let stepCount = 0;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      stepCount++;
      start += increment;
      if (stepCount >= steps) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG circle calculations
  const size = 180;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, displayScore));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const strokeColor = isDangerous ? '#dc2626' : '#059669';
  const glowColor = isDangerous ? 'rgba(220, 38, 38, 0.2)' : 'rgba(5, 150, 105, 0.2)';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ background: strokeColor }}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#e2ede5"
            strokeWidth={strokeWidth}
          />
          {/* Active Animated Ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${glowColor})`,
            }}
          />
        </svg>

        {/* Center Numeric Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#527060] font-semibold mb-0.5">
            TRUST SCORE
          </span>
          <div className="flex items-baseline justify-center">
            <span
              className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight transition-colors duration-300"
              style={{ color: isDangerous ? '#dc2626' : '#092218' }}
            >
              {displayScore}
            </span>
          </div>
          <span className="text-xs font-mono text-[#71877b] font-medium">
            / {maxScore}
          </span>
        </div>
      </div>
    </div>
  );
}
