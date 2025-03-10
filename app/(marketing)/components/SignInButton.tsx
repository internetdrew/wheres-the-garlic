'use client';

import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

const SignInButton = () => {
  const supabase = createClient();

  const handleSignInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  };
  return (
    <button
      className='bg-neutral-200 text-neutral-950 font-medium px-4 py-2 rounded-full mt-6 flex items-center gap-2 cursor-pointer w-fit mx-auto hover:bg-neutral-300'
      onClick={handleSignInWithGoogle}
    >
      <span>
        <Image src='/google.svg' width={24} height={24} alt='Google' />
      </span>
      Sign in with Google
    </button>
  );
};

export default SignInButton;
