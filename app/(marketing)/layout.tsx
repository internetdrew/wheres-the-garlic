import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../globals.css';
import Link from 'next/link';

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
      <body
        className={`${geistSans.className} antialiased bg-neutral-950 text-neutral-200`}
      >
        <nav className='flex justify-between items-center py-3 sticky top-0 bg-neutral-950 max-w-screen-lg mx-4 lg:mx-auto'>
          <Link href='/' className='font-bold lg:text-xl'>
            Where&apos;s the Garlic?!
          </Link>
          <Link
            href='/login'
            className='text-sm ring-1 ring-neutral-800 px-4 py-2 rounded-full cursor-pointer font-medium bg-neutral-200 text-neutral-950 hover:bg-neutral-300'
          >
            Get Started
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
