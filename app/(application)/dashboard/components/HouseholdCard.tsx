'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { HouseholdsByUserId } from '@/utils/supabase/queries';
import HouseholdCardMenu from './HouseholdCardMenu';
import { useUser } from '@/app/hooks/useUser';

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
  const { user } = useUser();

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
      className='relative ring-1 ring-neutral-300 rounded-md p-4 transition-colors hover:shadow-md'
    >
      <div className='flex items-center justify-between'>
        <Link href={`/households/${household.id}`} className='font-medium'>
          <span className='absolute inset-0' />
          {household.title}
        </Link>

        <HouseholdCardMenu
          onInviteClick={onInviteClick}
          onDeleteClick={onDeleteClick}
          creatorId={household.creator_id}
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
        <span>
          {household.creator_id === user?.id
            ? 'You'
            : household.creator.full_name}
        </span>
      </div>
    </li>
  );
};

export default HouseholdCard;
