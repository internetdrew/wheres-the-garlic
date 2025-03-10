'use client';

import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
const Navbar = () => {
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    redirect('/');
  };

  return (
    <nav className='flex justify-between items-center py-3 sticky top-0 bg-neutral-950 max-w-screen-lg mx-4 z-10 lg:mx-auto'>
      <Link href='/' className='font-bold text-lg'>
        Where&apos;s the Garlic?!
      </Link>

      <button
        className='bg-neutral-200 text-neutral-950 text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
