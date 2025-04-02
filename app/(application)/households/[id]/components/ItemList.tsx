'use client';

import { useState, useRef, useEffect } from 'react';
import { Household } from '@/utils/supabase/queries';
import ItemCard from './ItemCard';
import DeleteItemDialog from './DeleteItemDialog';
import { useHousehold } from '@/app/hooks/useHousehold';

type Item = Household['items'][number];

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
      <section className='mt-10 mb-28'>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {filteredItems?.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              householdId={householdId}
              onDeleteClick={() => handleDeleteClick(item)}
            />
          ))}
        </ul>
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
