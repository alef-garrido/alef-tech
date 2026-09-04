'use client';

import React from 'react';

export type MedicalIconVariant = 'cross' | 'syrup' | 'pill' | 'thermometer' | 'vitamin';

interface AnimatedMedicalIconProps {
  variant?: MedicalIconVariant;
  size?: number;
  className?: string;
  color?: string;
}

export const AnimatedMedicalIcon: React.FC<AnimatedMedicalIconProps> = ({
  variant = 'cross',
  size = 32,
  className = '',
  color = '#2FD9E3',
}) => {
  const containerStyle = { width: size, height: size };

  switch (variant) {
    case 'syrup':
      return (
        <div style={containerStyle} className={`inline-flex items-center justify-center relative ${className}`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full overflow-visible">
            {/* Bottle Outline */}
            <path
              d="M14 6H22V10H14V6Z M12 10H24V14L26 18V30C26 31.1046 25.1046 32 24 32H12C10.8954 32 10 31.1046 10 30V18L12 14V10Z"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              fill="rgba(0, 255, 178, 0.05)"
            />
            {/* Liquid Level Wave */}
            <path
              d="M12 22C14 20 16 24 18 22C20 20 22 24 24 22V30H12V22Z"
              fill="rgba(0, 255, 178, 0.25)"
              stroke={color}
              strokeWidth="1.5"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 2,1; 0,0; -2,1; 0,0"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>
            {/* Dripping Drop */}
            <circle cx="18" cy="13" r="1.5" fill={color}>
              <animate attributeName="cy" values="10;17;10" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );

    case 'pill':
      return (
        <div style={containerStyle} className={`inline-flex items-center justify-center relative ${className}`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full overflow-visible">
            {/* Capsule Outline rotated 45 deg */}
            <g transform="rotate(-45 18 18)">
              <rect
                x="11"
                y="6"
                width="14"
                height="24"
                rx="7"
                stroke={color}
                strokeWidth="2"
                fill="rgba(0, 255, 178, 0.08)"
              />
              {/* Divider Line */}
              <line x1="11" y1="18" x2="25" y2="18" stroke={color} strokeWidth="2" />
              {/* Active Half Fill Glow */}
              <path
                d="M11 18H25V23C25 26.866 21.866 30 18 30C14.134 30 11 26.866 11 23V18Z"
                fill="rgba(0, 255, 178, 0.3)"
              >
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Energy Ring */}
            <circle cx="18" cy="18" r="14" stroke={color} strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      );

    case 'thermometer':
      return (
        <div style={containerStyle} className={`inline-flex items-center justify-center relative ${className}`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full overflow-visible">
            {/* Thermometer Stem & Bulb */}
            <path
              d="M16 6C16 4.89543 16.8954 4 18 4C19.1046 4 20 4.89543 20 6V21.1707C21.7252 22.0463 23 23.88 23 26C23 28.7614 20.7614 31 18 31C15.2386 31 13 28.7614 13 26C13 23.88 14.2748 22.0463 16 21.1707V6Z"
              stroke={color}
              strokeWidth="2"
              fill="rgba(0, 255, 178, 0.05)"
            />
            {/* Mercury Level */}
            <path
              d="M17 12H19V24.2C19.6 24.6 20 25.2 20 26C20 27.1046 19.1046 28 18 28C16.8954 28 16 27.1046 16 26C16 25.2 16.4 24.6 17 24.2V12Z"
              fill={color}
            >
              <animate attributeName="d" values="M17 16H19V24.2C19.6 24.6 20 25.2 20 26C20 27.1046 19.1046 28 18 28C16.8954 28 16 27.1046 16 26C16 25.2 16.4 24.6 17 24.2V16Z; M17 8H19V24.2C19.6 24.6 20 25.2 20 26C20 27.1046 19.1046 28 18 28C16.8954 28 16 27.1046 16 26C16 25.2 16.4 24.6 17 24.2V8Z; M17 16H19V24.2C19.6 24.6 20 25.2 20 26C20 27.1046 19.1046 28 18 28C16.8954 28 16 27.1046 16 26C16 25.2 16.4 24.6 17 24.2V16Z" dur="3.5s" repeatCount="indefinite" />
            </path>
            {/* Ticks */}
            <line x1="21" y1="9" x2="23" y2="9" stroke={color} strokeWidth="1.5" />
            <line x1="21" y1="13" x2="24" y2="13" stroke={color} strokeWidth="1.5" />
            <line x1="21" y1="17" x2="23" y2="17" stroke={color} strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'vitamin':
      return (
        <div style={containerStyle} className={`inline-flex items-center justify-center relative ${className}`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full overflow-visible">
            {/* Central Molecule Node */}
            <circle cx="18" cy="18" r="5" stroke={color} strokeWidth="2" fill="rgba(0, 255, 178, 0.3)">
              <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Orbiting Electrons */}
            <g>
              <ellipse cx="18" cy="18" rx="13" ry="5" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="18" cy="18" rx="13" ry="5" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from="60 18 18" to="420 18 18" dur="4s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="18" cy="18" rx="13" ry="5" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from="120 18 18" to="480 18 18" dur="4s" repeatCount="indefinite" />
              </ellipse>
            </g>
          </svg>
        </div>
      );

    case 'cross':
    default:
      return (
        <div style={containerStyle} className={`inline-flex items-center justify-center relative ${className}`}>
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full overflow-visible">
            {/* Outer Medical Cross Frame */}
            <path
              d="M14 4H22V14H32V22H22V32H14V22H4V14H14V4Z"
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              fill="rgba(0, 255, 178, 0.06)"
            />
            {/* ECG Heartbeat Wave traversing across the cross */}
            <path
              d="M5 18H13L15 12L18 24L21 14L23 18H31"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0,100; 50,0; 0,100"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </path>
            {/* Center Pulse Node */}
            <circle cx="18" cy="18" r="2.5" fill={color}>
              <animate attributeName="r" values="2;4;2" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );
  }
};

export default AnimatedMedicalIcon;
