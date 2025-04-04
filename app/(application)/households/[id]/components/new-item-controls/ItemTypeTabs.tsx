import React, { useState, useEffect } from 'react';
import StatusRadioControl from './StatusRadioControl';
import ItemQuantityControl from './ItemQuantityControl';

interface ItemTypeTabsProps {
  formKey: number;
}

const ItemTypeTabs = ({ formKey }: ItemTypeTabsProps) => {
  const [selectedItemType, setSelectedItemType] = useState<
    'status' | 'quantity'
  >('status');

  useEffect(() => {
    setSelectedItemType('status');
  }, [formKey]);

  return (
    <div className='flex flex-col gap-2 mt-8'>
      <p className='text-neutral-700'>Track by status or exact quantity</p>
      <div className='flex items-center gap-1 p-1 bg-neutral-100 rounded-lg'>
        <button
          type='button'
          className={`flex-1 px-4 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            selectedItemType === 'status'
              ? 'bg-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setSelectedItemType('status')}
        >
          Status
        </button>
        <button
          type='button'
          className={`flex-1 px-4 py-1 rounded-md font-medium transition-colors cursor-pointer ${
            selectedItemType === 'quantity'
              ? 'bg-white shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => setSelectedItemType('quantity')}
        >
          Quantity
        </button>
      </div>

      <input type='hidden' name='trackBy' value={selectedItemType} />

      {selectedItemType === 'status' ? (
        <StatusRadioControl />
      ) : (
        <ItemQuantityControl formKey={formKey} />
      )}
    </div>
  );
};

export default ItemTypeTabs;
