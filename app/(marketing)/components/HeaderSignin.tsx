'use client';

import React from 'react';
import SignInButton from './SignInButton';
import { useUser } from '@/app/hooks/useUser';

const HeaderSignin = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) {
    return (
      <div className='mt-6 mx-auto'>
        <div className='w-52 h-10 rounded-full bg-neutral-800 animate-pulse' />
      </div>
    );
  }

  if (userError) {
    return (
      <div className='mt-6 mx-auto'>
        <div className='w-52 h-10 rounded-full bg-neutral-800 animate-pulse' />
      </div>
    );
  }

  if (user) {
    return (
      <div className='mt-6 mx-auto'>
        <SignInButton />
      </div>
    );
  }
};

export default HeaderSignin;
