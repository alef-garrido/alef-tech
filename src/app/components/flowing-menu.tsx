'use client';

import React from 'react';
import AnimatedMedicalIcon, { MedicalIconVariant } from './icons/AnimatedMedicalIcon';

export interface MenuItemProps {
  text: string;
  image?: string;
  iconVariant?: MedicalIconVariant;
  onClick: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col justify-center">
      <nav className="flex flex-col w-full h-full m-0 p-0 divide-y divide-[var(--border)]">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const REPEATED_MARQUEE_CONTENT = Array.from({ length: 4 });

const MenuItem: React.FC<MenuItemProps> = ({ text, iconVariant = 'cross', onClick }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!marqueeRef.current) return;
    marqueeRef.current.style.transform = 'translateY(0%)';
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;
    marqueeRef.current.style.transform = 'translateY(101%)';
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    return REPEATED_MARQUEE_CONTENT.map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060010] uppercase font-bold text-xl sm:text-2xl md:text-3xl leading-[1.2] px-4 tracking-wide shrink-0">
          {text}
        </span>
        <div className="w-[100px] sm:w-[130px] h-[40px] sm:h-[48px] my-auto mx-3 rounded-[50px] bg-[#050609] border-2 border-[#2FD9E3]/60 flex items-center justify-center shadow-[0_0_18px_rgba(47,217,227,0.35)] shrink-0">
          <AnimatedMedicalIcon variant={iconVariant} size={32} />
        </div>
      </React.Fragment>
    ));
  }, [text, iconVariant]);

  return (
    <div className="flex-1 relative overflow-hidden text-center py-5 min-h-[84px] flex items-center justify-center group" ref={itemRef}>
      {/* Base Title (high contrast light/dark mode) */}
      <div
        className="flex items-center justify-center w-full h-full relative cursor-pointer uppercase no-underline font-bold text-[var(--text)] text-xl sm:text-2xl lg:text-3xl hover:text-[#0284C7] dark:hover:text-[#2FD9E3] focus:text-[var(--text)] transition-colors tracking-tight px-4"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>

      {/* Marquee Hover Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-[#2FD9E3] dark:bg-white transition-transform duration-500 ease-in-out z-10 flex items-center"
        ref={marqueeRef}
        style={{ transform: 'translateY(101%)' }}
      >
        <div className="h-full w-[200%] flex items-center">
          <div
            className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee"
            style={{ transform: 'translateZ(0)' }}
          >
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
