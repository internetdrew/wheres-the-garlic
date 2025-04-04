import MinusIcon from '@/app/icons/MinusIcon';
import PlusIcon from '@/app/icons/PlusIcon';
import React, { useState, useEffect } from 'react';

interface ItemQuantityControlProps {
  formKey?: number;
}

const ItemQuantityControl = ({ formKey }: ItemQuantityControlProps) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(0);
  }, [formKey]);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(0, prev - 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  return (
    <div className='flex flex-col gap-1 mt-8'>
      <label className='font-medium' htmlFor='quantity'>
        Quantity
      </label>
      <div className='flex items-center justify-between ring-1 ring-neutral-300 rounded-md'>
        <button
          type='button'
          onClick={handleDecrement}
          className='px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <MinusIcon className='size-4 text-neutral-600 hover:text-neutral-900 transition-colors' />
        </button>
        <input
          id='quantity'
          type='number'
          name='quantity'
          value={quantity}
          onChange={handleChange}
          className='w-14 text-center py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          min='0'
          max='100'
        />
        <button
          type='button'
          onClick={handleIncrement}
          className='px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer'
        >
          <PlusIcon className='size-4 text-neutral-600 hover:text-neutral-900 transition-colors' />
        </button>
      </div>
    </div>
  );
};

export default ItemQuantityControl;
