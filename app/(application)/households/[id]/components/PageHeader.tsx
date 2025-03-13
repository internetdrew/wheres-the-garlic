'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import ItemFormDialog from './ItemFormDialog';
import { Household } from '@/utils/supabase/queries';
import Link from 'next/link';
import HouseholdFormDialog from '@/app/(application)/dashboard/components/HouseholdFormDialog';

interface PageHeaderProps {
  household: Household;
}

const PageHeader = ({ household }: PageHeaderProps) => {
  const addItemDialogRef = useRef<HTMLDialogElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const triggerAddItemFormDialog = () => {
    addItemDialogRef.current?.showModal();
  };

  const triggerEditDialog = () => {
    editDialogRef.current?.showModal();
  };

  return (
    <header className='sticky top-12 pt-6 pb-4 z-10 bg-neutral-950'>
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
          <div className='flex items-center gap-2'>
            <h1 className='text-xl font-bold lg:text-2xl'>
              {household?.title}
            </h1>
            <button
              className='text-xs px-4 py-1 rounded-md font-medium ring-1 ring-neutral-700 cursor-pointer'
              onClick={triggerEditDialog}
            >
              Edit
            </button>
          </div>
          <div className='flex flex-col mt-1 text-neutral-500 sm:flex-row sm:items-center sm:gap-2'>
            <span>Created by</span>
            <span className='flex items-center gap-1'>
              <Image
                src={household.creator.avatar_url}
                alt={household.creator.full_name}
                width={20}
                height={20}
                className='rounded-full'
              />
              {household?.creator.full_name}
            </span>
          </div>
        </div>

        <button
          className='text-sm bg-neutral-200 px-4 py-2 rounded-md font-medium text-neutral-900 cursor-pointer'
          onClick={triggerAddItemFormDialog}
        >
          Add Item
        </button>
      </div>

      <ItemFormDialog
        householdId={household.id}
        dialogRef={addItemDialogRef}
        mode='create'
      />
      <HouseholdFormDialog
        dialogRef={editDialogRef}
        mode='edit'
        household={household}
      />
    </header>
  );
};

export default PageHeader;
