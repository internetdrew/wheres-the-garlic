'use client';

import { createHousehold, editHousehold } from '@/app/actions/households';
import React, { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Household } from '@/utils/supabase/queries';

interface HouseholdFormDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  household?: Household;
  mode: 'create' | 'edit';
}

const initialState = {
  message: '',
  success: false,
};

const SubmitButton = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='bg-neutral-900 text-neutral-200 rounded-md py-2 px-4 font-medium transition-colors cursor-pointer w-fit ml-auto hover:bg-neutral-950 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
      aria-disabled={pending}
    >
      {mode === 'create' ? 'Create' : 'Update'}
    </button>
  );
};

const HouseholdFormDialog = ({
  dialogRef,
  household,
  mode,
}: HouseholdFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result =
        mode === 'create'
          ? await createHousehold(formData)
          : await editHousehold(household!.id, formData);

      if (result?.success) {
        dialogRef.current?.close();
      }
      return result;
    },
    initialState
  );

  const handleClose = () => {
    dialogRef.current?.close();
    formRef.current?.reset();
  };

  return (
    <dialog
      ref={dialogRef}
      className='mx-auto my-auto max-w-sm rounded-xl backdrop:bg-black/50 backdrop:opacity-50'
    >
      <form ref={formRef} action={formAction} className='flex flex-col p-6'>
        <header className='flex justify-between items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path d='M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z' />
            <path
              fillRule='evenodd'
              d='M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z'
              clipRule='evenodd'
            />
          </svg>
          <button
            type='button'
            className='text-sm text-neutral-700 cursor-pointer'
            onClick={handleClose}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </header>

        <div className='flex justify-between items-center mt-6'>
          <h2 className='text-lg font-semibold'>
            {mode === 'create' ? 'Create a household' : 'Edit household'}
          </h2>
        </div>
        <p className='text-neutral-700'>
          {mode === 'create'
            ? 'Create a household to get started. You can add members later.'
            : 'Update your household details below.'}
        </p>
        <div className='flex flex-col my-7 gap-2'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='household-name' className='font-medium'>
              Household name
            </label>
            <input
              name='household-name'
              type='text'
              id='household-name'
              className='block rounded-md py-2 px-3 ring-1 ring-neutral-300'
              placeholder='Ex: Our House'
              maxLength={25}
              required
              autoFocus
              defaultValue={household?.title ?? ''}
            />
            <p aria-live='polite' className='sr-only' role='status'>
              {state?.message}
            </p>
          </div>
        </div>
        <SubmitButton mode={mode} />
      </form>
    </dialog>
  );
};

export default HouseholdFormDialog;
