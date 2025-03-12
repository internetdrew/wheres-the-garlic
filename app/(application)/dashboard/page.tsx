import React from 'react';
import { createClient } from '@/utils/supabase/server';
import HouseholdFormTriggers from './components/HouseholdFormTriggers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
        creator_id,
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
      <ul className='mt-4 flex flex-col gap-4 border border-gray-800 border-dashed rounded-md p-6 md:grid md:grid-cols-3'>
        {memberships?.map(membership => (
          <li
            key={membership.id}
            className='relative bg-gray-900 rounded-md p-4'
          >
            <Link href={`/households/${membership.household.id}`}>
              <span className='absolute inset-0' />
              {membership.household.title}
            </Link>
            <p>Household: {membership.id}</p>
            <p>Role: {membership.member_role}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
