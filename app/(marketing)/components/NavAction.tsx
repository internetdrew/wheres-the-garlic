'use client';

import React from 'react';
import SignInButton from './SignInButton';
import Link from 'next/link';
import { useUser } from '@/app/hooks/useUser';

const NavAction = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) {
    return (
      <div className='w-28 h-9 rounded-full bg-neutral-800 animate-pulse' />
    );
  }

  if (userError) {
    return (
      <div className='w-28 h-9 rounded-full bg-neutral-800 animate-pulse' />
    );
  }

  if (!user) {
    return <SignInButton size='sm' caption='Sign in' />;
  }

  return (
    <Link
      href='/dashboard'
      className='bg-neutral-200 text-sm text-neutral-950 font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300 sm:text-sm'
    >
      Dashboard
    </Link>
  );
};

export default NavAction;
