import localFont from 'next/font/local';

export const snasm = localFont({
  src: [
    {
      path: '../../public/assets/fonts/Snasm Lt.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/Snasm Lt It.woff2',
      weight: '300',
      style: 'italic',
    },
  ],
  variable: '--font-snasm',
  display: 'swap',
});
