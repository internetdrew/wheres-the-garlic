'use client';

import { useActionState, useRef, useState } from 'react';
import { addItem } from '@/app/actions/items';
import { Enums } from '@/database.types';
import { useFormStatus } from 'react-dom';
import PlusIcon from '@/app/icons/PlusIcon';
import MinusIcon from '@/app/icons/MinusIcon';

type ItemStatus = Enums<'ITEM_STATUS'>;
const DEFAULT_ITEM_STATUS: ItemStatus = 'FULL';

const getStatusClasses = (value: ItemStatus) => {
  const baseClasses =
    'flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors font-medium ring-1 ring-neutral-300 focus-within:ring-2 focus-within:ring-blue-500';

  const colorClasses = {
    FULL: '[&:has(input:checked)]:bg-emerald-500 [&:has(input:checked)]:border-emerald-600',
    HALFWAY:
      '[&:has(input:checked)]:bg-amber-500 [&:has(input:checked)]:border-amber-600',
    LOW: '[&:has(input:checked)]:bg-orange-400 [&:has(input:checked)]:border-orange-600',
    OUT: '[&:has(input:checked)]:bg-rose-500 [&:has(input:checked)]:border-rose-600',
  };

  return `${baseClasses} ${colorClasses[value]} hover:bg-neutral-100`;
};

const StatusLabels: Record<ItemStatus, string> = {
  FULL: 'Full',
  HALFWAY: 'Halfway',
  LOW: 'Low',
  OUT: 'Out',
};

interface ItemFormDialogProps {
  householdId: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

const initialState = {
  message: '',
  success: false,
};

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

const ItemFormDialog = ({ householdId, dialogRef }: ItemFormDialogProps) => {
  const [formTabKey, setFormTabKey] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    async (_state: typeof initialState, formData: FormData) => {
      const result = await addItem(householdId, formData);

      if (result?.success) {
        dialogRef.current?.close();
        formRef.current?.reset();
        setFormTabKey(prev => prev + 1);
      }
      return result;
    },
    initialState
  );

  const handleClose = () => {
    dialogRef.current?.close();
    formRef.current?.reset();
    setFormTabKey(prev => prev + 1);
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
            <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
            <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
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
              className='block rounded-md py-2 px-3 ring-1 ring-neutral-300'
              placeholder='Ex: Toilet paper'
              maxLength={25}
              required
            />
            <ItemTypeTabs key={formTabKey} />
            <p aria-live='polite' className='sr-only' role='status'>
              {state?.message}
            </p>
          </div>
        </div>
        <SubmitButton />
      </form>
    </dialog>
  );
};

export default ItemFormDialog;

const StatusRadioControl = () => {
  return (
    <fieldset className='mt-8'>
      <legend className='font-medium'>Current status</legend>
      <div className='grid grid-cols-2 gap-2 mt-1'>
        {Object.entries(StatusLabels).map(([value, label]) => (
          <label key={value} className={getStatusClasses(value as ItemStatus)}>
            <input
              type='radio'
              name='status'
              value={value}
              className='sr-only'
              required
              defaultChecked={value === DEFAULT_ITEM_STATUS}
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

const ItemTypeTabs = () => {
  const [selectedItemType, setSelectedItemType] = useState<
    'status' | 'quantity'
  >('status');
  return (
    <div className='flex flex-col gap-2 mt-8'>
      <p className='text-neutral-700'>Track by status or exact quantity</p>
      <div className='flex items-center gap-1 p-1 bg-neutral-100 rounded-lg'>
        <button
          type='button'
          className={`flex-1 px-4 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            selectedItemType === 'status'
              ? 'bg-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setSelectedItemType('status')}
        >
          Status
        </button>
        <button
          type='button'
          className={`flex-1 px-4 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            selectedItemType === 'quantity'
              ? 'bg-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setSelectedItemType('quantity')}
        >
          Quantity
        </button>
      </div>

      <input type='hidden' name='trackBy' value={selectedItemType} />

      {selectedItemType === 'status' ? (
        <StatusRadioControl />
      ) : (
        <ItemQuantityControl />
      )}
    </div>
  );
};

const ItemQuantityControl = () => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(0, prev - 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  return (
    <div className='flex flex-col gap-1 mt-8'>
      <label className='font-medium' htmlFor='quantity'>
        Quantity
      </label>
      <div className='flex items-center justify-between ring-1 ring-neutral-300 rounded-md'>
        <button
          type='button'
          onClick={handleDecrement}
          className='px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <MinusIcon className='size-4 text-neutral-600 hover:text-neutral-900 transition-colors' />
        </button>
        <input
          id='quantity'
          type='number'
          name='quantity'
          value={quantity}
          onChange={handleChange}
          className='w-14 text-center py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          min='0'
          max='100'
        />
        <button
          type='button'
          onClick={handleIncrement}
          className='px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <PlusIcon className='size-4 text-neutral-600 hover:text-neutral-900 transition-colors' />
        </button>
      </div>
    </div>
  );
};
