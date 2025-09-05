import React from 'react';

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
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

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
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
        <span className="text-[#060010] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">{text}</span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, []);

  return (
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]" ref={itemRef}>
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060010] focus:text-white focus-visible:text-[#060010]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white transition-transform duration-500 ease-in-out"
        ref={marqueeRef}
        style={{ transform: 'translateY(101%)' }}
      >
        <div className="h-full w-[200%] flex">
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee" style={{ transform: 'translateZ(0)' }}>
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;