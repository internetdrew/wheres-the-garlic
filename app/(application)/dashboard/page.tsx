import React from 'react';
import { createClient } from '@/utils/supabase/server';
import HouseholdFormTriggers from './components/HouseholdFormTriggers';
import { redirect } from 'next/navigation';
import { getHouseholdsByUserIdQuery } from '@/utils/supabase/queries';
import HouseholdCard from './components/HouseholdCard';

const Dashboard = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: memberships } = await getHouseholdsByUserIdQuery(
    supabase,
    user.id
  );

  return (
    <main className='max-w-screen-lg mx-4 mt-10 lg:mx-auto'>
      <h1 className='text-xl font-bold'>
        Hi, {user?.user_metadata.full_name}!
      </h1>
      <p className='text-sm text-gray-400'>
        You can create up to 3 households.
      </p>
      <HouseholdFormTriggers householdCount={memberships?.length || 0} />
      <div className='mt-6'>
        <h2 className='text-lg font-bold'>Households</h2>
        <div className='text-gray-400'>
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
          <HouseholdCard key={membership.id} household={membership.household} />
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
