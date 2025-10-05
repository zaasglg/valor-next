import React from 'react';

const ChickenOptimizedIcon: React.FC<{ width?: number; height?: number; className?: string }> = ({ 
  width = 45, 
  height = 28, 
  className = "chicken-logo" 
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 85 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="85"
        height="68"
        rx="8"
        fill="#FFD700"
      />
      <path
        d="M42.5 15C35 15 28.5 20 25 28C25 28 30 25 35 25C40 25 45 28 45 28C41.5 20 50 15 42.5 15Z"
        fill="#FF6B35"
      />
      <circle
        cx="35"
        cy="22"
        r="2"
        fill="#000"
      />
      <path
        d="M30 35C30 35 35 40 42.5 40C50 40 55 35 55 35C55 35 50 45 42.5 45C35 45 30 35 30 35Z"
        fill="#FF6B35"
      />
      <path
        d="M25 50C25 50 30 55 42.5 55C55 55 60 50 60 50C60 50 55 60 42.5 60C30 60 25 50 25 50Z"
        fill="#FF6B35"
      />
      <path
        d="M20 45C20 45 25 50 42.5 50C60 50 65 45 65 45C65 45 60 55 42.5 55C25 55 20 45 20 45Z"
        fill="#FF6B35"
      />
      <path
        d="M15 40C15 40 20 45 42.5 45C65 45 70 40 70 40C70 40 65 50 42.5 50C20 50 15 40 15 40Z"
        fill="#FF6B35"
      />
      <text
        x="42.5"
        y="65"
        textAnchor="middle"
        fontSize="8"
        fill="#000"
        fontWeight="bold"
      >
        CHICKEN
      </text>
    </svg>
  );
};

export default ChickenOptimizedIcon;
