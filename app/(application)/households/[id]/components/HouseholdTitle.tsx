import React from 'react';
import HouseholdNamePopover from './HouseholdNamePopover';
import { useHousehold } from '@/app/hooks/useHousehold';

const HouseholdTitle = ({ householdId }: { householdId: string }) => {
  const { household, householdLoading, householdError } =
    useHousehold(householdId);

  if (householdLoading) {
    return <div className='w-48 h-6 bg-neutral-500 animate-pulse' />;
  }

  if (householdError) {
    return <div>Error loading household. Please try again.</div>;
  }

  if (!household) {
    return <div>Household not found.</div>;
  }

  return (
    <div className='flex items-center gap-2'>
      <h1 className='text-xl font-bold lg:text-2xl'>{household?.title}</h1>
      <HouseholdNamePopover
        householdId={householdId}
        householdTitle={household?.title}
      />
    </div>
  );
};

export default HouseholdTitle;
