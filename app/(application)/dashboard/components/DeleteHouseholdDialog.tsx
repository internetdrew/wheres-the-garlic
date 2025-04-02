import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import TrashIcon from '@/app/icons/TrashIcon';
import XMarkIcon from '@/app/icons/XMarkIcon';
import { deleteHousehold } from '@/app/actions/households';
import { useHouseholdMemberships } from '@/app/hooks/useHouseholdMemberships';
import { HouseholdsByUserId } from '@/utils/supabase/queries';

interface DeleteHouseholdDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  chosenHousehold: HouseholdsByUserId[number]['household'] | null;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='mt-6 bg-red-600 text-white rounded-md py-2 px-4 font-medium transition-colors cursor-pointer w-fit ml-auto hover:bg-red-700 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
      aria-disabled={pending}
    >
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

const DeleteHouseholdDialog = ({
  dialogRef,
  chosenHousehold,
}: DeleteHouseholdDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutateMemberships } = useHouseholdMemberships();

  const handleSubmit = async () => {
    const result = await deleteHousehold(chosenHousehold?.id ?? '');

    if (result.success) {
      mutateMemberships();
      dialogRef.current?.close();
    } else {
      console.error(result.message);
    }
  };

  const handleClose = () => {
    dialogRef.current?.close();
    formRef.current?.reset();
  };

  return (
    <dialog
      ref={dialogRef}
      className='mx-auto my-auto max-w-md rounded-xl backdrop:bg-black/50 backdrop:opacity-50'
    >
      <form ref={formRef} action={handleSubmit} className='flex flex-col p-6'>
        <header className='flex justify-between items-center'>
          <TrashIcon className='size-5' />

          <button
            type='button'
            className='text-sm text-neutral-700 cursor-pointer'
            onClick={handleClose}
          >
            <XMarkIcon className='size-5' />
          </button>
        </header>

        <div className='flex justify-between items-center mt-4'>
          <h2 className='text-lg font-semibold'>
            Delete {chosenHousehold?.title}
          </h2>
        </div>
        <p className='text-neutral-700'>
          Are you sure you want to delete{' '}
          <strong>{chosenHousehold?.title}</strong>? This action cannot be
          undone and will remove all members from the household as well as
          delete all items.
        </p>
        <SubmitButton />
      </form>
    </dialog>
  );
};

export default DeleteHouseholdDialog;
