import { Household } from '@/utils/supabase/queries';
import XMarkIcon from '@/app/icons/XMarkIcon';

type Item = Household['items'][number];

interface DuplicateItemDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  duplicateItem: Item;
  onConfirm: () => void;
  onCancel: () => void;
}

const DuplicateItemDialog = ({
  dialogRef,
  duplicateItem,
  onConfirm,
  onCancel,
}: DuplicateItemDialogProps) => {
  const handleClose = () => {
    dialogRef.current?.close();
    onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      className='mx-auto my-auto max-w-sm rounded-xl backdrop:bg-black/50 backdrop:opacity-50'
    >
      <form className='flex flex-col p-6'>
        <header className='flex justify-between items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6 text-amber-500'
          >
            <path
              fillRule='evenodd'
              d='M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
              clipRule='evenodd'
            />
          </svg>

          <button
            type='button'
            className='text-sm text-neutral-700 cursor-pointer'
            onClick={handleClose}
          >
            <XMarkIcon className='size-6' />
          </button>
        </header>

        <div className='mt-6'>
          <h2 className='text-lg font-semibold'>Item Already Exists</h2>
          <p className='text-neutral-700 mt-2'>
            An item named &quot;{duplicateItem.name}&quot; already exists in
            this household. Would you like to add it anyway?
          </p>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button
            autoFocus
            type='button'
            onClick={handleClose}
            className='text-sm ring-1 ring-neutral-300 px-4 py-2 rounded-md font-medium cursor-pointer hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='text-sm bg-neutral-900 text-neutral-200 px-4 py-2 rounded-md font-medium cursor-pointer hover:bg-neutral-950'
          >
            Add Anyway
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default DuplicateItemDialog;
