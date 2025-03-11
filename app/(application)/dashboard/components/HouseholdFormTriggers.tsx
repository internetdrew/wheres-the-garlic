'use client';
import React, { useRef } from 'react';
import CreateHouseholdFormDialog from './CreateHouseholdFormDialog';
import JoinHouseholdForm from './JoinHouseholdForm';

const HouseholdFormTriggers = () => {
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const joinDialogRef = useRef<HTMLDialogElement>(null);

  const triggerCreateHouseholdModal = () => {
    createDialogRef.current?.showModal();
  };

  const triggerJoinHouseholdModal = () => {
    joinDialogRef.current?.showModal();
  };

  return (
    <>
      <div className='flex items-center gap-4 text-sm mt-4'>
        <button
          onClick={triggerCreateHouseholdModal}
          className='bg-neutral-200 text-neutral-800 rounded-md p-2 font-medium hover:bg-neutral-300 transition-colors cursor-pointer'
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

      <CreateHouseholdFormDialog
        dialogRef={createDialogRef}
        onCloseBtnClick={() => createDialogRef.current?.close()}
        onSubmit={() => {}}
      />

      <JoinHouseholdForm
        dialogRef={joinDialogRef}
        onCloseBtnClick={() => joinDialogRef.current?.close()}
        onSubmit={() => {}}
      />
    </>
  );
};

export default HouseholdFormTriggers;
