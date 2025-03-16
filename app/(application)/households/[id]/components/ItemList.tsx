'use client';

import { useState, useRef, useEffect } from 'react';
import { Household } from '@/utils/supabase/queries';
import ItemCard from './ItemCard';
import DeleteItemDialog from './DeleteItemDialog';

type Item = Household['items'][number];

interface ItemListProps {
  items: Item[];
  householdId: string;
}

const ItemList = ({ items, householdId }: ItemListProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const deleteItemDialogRef = useRef<HTMLDialogElement>(null);

  const handleDeleteClick = (item: Item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    if (selectedItem) {
      deleteItemDialogRef.current?.showModal();
    }
  }, [selectedItem]);

  const resetSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section className='mt-10 mb-28'>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {items.map(item => (
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
