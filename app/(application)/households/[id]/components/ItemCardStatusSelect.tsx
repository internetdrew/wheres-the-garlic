import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { Enums } from '@/database.types';
import { useHousehold } from '@/app/hooks/useHousehold';
import { updateItemStatus } from '@/app/actions/items';
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

const statuses = Object.entries(statusDisplay).map(([value, label]) => ({
  value: value as ItemStatus,
  label,
}));

interface ItemCardStatusSelectProps {
  status: ItemStatus;
  item: Item;
  householdId: string;
}

const ItemCardStatusSelect = ({
  status,
  item,
  householdId,
}: ItemCardStatusSelectProps) => {
  const { mutateHousehold } = useHousehold(householdId);

  const handleStatusChange = async (newStatus: ItemStatus) => {
    const previousStatus = item.status;

    mutateHousehold(
      prev => {
        if (!prev) return prev;
        return {
          household: {
            ...prev.household,
            items: prev.household.items.map(i =>
              i.id === item.id ? { ...i, status: newStatus } : i
            ),
          },
        };
      },
      { revalidate: false }
    );

    try {
      const result = await updateItemStatus({
        itemId: item.id,
        status: newStatus,
        householdId: householdId,
      });

      if (!result.success) {
        mutateHousehold(
          prev => {
            if (!prev) return prev;
            return {
              household: {
                ...prev.household,
                items: prev.household.items.map(i =>
                  i.id === item.id ? { ...i, status: previousStatus } : i
                ),
              },
            };
          },
          { revalidate: false }
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      mutateHousehold(
        prev => {
          if (!prev) return prev;
          return {
            household: {
              ...prev.household,
              items: prev.household.items.map(i =>
                i.id === item.id ? { ...i, status: previousStatus } : i
              ),
            },
          };
        },
        { revalidate: false }
      );
    }
  };

  return (
    <Listbox value={status} onChange={handleStatusChange}>
      <div className='relative'>
        <ListboxButton className='mt-2 cursor-pointer text-neutral-600 flex items-center gap-2 hover:text-neutral-900 transition-colors group'>
          <span
            className={`inline-block w-2 h-2 rounded-full ${statusColors[status]} ${statusAnimations[status]}`}
          />
          <span>{statusDisplay[status]}</span>
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
        <ListboxOptions className='absolute z-10 mt-1 w-32 bg-neutral-100 rounded-lg shadow-lg p-2 ring-1 ring-neutral-950/5'>
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
