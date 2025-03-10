import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@/app/globals.css';
import Script from 'next/script';
import Navbar from './components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Where's the garlic?!",
  description:
    'Know what’s in your kitchen at a glance—full, halfway, almost done, or out.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          src='https://accounts.google.com/gsi/client'
          strategy='beforeInteractive'
        />
      </head>
      <body
        className={`${geistSans.className} antialiased bg-neutral-950 text-neutral-200`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
