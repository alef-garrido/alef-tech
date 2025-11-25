
interface SubstackIconProps {
  size?: number;
  className?: string;
}

const SubstackIcon = ({ size = 24, className }: SubstackIconProps) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <title>Substack</title>
    <path d="M22.023 20.252h-2.527v-2.028c0-.705-.286-1.127-.923-1.127H5.215c-.636 0-.922.422-.922 1.127v2.028H1.768c-.974 0-1.768.794-1.768 1.768v.203c0 .974.794 1.768 1.768 1.768h20.255c.974 0 1.768-.794 1.768-1.768v-.203c0-.974-.794-1.768-1.768-1.768zm-5.068-14.71c.642 0 .927-.422.927-1.127V1.795c0-.704-.285-1.127-.927-1.127H5.215c-.641 0-.927.423-.927 1.127v2.617c0 .705.286 1.127.927 1.127h11.74zm-3.151 7.21c.642 0 .927-.422.927-1.127V8.583c0-.705-.285-1.127-.927-1.127H5.215c-.641 0-.927.422-.927 1.127v2.617c0 .705.286 1.127.927 1.127h13.804z"/>
  </svg>
);

export default SubstackIcon;
