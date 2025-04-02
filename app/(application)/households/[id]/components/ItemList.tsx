'use client';

import { useState, useRef, useEffect } from 'react';
import { Household } from '@/utils/supabase/queries';
import ItemCard from './ItemCard';
import DeleteItemDialog from './DeleteItemDialog';
import { useHousehold } from '@/app/hooks/useHousehold';
import { Enums } from '@/database.types';

type Item = Household['items'][number];
type ItemStatus = Enums<'ITEM_STATUS'>;

const statusColors: Record<ItemStatus, string> = {
  FULL: 'bg-emerald-500',
  HALFWAY: 'bg-amber-500',
  LOW: 'bg-orange-500',
  OUT: 'bg-rose-500',
};

const statusLabels: Record<ItemStatus, string> = {
  FULL: 'Full',
  HALFWAY: 'Halfway',
  LOW: 'Low',
  OUT: 'Out',
};

const statusOrder: ItemStatus[] = ['FULL', 'HALFWAY', 'LOW', 'OUT'];

const ItemList = ({
  householdId,
  searchQuery,
}: {
  householdId: string;
  searchQuery: string;
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const deleteItemDialogRef = useRef<HTMLDialogElement>(null);
  const { household, householdLoading, householdError } =
    useHousehold(householdId);

  useEffect(() => {
    if (selectedItem) {
      deleteItemDialogRef.current?.showModal();
    }
  }, [selectedItem]);

  const handleDeleteClick = (item: Item) => {
    setSelectedItem(item);
  };

  const resetSelectedItem = () => {
    setSelectedItem(null);
  };

  const filteredItems = household?.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsByStatus = filteredItems
    ?.filter(item => item.status !== null)
    .reduce((acc, item) => {
      const status = item.status!;
      acc[status] = acc[status] || [];
      acc[status].push(item);
      return acc;
    }, {} as Record<ItemStatus, Item[]>);

  const quantityItems =
    filteredItems?.filter(item => item.quantity !== null) || [];

  if (householdLoading) {
    return (
      <section className='mt-10'>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className='w-full h-36 bg-neutral-800 animate-pulse rounded-md'
            />
          ))}
        </ul>
      </section>
    );
  }

  if (householdError) {
    return <div>Error loading household. Please try again.</div>;
  }

  if (!household) {
    return <div>Household not found.</div>;
  }

  return (
    <>
      <section className='mt-10 mb-28 space-y-8'>
        {quantityItems.length > 0 && (
          <div className='space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-blue-500' />
              <h2 className='font-medium text-neutral-500'>Quantity Items</h2>
              <span className='text-sm text-neutral-600'>
                ({quantityItems.length})
              </span>
            </div>
            <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {quantityItems.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  householdId={householdId}
                  onDeleteClick={() => handleDeleteClick(item)}
                />
              ))}
            </ul>
          </div>
        )}

        {statusOrder.map(status => {
          const items = itemsByStatus?.[status] || [];
          if (items.length === 0) return null;

          return (
            <div key={status} className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-2 h-2 rounded-full ${statusColors[status]}`}
                />
                <h2 className='font-medium text-neutral-500'>
                  {statusLabels[status]}
                </h2>
                <span className='text-sm text-neutral-600'>
                  ({items.length})
                </span>
              </div>
              <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {items.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    householdId={householdId}
                    onDeleteClick={() => handleDeleteClick(item)}
                  />
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      {selectedItem && (
        <DeleteItemDialog
          ref={deleteItemDialogRef}
          item={selectedItem}
          onClose={resetSelectedItem}
        />
      )}
    </>
  );
};

export default ItemList;
