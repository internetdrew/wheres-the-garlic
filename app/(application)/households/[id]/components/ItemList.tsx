'use client';

import { Household } from '@/utils/supabase/queries';
import ItemCard from './ItemCard';

type Item = Household['items'][number];

interface ItemListProps {
  items: Item[];
  householdId: string;
}

const ItemList = ({ items, householdId }: ItemListProps) => {
  return (
    <>
      <section className='mt-10 mb-28'>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {items.map(item => (
            <ItemCard key={item.id} item={item} householdId={householdId} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ItemList;
