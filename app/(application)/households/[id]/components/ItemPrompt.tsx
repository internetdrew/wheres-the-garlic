import { useHousehold } from '@/app/hooks/useHousehold';
import React from 'react';

const ItemPrompt = ({ householdId }: { householdId: string }) => {
  const { household, householdLoading, householdError } =
    useHousehold(householdId);

  if (householdLoading) {
    return <div className='w-48 h-6 mt-4 bg-neutral-800 animate-pulse' />;
  }

  if (householdError) {
    return <div>Error loading household. Please try again.</div>;
  }

  if (!household) {
    return <div>Household not found.</div>;
  }

  return (
    <p className='text-neutral-500 mt-4'>
      {household.items.length > 0
        ? `There are ${household.items.length} items on this list.`
        : 'Add an item to get started.'}
    </p>
  );
};

export default ItemPrompt;
