import type { Metadata } from 'next';
import { Poppins, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['400', '600', '700'],
  variable: '--font-bengali',
});

export const metadata: Metadata = {
  title: 'Proshosto',
  description: 'Internal tool for notice and donation receipt generation',
  icons: {
    icon: '/logo-rounded.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${notoSansBengali.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
