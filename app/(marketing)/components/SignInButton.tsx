'use client';

import React from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

interface SignInButtonProps {
  size?: 'sm' | 'md' | 'lg';
  caption?: string;
}

const SignInButton = ({
  size = 'md',
  caption = 'Sign in with Google',
}: SignInButtonProps) => {
  const supabase = createClient();

  const imageSize = size === 'sm' ? 18 : size === 'md' ? 20 : 24;

  const handleSignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button
      className={`ring-1 ring-neutral-400 font-medium px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer w-fit transition-all duration-300 ${
        size === 'sm' && 'text-sm'
      } ${size === 'md' && 'text-base'} ${
        size === 'lg' && 'text-lg'
      } hover:shadow-md`}
      onClick={handleSignInWithGoogle}
    >
      <span>
        <Image
          src='/google.svg'
          width={imageSize}
          height={imageSize}
          alt='Google'
        />
      </span>
      {caption}
    </button>
  );
};

export default SignInButton;
