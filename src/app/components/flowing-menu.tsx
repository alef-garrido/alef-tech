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
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
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
        <span className="text-[#060010] uppercase font-bold text-[4.5vh] leading-[1.2] p-[1vh_1vw_0] tracking-wide shrink-0">
          {text}
        </span>
        <div className="w-[180px] h-[6.5vh] max-h-[64px] min-h-[52px] my-[0.8em] mx-[2.5vw] rounded-[50px] bg-[#050609] border-2 border-[#2FD9E3]/60 flex items-center justify-center shadow-[0_0_25px_rgba(47,217,227,0.35)] shrink-0">
          <AnimatedMedicalIcon variant={iconVariant} size={48} />
        </div>
      </React.Fragment>
    ));
  }, [text, iconVariant]);

  return (
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
      <div
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[5vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010] transition-colors"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white transition-transform duration-500 ease-in-out"
        ref={marqueeRef}
        style={{ transform: 'translateY(101%)' }}
      >
        <div className="h-full w-[200%] flex">
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
