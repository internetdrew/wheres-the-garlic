'use client';

import { formatDistance } from 'date-fns';
import { Enums } from '@/database.types';
import { useRef, useState, useEffect } from 'react';
import ItemFormDialog from './ItemFormDialog';
import { Household } from '@/utils/supabase/queries';

type ItemStatus = Enums<'ITEM_STATUS'>;
type Item = Household['items'][number];

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

interface ItemListProps {
  items: Item[];
  householdId: string;
}

const ItemList = ({ items, householdId }: ItemListProps) => {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [formattedDates, setFormattedDates] = useState<Record<number, string>>(
    {}
  );

  useEffect(() => {
    const now = new Date();
    const formatted: Record<number, string> = {};

    items.forEach(item => {
      formatted[item.id] = formatDistance(new Date(item.last_updated_at), now, {
        addSuffix: true,
        includeSeconds: true,
      });
    });

    setFormattedDates(formatted);
  }, [items]);

  const handleUpdateItem = (item: Item) => {
    setSelectedItem(item);
    editDialogRef.current?.showModal();
  };

  return (
    <>
      <section className='mt-10'>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {items.map(item => (
            <li
              key={item.id}
              className='flex flex-col bg-neutral-100 p-6 rounded-xl text-neutral-900'
            >
              <header className='flex items-start justify-between mb-6'>
                <div>
                  <span className='text-lg font-medium'>{item.name}</span>
                  <span className='text-neutral-600 flex items-center gap-2'>
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        statusColors[item.status]
                      } ${statusAnimations[item.status]}`}
                    />
                    {statusDisplay[item.status]}
                  </span>
                </div>
                <button
                  className='text-sm text-neutral-600 ring-1 ring-neutral-300 rounded-md py-2 px-4 cursor-pointer hover:ring-neutral-400 transition-colors'
                  onClick={() => handleUpdateItem(item)}
                >
                  Update
                </button>
              </header>

              <div className='flex mt-auto text-sm text-neutral-600'>
                <span>
                  {` Updated ${formattedDates[item.id] ?? 'just now'} by ${
                    item.last_updated_by.full_name
                  }`}
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
