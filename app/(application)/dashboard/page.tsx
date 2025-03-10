import { createClient } from '@/utils/supabase/server';
import React from 'react';

const page = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className='max-w-screen-lg mx-4 lg:mx-auto'>
      <h1 className='text-2xl font-bold'>
        Hi, {user?.user_metadata.full_name}!
      </h1>
    </main>
  );
};

export default page;
