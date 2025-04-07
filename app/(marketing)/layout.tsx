import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: "Where's the Garlic?!",
  metadataBase: new URL('https://www.wheresthegarlic.com/'),
  title: "Where's the Garlic?!",
  description:
    'Know what’s in your kitchen at a glance—full, halfway, almost done, or out.',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Where's the Garlic?!",
    description:
      'Know what’s in your kitchen at a glance—full, halfway, almost done, or out.',
    url: 'https://www.wheresthegarlic.com/',
    images: '/banner.webp',
    siteName: "Where's the Garlic?!",
    locale: 'en_US',
    type: 'website',
  },
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
        <Footer />
      </body>
    </html>
  );
}
