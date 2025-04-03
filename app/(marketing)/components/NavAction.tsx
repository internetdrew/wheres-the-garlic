'use client';

import React from 'react';
import SignInButton from './SignInButton';
import Link from 'next/link';
import { useUser } from '@/app/hooks/useUser';

const NavAction = () => {
  const { user, userLoading } = useUser();

  if (userLoading) {
    return (
      <div className='w-28 h-9 rounded-full bg-neutral-800 animate-pulse' />
    );
  }

  if (!user) {
    return <SignInButton size='sm' />;
  }

  return (
    <Link
      href='/dashboard'
      className='ring-1 ring-neutral-400 font-medium px-4 py-2 rounded-md cursor-pointer text-sm transition-all duration-300 hover:shadow-md'
    >
      Dashboard
    </Link>
  );
};

export default NavAction;
