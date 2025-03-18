'use client';

import { formatDistance } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { HouseholdsByUserId } from '@/utils/supabase/queries';

type Household = HouseholdsByUserId[number]['household'];

interface HouseholdCardProps {
  household: Household;
}

const HouseholdCard = ({ household }: HouseholdCardProps) => {
  const formattedDate = formatDistance(
    new Date(household.latest_item[0]?.last_updated_at ?? household.created_at),
    new Date(),
    {
      addSuffix: true,
      includeSeconds: true,
    }
  );

  return (
    <li
      key={household.id}
      className='relative bg-neutral-200 text-neutral-900 rounded-xl p-4 hover:bg-neutral-300 transition-colors'
    >
      <Link href={`/households/${household.id}`} className='font-medium'>
        <span className='absolute inset-0' />
        {household.title}
      </Link>
      <p className='text-sm text-neutral-600'>Last updated {formattedDate}</p>
      <p className='text-sm text-neutral-600 mt-8'>Created by:</p>
      <div className='flex items-center gap-2 mt-1'>
        <Image
          src={household.creator.avatar_url}
          alt={household.creator.full_name}
          width={20}
          height={20}
          className='rounded-full'
        />
        <span>{household.creator.full_name}</span>
      </div>
    </li>
  );
};

export default HouseholdCard;
