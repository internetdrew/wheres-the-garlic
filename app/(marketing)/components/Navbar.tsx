import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import SignInButton from './SignInButton';

const Navbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav
      className={`flex justify-between items-center py-3 sticky top-0 bg-neutral-950 max-w-screen-lg mx-4 z-10 lg:mx-auto`}
    >
      <Link href='/' className='font-bold text-lg'>
        Where&apos;s the Garlic?!
      </Link>
      {user ? (
        <Link
          href='/dashboard'
          className='bg-neutral-200 text-sm text-neutral-950 font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300 sm:text-sm'
        >
          Dashboard
        </Link>
      ) : (
        <SignInButton size='sm' caption='Sign in' />
      )}
    </nav>
  );
};

export default Navbar;
