import React from 'react';
import ItemTypeTabs from './new-item-controls/ItemTypeTabs';
import { useFormStatus } from 'react-dom';
import { Household } from '@/utils/supabase/queries';

type Item = Household['items'][number];

interface NewItemFormProps {
  formRef: React.RefObject<HTMLFormElement | null>;
  formTabKey: number;
  duplicateItem: Item | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  itemName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: {
    message: string;
    success: boolean;
  };
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='bg-neutral-900 text-neutral-200 rounded-md py-2 px-4 font-medium transition-colors cursor-pointer w-fit ml-auto hover:bg-neutral-950 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
      aria-disabled={pending}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
};

const NewItemForm = ({
  formRef,
  formTabKey,
  duplicateItem,
  onClose,
  onSubmit,
  itemName,
  handleNameChange,
  state,
}: NewItemFormProps) => {
  return (
    <form ref={formRef} onSubmit={onSubmit} className='flex flex-col p-6'>
      <header className='flex justify-between items-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-6'
        >
          <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
          <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
        </svg>

        <button
          type='button'
          className='text-sm text-neutral-700 cursor-pointer'
          onClick={onClose}
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
        <h2 className='text-lg font-semibold'>Add an item</h2>
      </div>
      <p className='text-neutral-700'>
        You and everyone in your household will be able to see it.
      </p>
      <div className='flex flex-col my-7 gap-2'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-medium'>
            Item name
          </label>
          <input
            name='name'
            type='text'
            id='name'
            autoFocus
            value={itemName}
            onChange={handleNameChange}
            className='block rounded-md py-2 px-3 ring-1 ring-neutral-300'
            placeholder='Ex: Toilet paper'
            maxLength={25}
            required
          />
          {duplicateItem && (
            <small className='text-amber-600 mt-1'>
              An item with this name already exists
            </small>
          )}
          <ItemTypeTabs key={formTabKey} />
          <p aria-live='polite' className='sr-only' role='status'>
            {state?.message}
          </p>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
};

export default NewItemForm;
