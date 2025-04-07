'use client';

import React from 'react';
import SignInButton from './SignInButton';
import Link from 'next/link';
import { useUser } from '@/app/hooks/useUser';

const NavAction = () => {
  const { user, userLoading } = useUser();

  if (userLoading) {
    return (
      <div
        role='status'
        aria-label='Loading'
        className='w-32 h-9 rounded-md bg-neutral-500 animate-pulse'
      />
    );
  }

  if (!user) {
    return <SignInButton size='sm' />;
  }

  return (
    <Link
      href='/dashboard'
      className='ring-1 ring-neutral-300 font-medium px-4 py-2 rounded-md cursor-pointer text-sm transition-all hover:shadow-md'
    >
      Go to dashboard
    </Link>
  );
};

export default NavAction;
