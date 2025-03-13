'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import AddItemFormDialog from './AddItemFormDialog';
import { Household } from '@/utils/supabase/queries';

interface PageHeaderProps {
  household: Household;
}

const PageHeader = ({ household }: PageHeaderProps) => {
  const addItemDialogRef = useRef<HTMLDialogElement>(null);

  const triggerAddItemFormDialog = () => {
    addItemDialogRef.current?.showModal();
  };

  return (
    <header>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-xl font-bold lg:text-2xl'>
            {household?.title} List
          </h1>
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

      <AddItemFormDialog
        householdId={household.id}
        dialogRef={addItemDialogRef}
      />
    </header>
  );
};

export default PageHeader;
