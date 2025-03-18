'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { formatDistance } from 'date-fns';
import ItemNamePopover from './ItemNamePopover';
import ItemCardStatusSelect from './ItemCardStatusSelect';
import { Household } from '@/utils/supabase/queries';
import { updateItemStatus, updateItemQuantity } from '@/app/actions/items';
import { Enums } from '@/database.types';
import TrashIcon from '@/app/icons/TrashIcon';
import PlusIcon from '@/app/icons/PlusIcon';
import MinusIcon from '@/app/icons/MinusIcon';
import { useDebouncedCallback } from 'use-debounce';

type ItemStatus = Enums<'ITEM_STATUS'>;
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

  const handleStatusChange = async (item: Item, newStatus: ItemStatus) => {
    try {
      const result = await updateItemStatus({
        itemId: item.id,
        status: newStatus,
        householdId: householdId,
      });

      if (result.success) {
        // Toast will go here.
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

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
              value={item.status}
              onChange={newStatus =>
                handleStatusChange(item, newStatus as ItemStatus)
              }
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

const ItemQuantityControl = ({ item }: { item: Item }) => {
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);

  const debouncedApiCall = useDebouncedCallback(
    async (newQuantity: number) => {
      try {
        await updateItemQuantity(item.id, newQuantity);
      } catch (error) {
        setQuantity(item?.quantity ?? 0);
        console.error('Failed to update quantity:', error);
      }
    },
    500,
    // Optional configuration
    { maxWait: 2000 } // Force update after 2 seconds even if user is still making changes
  );

  const handleIncrement = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      debouncedApiCall(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity(prev => {
      const newQuantity = Math.max(0, prev - 1);
      debouncedApiCall(newQuantity);
      return newQuantity;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
      debouncedApiCall(value);
    }
  };

  useEffect(() => {
    return () => {
      debouncedApiCall.flush();
    };
  }, [debouncedApiCall]);

  return (
    <div className='flex items-center gap-2 mt-1'>
      <div className='flex items-center justify-between ring-1 ring-neutral-300 rounded-md'>
        <button
          type='button'
          onClick={handleDecrement}
          className='px-2 py-1 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <MinusIcon className='size-4' />
        </button>
        <input
          type='number'
          value={quantity}
          onChange={handleChange}
          className='w-12 text-center py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          min='0'
          max='100'
        />
        <button
          type='button'
          onClick={handleIncrement}
          className='px-2 py-1 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <PlusIcon className='size-4' />
        </button>
      </div>
    </div>
  );
};
