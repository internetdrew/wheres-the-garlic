'use client';

import { useRef } from 'react';
import { updateItemName } from '@/app/actions/items';
import { Household } from '@/utils/supabase/queries';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useFormStatus } from 'react-dom';

type Item = Household['items'][number];

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className='bg-neutral-900 text-neutral-50 font-medium px-2 py-1 rounded-md cursor-pointer hover:bg-neutral-800 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed'
      aria-disabled={pending}
    >
      Save
    </button>
  );
};

interface ItemNamePopoverProps {
  item: Item;
}

const ItemNamePopover = ({ item }: ItemNamePopoverProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Popover className='relative'>
      <PopoverButton className='text-neutral-600 hover:text-neutral-900'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
          />
        </svg>
      </PopoverButton>

      <PopoverPanel className='absolute z-10 mt-2 -translate-x-1/2 left-1/2'>
        {({ close }) => (
          <form
            ref={formRef}
            action={async formData => {
              const result = await updateItemName(item.id, formData);
              if (result?.success) {
                close();
                formRef.current?.reset();
              }
            }}
            className='bg-neutral-100 p-6 rounded-md shadow-lg ring-1 ring-neutral-950/5'
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='name' className='font-medium'>
                Edit item name
              </label>
              <input
                type='text'
                name='name'
                defaultValue={item.name}
                className='rounded-sm px-2 py-1 ring-1 ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400'
                placeholder='Item name'
                maxLength={25}
                required
                autoFocus
              />
              <div className='flex justify-end mt-4 gap-2'>
                <PopoverButton
                  className='px-2 py-1 text-neutral-600 hover:text-neutral-900 cursor-pointer'
                  onClick={() => close()}
                >
                  Cancel
                </PopoverButton>
                <SubmitButton />
              </div>
            </div>
          </form>
        )}
      </PopoverPanel>
    </Popover>
  );
};

export default ItemNamePopover;
