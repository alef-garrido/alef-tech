
interface LinkedinIconProps {
  size?: number;
  className?: string;
}

const LinkedinIcon = ({ size = 24, className }: LinkedinIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.325-.028-3.034-1.854-3.034-1.857 0-2.144 1.444-2.144 2.939v5.664H9.153V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.073-.93-2.073-2.074 0-1.144.929-2.073 2.073-2.073 1.144 0 2.073.929 2.073 2.073 0 1.144-.929 2.074-2.073 2.074zm1.758 13.019H3.579V9h3.518v11.452zM22.227 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.456c.98 0 1.772-.773 1.772-1.729V1.729C24 .774 23.207 0 22.227 0z"/>
  </svg>
);

export default LinkedinIcon;
