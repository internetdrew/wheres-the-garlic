'use client';

import { formatDistance } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { HouseholdsByUserId } from '@/utils/supabase/queries';
import HouseholdCardMenu from './HouseholdCardMenu';

type Household = HouseholdsByUserId[number]['household'];

interface HouseholdCardProps {
  household: Household;
  onInviteClick: () => void;
  onDeleteClick: () => void;
}

const HouseholdCard = ({
  household,
  onInviteClick,
  onDeleteClick,
}: HouseholdCardProps) => {
  const formattedDate = formatDistance(
    new Date(
      household.latest_item[0]?.last_updated_at ?? household?.created_at
    ),
    new Date(),
    {
      addSuffix: true,
      includeSeconds: true,
    }
  );

  return (
    <li
      key={household.id}
      className='relative ring-1 ring-neutral-300 rounded-xl p-4 transition-colors'
    >
      <div className='flex items-center justify-between'>
        <Link href={`/households/${household.id}`} className='font-medium'>
          <span className='absolute inset-0' />
          {household.title}
        </Link>

        <HouseholdCardMenu
          onInviteClick={onInviteClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
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
