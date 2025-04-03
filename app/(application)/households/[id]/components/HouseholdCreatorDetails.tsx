import { useHousehold } from '@/app/hooks/useHousehold';
import Image from 'next/image';
import React from 'react';

const HouseholdCreatorDetails = ({ householdId }: { householdId: string }) => {
  const { household, householdLoading, householdError } =
    useHousehold(householdId);

  if (householdLoading) {
    return <div className='w-48 h-6 mt-2 bg-neutral-500 animate-pulse' />;
  }

  if (householdError) {
    return <div>Error loading household. Please try again.</div>;
  }

  if (!household) {
    return <div>Household not found.</div>;
  }

  return (
    <div className='flex flex-col mt-1 text-neutral-500 sm:flex-row sm:items-center sm:gap-2'>
      <span>Created by</span>
      <span className='flex items-center gap-1'>
        <Image
          src={household.creator.avatar_url}
          alt={household.creator.full_name}
          width={20}
          height={20}
          className='rounded-full'
        />
        {household.creator.full_name}
      </span>
    </div>
  );
};

export default HouseholdCreatorDetails;
