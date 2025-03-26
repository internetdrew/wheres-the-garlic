import React, { useEffect, useRef, useState } from 'react';
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
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    setQuantity(item?.quantity ?? 0);
  }, [item.quantity]);

  const handleQuantityUpdate = (newQuantity: number) => {
    setQuantity(newQuantity);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const result = await updateItemQuantity(item.id, newQuantity);
        if (!result.success) {
          setQuantity(item.quantity ?? 0);
          console.error('Failed to update quantity');
        } else {
          mutateHousehold();
        }
      } catch (error) {
        setQuantity(item.quantity ?? 0);
        console.error('Failed to update quantity:', error);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    handleQuantityUpdate(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    handleQuantityUpdate(newQuantity);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
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
