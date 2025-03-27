'use client';

import React, { useRef } from 'react';
import ItemFormDialog from './ItemFormDialog';
import Link from 'next/link';
import ItemPrompt from './ItemPrompt';
import HouseholdCreatorDetails from './HouseholdCreatorDetails';
import HouseholdTitle from './HouseholdTitle';
import AddItemButton from './AddItemButton';

const PageHeader = ({ householdId }: { householdId: string }) => {
  const addItemDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <header className='sticky top-12 pt-6 pb-4 bg-neutral-950 isolation-auto z-20'>
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
      <ItemPrompt householdId={householdId} />
      <ItemFormDialog householdId={householdId} dialogRef={addItemDialogRef} />
    </header>
  );
};

export default PageHeader;
