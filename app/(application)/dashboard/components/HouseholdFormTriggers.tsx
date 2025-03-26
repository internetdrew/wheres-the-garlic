'use client';
import React, { useRef } from 'react';
import CreateHouseholdFormDialog from './CreateHouseholdFormDialog';
import JoinHouseholdForm from './JoinHouseholdForm';
import { useHouseholdMemberships } from '@/app/hooks/useHouseholdMemberships';

const LoadingButtons = () => {
  return (
    <div className='flex items-center gap-4 text-sm mt-4'>
      <div className='h-9 w-32 bg-neutral-800 rounded-md animate-pulse'></div>
      <div className='h-9 w-32 bg-neutral-800 rounded-md animate-pulse'></div>
    </div>
  );
};

const HouseholdFormTriggers = () => {
  const { memberships, membershipsLoading, membershipsError } =
    useHouseholdMemberships();

  const createDialogRef = useRef<HTMLDialogElement>(null);
  const joinDialogRef = useRef<HTMLDialogElement>(null);

  const triggerCreateHouseholdModal = () => {
    createDialogRef.current?.showModal();
  };

  const triggerJoinHouseholdModal = () => {
    joinDialogRef.current?.showModal();
  };

  if (membershipsLoading) {
    return <LoadingButtons />;
  }

  if (membershipsError) {
    return <div>Error loading households</div>;
  }

  return (
    <>
      <div className='flex items-center gap-4 text-sm mt-4'>
        <button
          onClick={triggerCreateHouseholdModal}
          disabled={memberships?.length >= 3}
          className={`bg-neutral-200 text-neutral-800 rounded-md p-2 font-medium hover:bg-neutral-300 transition-colors ${
            memberships?.length >= 3
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          aria-disabled={memberships?.length >= 3}
          aria-label={
            memberships?.length >= 3
              ? 'You have reached the maximum number of households'
              : 'Create a household'
          }
          title={
            memberships?.length >= 3
              ? "You've reached the maximum number of households"
              : 'Create a household'
          }
        >
          Create a household
        </button>
        <button
          onClick={triggerJoinHouseholdModal}
          className='bg-neutral-200 text-neutral-800 rounded-md p-2 font-medium hover:bg-neutral-300 transition-colors cursor-pointer'
        >
          Join a household
        </button>
      </div>

      <CreateHouseholdFormDialog dialogRef={createDialogRef} />

      <JoinHouseholdForm dialogRef={joinDialogRef} />
    </>
  );
};

export default HouseholdFormTriggers;
