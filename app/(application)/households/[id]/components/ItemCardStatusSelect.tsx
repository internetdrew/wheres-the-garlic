import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { Enums } from '@/database.types';

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

const statuses = Object.entries(statusDisplay).map(([value, label]) => ({
  value: value as ItemStatus,
  label,
}));

interface ItemCardStatusSelectProps {
  value: ItemStatus;
  onChange: (value: string) => void;
}

const ItemCardStatusSelect = ({
  value,
  onChange,
}: ItemCardStatusSelectProps) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className='relative'>
        <ListboxButton className='mt-2 text-neutral-600 flex items-center gap-2 hover:text-neutral-900 transition-colors group'>
          <span
            className={`inline-block w-2 h-2 rounded-full ${statusColors[value]} ${statusAnimations[value]}`}
          />
          <span>{statusDisplay[value]}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
            />
          </svg>
        </ListboxButton>
        <ListboxOptions className='absolute z-10 mt-1 w-40 bg-neutral-100 rounded-lg shadow-lg p-2 ring-1 ring-neutral-950/5'>
          {statuses.map(status => (
            <ListboxOption
              key={status.value}
              value={status.value}
              className={({ focus, selected }) =>
                `px-2 py-1.5 cursor-pointer flex items-center gap-2 rounded-sm ${
                  focus ? 'bg-neutral-200' : ''
                } ${selected ? 'text-neutral-900' : 'text-neutral-600'}`
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      statusColors[status.value]
                    }`}
                  />
                  <span>{status.label}</span>
                  {selected && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      className='size-4'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default ItemCardStatusSelect;
