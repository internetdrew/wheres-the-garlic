import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-neutral-950 text-neutral-200'>
      <div className='container mx-auto px-4 py-8 text-center'>
        <Link
          href='https://internetdrew.com'
          className='text-pink-600 font-medium underline-offset-4 transition hover:text-pink-700 hover:underline'
        >
          An InternetDrew Experience
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
