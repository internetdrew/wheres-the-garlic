'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import ItemFormDialog from './ItemFormDialog';
import Link from 'next/link';
import ItemPrompt from './ItemPrompt';
import HouseholdCreatorDetails from './HouseholdCreatorDetails';
import HouseholdTitle from './HouseholdTitle';
import AddItemButton from './AddItemButton';
import XMarkIcon from '@/app/icons/XMarkIcon';

const PageHeader = ({
  householdId,
  onSearch,
}: {
  householdId: string;
  onSearch: (query: string) => void;
}) => {
  const addItemDialogRef = useRef<HTMLDialogElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <header className='sticky top-14 pt-6 pb-4 bg-neutral-100 isolation-auto z-20 w-full'>
      <div className='flex items-center gap-1 text-pink-600 relative w-fit'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-5'
        >
          <path
            fillRule='evenodd'
            d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z'
            clipRule='evenodd'
          />
        </svg>
        <Link href='/dashboard'>
          <span className='absolute inset-0' />
          Back to Dashboard
        </Link>
      </div>
      <div className='flex items-start justify-between mt-4'>
        <div>
          <HouseholdTitle householdId={householdId} />
          <HouseholdCreatorDetails householdId={householdId} />
        </div>
        <AddItemButton householdId={householdId} dialogRef={addItemDialogRef} />
      </div>
      <div className='mt-4 relative ml-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
        <input
          type='text'
          placeholder='Search items...'
          value={searchValue}
          className='w-full px-4 py-2 ring-1 ring-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-600'
          onChange={handleSearchChange}
        />
        {searchValue && (
          <button
            onClick={handleClearSearch}
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
          >
            <XMarkIcon className='size-5' />
          </button>
        )}
      </div>
      <ItemPrompt householdId={householdId} />
      <ItemFormDialog householdId={householdId} dialogRef={addItemDialogRef} />
    </header>
  );
};

export default PageHeader;
