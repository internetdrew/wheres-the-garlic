import { createClient } from '@/utils/supabase/server';
import SignInButton from './components/SignInButton';
import Image from 'next/image';
import screenshot2 from '@/public/wtg-screenshot2.webp';
import Screen1 from '@/public/screen1.webp';
import Screen2 from '@/public/screen2.webp';
import Screen3 from '@/public/screen3.webp';

const howItWorks = [
  {
    title: 'Create a household',
    description: 'Create a household to start tracking your inventory.',
    image: Screen1,
  },
  {
    title: 'Add your items',
    description: 'Add items with ease.',
    image: Screen2,
  },
  {
    title: 'Update item statuses',
    description: 'Update item statuses as you use them.',
    image: Screen3,
  },
  {
    title: 'Invite others to your household',
    description: 'Invite others and keep everyone in the loop.',
    image: Screen3,
  },
];

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
          <p className='px-8 text-lg text-neutral-500 lg:px-4 lg:text-xl'>
            See what’s in your kitchen at a glance—full, halfway, almost done,
            or out.
          </p>
          {!user && (
            <div className='mt-6 mx-auto'>
              <SignInButton />
            </div>
          )}
        </header>
        <section className='flex flex-col items-center mt-20 text-center'>
          <div className='rounded-xl ring-1 ring-neutral-500 p-2 mx-1'>
            <Image
              src={screenshot2}
              alt='Dashboard screenshot'
              width={1000}
              height={1000}
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='mt-24 text-2xl font-semibold lg:text-3xl'>
            How it works
          </h2>
          <p className='text-neutral-500 text-lg lg:text-xl'>
            Easily manage your home grocery inventory with a status-based
            system.
          </p>
          <ul className='my-8 grid grid-cols-1 gap-6 text-left md:grid-cols-2'>
            {howItWorks.map(item => (
              <li
                key={item.title}
                className='rounded-xl bg-neutral-200 p-4 text-neutral-900'
              >
                <h3 className='text-xl font-semibold'>{item.title}</h3>
                <p className='mb-6 text-lg'>{item.description}</p>
                <div className='aspect-video w-full'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1000}
                    height={1000}
                    className='w-full h-full object-cover'
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
