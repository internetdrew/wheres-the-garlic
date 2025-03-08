'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className='max-w-screen-lg mx-4 lg:mx-auto'>
      <nav className='flex justify-between items-center py-3 sticky top-0 bg-neutral-950'>
        <Link href='/' className='font-bold lg:text-xl'>
          Where&apos;s the Garlic?!
        </Link>
        <Link
          href='/login'
          className='text-sm ring-1 ring-neutral-800 px-4 py-2 rounded-full cursor-pointer bg-neutral-200 text-neutral-950 hover:bg-neutral-300'
        >
          Get Started
        </Link>
      </nav>
      <main>
        <header className='flex flex-col gap-4 max-w-screen-sm mx-auto text-center mt-16'>
          <h1 className='text-3xl font-semibold lg:text-5xl'>
            A Simple Home Grocery Inventory App
          </h1>
          <p className='px-8 text-lg text-neutral-400 lg:px-4 lg:text-xl'>
            See what’s in your kitchen at a glance—full, halfway, almost done,
            or out.
          </p>
          <Link
            href='/login'
            className='bg-neutral-200 mx-auto text-neutral-950 px-4 py-2 rounded-full mt-4 cursor-pointer font-medium hover:bg-neutral-300'
          >
            Get Started
          </Link>
        </header>
      </main>
    </div>
  );
}
