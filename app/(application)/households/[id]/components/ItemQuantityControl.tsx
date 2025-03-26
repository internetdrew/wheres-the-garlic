import React, { useState } from 'react';
import { updateItemQuantity } from '@/app/actions/items';
import { Household } from '@/utils/supabase/queries';
import MinusIcon from '@/app/icons/MinusIcon';
import PlusIcon from '@/app/icons/PlusIcon';
import { useHousehold } from '@/app/hooks/useHousehold';

type Item = Household['items'][number];

const ItemQuantityControl = ({
  item,
}: {
  item: Item & { household_id: string };
}) => {
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);
  const { mutateHousehold } = useHousehold(item.household_id);

  const handleQuantityUpdate = async (newQuantity: number) => {
    const previousQuantity = quantity;

    // Optimistically update the UI
    mutateHousehold(
      prev => {
        if (!prev) return prev;
        return {
          household: {
            ...prev.household,
            items: prev.household.items.map(i =>
              i.id === item.id ? { ...i, quantity: newQuantity } : i
            ),
          },
        };
      },
      { revalidate: false }
    );

    try {
      const result = await updateItemQuantity(item.id, newQuantity);

      if (!result.success) {
        // Revert on failure
        mutateHousehold(
          prev => {
            if (!prev) return prev;
            return {
              household: {
                ...prev.household,
                items: prev.household.items.map(i =>
                  i.id === item.id ? { ...i, quantity: previousQuantity } : i
                ),
              },
            };
          },
          { revalidate: false }
        );
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      // Revert on error
      mutateHousehold(
        prev => {
          if (!prev) return prev;
          return {
            household: {
              ...prev.household,
              items: prev.household.items.map(i =>
                i.id === item.id ? { ...i, quantity: previousQuantity } : i
              ),
            },
          };
        },
        { revalidate: false }
      );
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    handleQuantityUpdate(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    handleQuantityUpdate(newQuantity);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
      handleQuantityUpdate(value);
    }
  };

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

export default ItemQuantityControl;
