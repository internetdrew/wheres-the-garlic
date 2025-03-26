'use client';

import React, { useMemo } from 'react';
import { formatDistance } from 'date-fns';
import ItemNamePopover from './ItemNamePopover';
import ItemCardStatusSelect from './ItemCardStatusSelect';
import { Household } from '@/utils/supabase/queries';
import TrashIcon from '@/app/icons/TrashIcon';
import ItemQuantityControl from './ItemQuantityControl';

type Item = Household['items'][number];

interface ItemCardProps {
  item: Item;
  householdId: string;
  onDeleteClick: () => void;
}

const ItemCard = ({ item, householdId, onDeleteClick }: ItemCardProps) => {
  const formattedDate = useMemo(() => {
    return formatDistance(new Date(item.last_updated_at), new Date(), {
      addSuffix: true,
      includeSeconds: true,
    });
  }, [item.last_updated_at]);

  return (
    <li
      key={item.id}
      className='flex flex-col bg-neutral-100 p-6 rounded-xl text-neutral-900'
    >
      <header className='flex items-start justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-medium'>{item.name}</span>
            <ItemNamePopover item={item} />
          </div>
          {item?.status ? (
            <ItemCardStatusSelect
              status={item.status}
              item={item}
              householdId={householdId}
            />
          ) : (
            <ItemQuantityControl item={item} />
          )}
        </div>
        <button
          onClick={onDeleteClick}
          className='p-1 rounded-md cursor-pointer ring-1 ring-neutral-300 group transition-all hover:ring-red-600'
        >
          <TrashIcon className='size-4 text-red-600' />
        </button>
      </header>

      <div className='flex mt-auto text-sm text-neutral-600'>
        <span>
          {` Updated ${formattedDate} by ${item.last_updated_by.full_name}`}
        </span>
      </div>
    </li>
  );
};

export default ItemCard;
