'use client';
import React, { useRef } from 'react';
import CreateHouseholdFormDialog from './CreateHouseholdFormDialog';
import JoinHouseholdForm from './JoinHouseholdForm';

type HouseholdFormTriggersProps = {
  householdCount: number;
};

const HouseholdFormTriggers = ({
  householdCount,
}: HouseholdFormTriggersProps) => {
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const joinDialogRef = useRef<HTMLDialogElement>(null);

  const triggerCreateHouseholdModal = () => {
    createDialogRef.current?.showModal();
  };

  // const triggerJoinHouseholdModal = () => {
  //   joinDialogRef.current?.showModal();
  // };

  return (
    <>
      <div className='flex items-center gap-4 text-sm mt-4'>
        <button
          onClick={triggerCreateHouseholdModal}
          disabled={householdCount >= 3}
          className={`bg-neutral-200 text-neutral-800 rounded-md p-2 font-medium hover:bg-neutral-300 transition-colors ${
            householdCount >= 3
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          aria-disabled={householdCount >= 3}
          aria-label={
            householdCount >= 3
              ? 'You have reached the maximum number of households'
              : 'Create a household'
          }
          title={
            householdCount >= 3
              ? "You've reached the maximum number of households"
              : 'Create a household'
          }
        >
          Create a household
        </button>
        {/* <button
          onClick={triggerJoinHouseholdModal}
          className='bg-neutral-200 text-neutral-800 rounded-md p-2 font-medium hover:bg-neutral-300 transition-colors cursor-pointer'
        >
          Join a household
        </button> */}
      </div>

      <CreateHouseholdFormDialog
        dialogRef={createDialogRef}
        onCloseBtnClick={() => createDialogRef.current?.close()}
      />

      <JoinHouseholdForm
        dialogRef={joinDialogRef}
        onCloseBtnClick={() => joinDialogRef.current?.close()}
      />
    </>
  );
};

export default HouseholdFormTriggers;
