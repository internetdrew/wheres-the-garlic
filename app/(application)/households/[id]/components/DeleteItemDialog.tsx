import { RefObject, useRef } from 'react';
import { Household } from '@/utils/supabase/queries';
import { useFormStatus } from 'react-dom';
import { deleteItem } from '@/app/actions/items';
import TrashIcon from '@/app/icons/TrashIcon';
import XMarkIcon from '@/app/icons/XMarkIcon';
import { useHousehold } from '@/app/hooks/useHousehold';

type Item = Household['items'][number];

interface DeleteItemDialogProps {
  ref: RefObject<HTMLDialogElement | null>;
  item: Item;
  onClose: () => void;
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

const DeleteItemDialog = ({ item, onClose, ref }: DeleteItemDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { mutateHousehold } = useHousehold(item.household_id);

  const handleSubmit = async () => {
    const result = await deleteItem(item.id);
    if (result.success) {
      ref.current?.close();
      onClose();
      mutateHousehold();
    }
  };

  const handleClose = () => {
    ref.current?.close();
    formRef.current?.reset();
    onClose();
  };

  return (
    <dialog
      ref={ref}
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
          <h2 className='text-lg font-semibold'>Delete {item?.name}</h2>
        </div>
        <p className='text-neutral-700'>
          Are you sure you want to delete <strong>{item?.name}</strong>? This
          action cannot be undone.
        </p>
        <SubmitButton />
      </form>
    </dialog>
  );
};

export default DeleteItemDialog;
