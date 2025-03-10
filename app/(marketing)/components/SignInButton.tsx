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

  const imageSize = size === 'sm' ? 20 : size === 'md' ? 24 : 28;

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
      className={`bg-neutral-200 text-neutral-950 font-medium px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer w-fit  hover:bg-neutral-300 ${
        size === 'sm' && 'text-sm'
      } ${size === 'md' && 'text-base'} ${size === 'lg' && 'text-lg'}`}
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
