'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BellIcon } from '@/app/icons/BellIcon';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { usePendingMemberships } from '@/app/hooks/usePendingMemberships';
import { PendingMemberships } from '@/utils/supabase/queries';
import Image from 'next/image';

const PendingMembersPing = () => {
  return (
    <span className='absolute top-0 right-0.75 flex size-1.5 lg:size-2'>
      <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75'></span>
      <span className='relative inline-flex size-1.5 rounded-full bg-red-500 lg:size-2'></span>
    </span>
  );
};

const PendingMemberCard = ({
  membership,
}: {
  membership: PendingMemberships[number];
}) => {
  return (
    <li
      key={membership.id}
      className='flex items-start gap-2 text-neutral-200 flex-1 w-52 py-4'
    >
      <Image
        src={membership.member.avatar_url}
        alt={membership.member.full_name}
        width={20}
        height={20}
        className='rounded-full'
      />
      <div className='flex flex-col gap-4'>
        <p className='select-none'>
          <strong>{membership.member.full_name}</strong> wants to join{' '}
          <strong>{membership.household.title}</strong>
        </p>
        <div className='flex items-center gap-2 text-xs'>
          <button className='ring-1 ring-neutral-700 font-medium py-1.5 px-3 rounded-md cursor-pointer'>
            Decline
          </button>
          <button className='bg-neutral-200 text-neutral-950 font-medium py-1.5 px-3 rounded-md cursor-pointer hover:bg-neutral-300'>
            Accept
          </button>
        </div>
      </div>
    </li>
  );
};

const NavControls = () => {
  const [showPendingMembers, setShowPendingMembers] = useState(false);
  const { pendingMemberships } = usePendingMemberships();
  const router = useRouter();
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowPendingMembers(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center gap-2'>
      <div ref={dropdownRef} className='relative flex items-center'>
        <button
          className='relative cursor-pointer'
          onClick={() => setShowPendingMembers(!showPendingMembers)}
        >
          <BellIcon className='size-5 lg:size-6' />
          {pendingMemberships && <PendingMembersPing />}
        </button>
        {showPendingMembers && (
          <ul className='absolute flex flex-col bg-neutral-900 divide-y divide-neutral-700 px-4 rounded-lg top-full translate-y-2 left-1/2 -translate-x-1/2 text-sm lg:left-auto lg:right-0 lg:translate-x-0'>
            {pendingMemberships?.map(membership => (
              <PendingMemberCard key={membership.id} membership={membership} />
            ))}
          </ul>
        )}
      </div>
      <button
        className='bg-neutral-200 text-neutral-950 text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default NavControls;
