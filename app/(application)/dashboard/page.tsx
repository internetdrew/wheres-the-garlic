import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import HouseholdFormTriggers from './components/HouseholdFormTriggers';

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
    .select(`id, household_id, role, household:households(id, name)`)
    .eq('member_id', user.id);

  return (
    <main className='max-w-screen-lg mx-4 mt-10 lg:mx-auto'>
      <h1 className='text-xl font-bold'>
        Hi, {user?.user_metadata.full_name}!
      </h1>
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
      <ul className='mt-4 border border-gray-800 border-dashed rounded-md p-6'>
        {memberships?.map(membership => (
          <li key={membership.id}>
            <p>Household: {membership.household.name}</p>
            <p>Role: {membership.role}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
