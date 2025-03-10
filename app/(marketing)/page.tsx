import { createClient } from '@/utils/supabase/server';
import SignInButton from './components/SignInButton';

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className='max-w-screen-lg mx-4 lg:mx-auto'>
      <main className='mt-24'>
        <header className='flex flex-col gap-4 max-w-screen-sm mx-auto text-center'>
          <h1 className='text-3xl font-semibold lg:text-5xl'>
            A Status-Based Home Grocery Inventory App
          </h1>
          <p className='px-8 text-lg text-neutral-400 lg:px-4 lg:text-xl'>
            See what’s in your kitchen at a glance—full, halfway, almost done,
            or out.
          </p>
          {!user && <SignInButton />}
        </header>
      </main>
    </div>
  );
}
