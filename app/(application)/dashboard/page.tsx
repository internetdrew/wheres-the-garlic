import React from 'react';
import { createClient } from '@/utils/supabase/server';
import HouseholdFormTriggers from './components/HouseholdFormTriggers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistance } from 'date-fns';

const Dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: memberships } = await supabase
    .from('household_members')
    .select(
      `
      id,
      household:household_id(
        id,
        title,
        creator:creator_id(
          full_name,
          avatar_url
        ),
        created_at,
        updated_at
      ),
      member_role
      `
    )
    .eq('member_id', user.id);

  console.log(memberships);

  return (
    <main className='max-w-screen-lg mx-4 mt-10 lg:mx-auto'>
      <h1 className='text-xl font-bold'>
        Hi, {user?.user_metadata.full_name}!
      </h1>
      <p className='text-sm text-gray-400'>
        You can create up to 3 households.
      </p>
      <HouseholdFormTriggers />
      <div className='mt-6'>
        <h2 className='text-lg font-bold'>Households</h2>
        <div>
          {memberships?.length === 0 ? (
            <p>You&apos;re not part of any households yet!</p>
          ) : (
            <p>You&apos;re part of the following households:</p>
          )}
        </div>
      </div>
      <ul
        className={`my-4 flex flex-col gap-4  ${
          memberships?.length === 0
            ? 'border border-neutral-800 border-dashed rounded-md p-6'
            : ''
        } sm:grid sm:grid-cols-2 md:grid-cols-3`}
      >
        {memberships?.map(membership => (
          <li
            key={membership.id}
            className='relative bg-neutral-200 text-neutral-900 rounded-xl p-4 hover:bg-neutral-300 transition-colors'
          >
            <Link
              href={`/households/${membership.household.id}`}
              className='font-medium'
            >
              <span className='absolute inset-0' />
              {membership.household.title}
            </Link>
            <p className='text-sm text-neutral-600'>
              Last updated{' '}
              {formatDistance(membership.household.updated_at, new Date(), {
                addSuffix: true,
                includeSeconds: true,
              })}
            </p>
            <p className='text-sm text-neutral-600 mt-8'>Created by:</p>
            <div className='flex items-center gap-2 mt-1'>
              <Image
                src={membership.household.creator.avatar_url}
                alt={membership.household.creator.full_name}
                width={20}
                height={20}
                className='rounded-full'
              />
              <span>{membership.household.creator.full_name}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
