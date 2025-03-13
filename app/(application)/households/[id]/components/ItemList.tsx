'use client';

import { formatDistance } from 'date-fns';
import { Enums } from '@/database.types';
import { useRef, useState } from 'react';
import ItemFormDialog from './ItemFormDialog';

type ItemStatus = Enums<'ITEM_STATUS'>;

const statusDisplay: Record<ItemStatus, string> = {
  FULL: 'Full',
  HALFWAY: 'Halfway',
  LOW: 'Low',
  OUT: 'Out',
};

const statusColors: Record<ItemStatus, string> = {
  FULL: 'bg-emerald-500',
  HALFWAY: 'bg-amber-500',
  LOW: 'bg-orange-500',
  OUT: 'bg-rose-500',
};

const statusAnimations: Record<ItemStatus, string> = {
  FULL: '',
  HALFWAY: '',
  LOW: 'pulse-low',
  OUT: 'pulse-out',
};

interface Item {
  id: number;
  name: string;
  status: ItemStatus;
  notes: string | null;
  last_updated_at: string;
  last_updated_by: {
    full_name: string;
    avatar_url: string;
  };
}

interface ItemListProps {
  items: Item[];
  householdId: string;
}

const ItemList = ({ items, householdId }: ItemListProps) => {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleUpdateItem = (item: Item) => {
    setSelectedItem(item);
    editDialogRef.current?.showModal();
  };

  return (
    <>
      <section className='mt-10'>
        <p className='text-neutral-500'>
          There are {items.length} items being tracked in this household.
        </p>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {items.map(item => (
            <li
              key={item.id}
              className='flex flex-col gap-2 bg-neutral-200 p-6 rounded-lg text-neutral-900'
            >
              <div className='flex items-center justify-between'>
                <span className='text-lg font-medium'>{item.name}</span>
                <button
                  className='text-sm text-neutral-600 ring-1 ring-neutral-300 rounded-md py-2 px-4 cursor-pointer hover:ring-neutral-400 transition-colors'
                  onClick={() => handleUpdateItem(item)}
                >
                  Update
                </button>
              </div>
              <span className='text-neutral-600 flex items-center gap-2'>
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    statusColors[item.status]
                  } ${statusAnimations[item.status]}`}
                />
                {statusDisplay[item.status]}
              </span>
              <div className='flex flex-col mt-2 text-sm text-neutral-600'>
                <span>Last updated by:</span>
                <span>
                  {item.last_updated_by.full_name}{' '}
                  {formatDistance(item.last_updated_at, new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ItemFormDialog
        householdId={householdId}
        dialogRef={editDialogRef}
        mode='edit'
        item={
          selectedItem
            ? {
                id: selectedItem.id.toString(),
                name: selectedItem.name,
                status: selectedItem.status,
                notes: selectedItem.notes,
              }
            : undefined
        }
      />
    </>
  );
};

export default ItemList;
