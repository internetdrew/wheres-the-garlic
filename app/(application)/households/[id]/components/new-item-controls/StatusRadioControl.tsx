import { Enums } from '@/database.types';
import React from 'react';

type ItemStatus = Enums<'ITEM_STATUS'>;
const DEFAULT_ITEM_STATUS: ItemStatus = 'FULL';
const StatusLabels: Record<ItemStatus, string> = {
  FULL: 'Full',
  HALFWAY: 'Halfway',
  LOW: 'Low',
  OUT: 'Out',
};

const getStatusClasses = (value: ItemStatus) => {
  const baseClasses =
    'flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors font-medium ring-1 ring-neutral-300 focus-within:ring-2 focus-within:ring-blue-500';

  const colorClasses = {
    FULL: '[&:has(input:checked)]:bg-emerald-500 [&:has(input:checked)]:border-emerald-600',
    HALFWAY:
      '[&:has(input:checked)]:bg-amber-500 [&:has(input:checked)]:border-amber-600',
    LOW: '[&:has(input:checked)]:bg-orange-400 [&:has(input:checked)]:border-orange-600',
    OUT: '[&:has(input:checked)]:bg-rose-500 [&:has(input:checked)]:border-rose-600',
  };

  return `${baseClasses} ${colorClasses[value]} hover:bg-neutral-100`;
};

const StatusRadioControl = () => {
  return (
    <fieldset className='mt-8'>
      <legend className='font-medium'>Current status</legend>
      <div className='grid grid-cols-2 gap-2 mt-1'>
        {Object.entries(StatusLabels).map(([value, label]) => (
          <label key={value} className={getStatusClasses(value as ItemStatus)}>
            <input
              type='radio'
              name='status'
              value={value}
              className='sr-only'
              required
              defaultChecked={value === DEFAULT_ITEM_STATUS}
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default StatusRadioControl;
