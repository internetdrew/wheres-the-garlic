import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-neutral-100'>
      <div className='container mx-auto py-6 text-center'>
        <Link
          href='https://internetdrew.com'
          className='text-pink-600 font-medium underline-offset-4 transition underline'
        >
          An InternetDrew Experience
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
