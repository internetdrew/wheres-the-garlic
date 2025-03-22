import React from 'react';
import Link from 'next/link';
import NavControls from './NavControls';

const Navbar = async () => {
  return (
    <nav className='flex justify-between items-center py-3 sticky top-0 bg-neutral-950 max-w-screen-lg mx-4 z-10 lg:mx-auto'>
      <Link href='/' className='font-bold lg:text-lg'>
        Where&apos;s the Garlic?!
      </Link>
      <NavControls />
    </nav>
  );
};

export default Navbar;
