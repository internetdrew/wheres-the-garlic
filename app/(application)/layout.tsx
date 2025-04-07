import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '@/app/globals.css';
import Script from 'next/script';
import Navbar from './dashboard/components/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: "Where's the garlic?!",
  metadataBase: new URL('https://www.wheresthegarlic.com/'),
  title: "Where's the garlic?!",
  description:
    'Know which groceries are full, halfway, almost done, or out in a glance.',
  keywords: [
    'app for home grocery inventory',
    'best home grocery inventory app',
    'grocery inventory app for home',
    'home grocery inventory app',
    'household grocery inventory app',
  ],
  authors: [{ name: 'Andrew Rowley', url: 'https://www.internetdrew.com/' }],
  creator: 'Andrew Rowley',
  icons: {
    icon: '/favicon.svg',
  },
  referrer: 'strict-origin-when-cross-origin',
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
      <body className={`${geistSans.className} antialiased bg-neutral-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
