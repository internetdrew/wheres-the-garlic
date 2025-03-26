import React from 'react';
import { useHousehold } from '@/app/hooks/useHousehold';

const AddItemButton = ({
  householdId,
  dialogRef,
}: {
  householdId: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) => {
  const triggerAddItemFormDialog = () => {
    dialogRef.current?.showModal();
  };

  const { household, householdLoading, householdError } =
    useHousehold(householdId);

  if (householdLoading) {
    return (
      <div className='w-24 h-10 bg-neutral-800 rounded-md animate-pulse' />
    );
  }

  if (householdError) {
    return <div>Error loading household. Please try again.</div>;
  }

  if (!household) {
    return <div>Household not found.</div>;
  }

  return (
    <button
      className='text-sm bg-neutral-200 px-4 py-2 rounded-md font-medium text-neutral-900 cursor-pointer'
      onClick={triggerAddItemFormDialog}
    >
      Add Item
    </button>
  );
};

export default AddItemButton;
