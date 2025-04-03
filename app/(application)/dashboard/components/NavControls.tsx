'use client';

import React, { useEffect, useRef, useState } from 'react';
import { BellIcon } from '@/app/icons/BellIcon';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { usePendingMemberships } from '@/app/hooks/usePendingMemberships';
import { PendingMemberships } from '@/utils/supabase/queries';
import Image from 'next/image';
import { acceptMembership, declineMembership } from '@/app/actions/members';

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
  const { mutatePendingMemberships } = usePendingMemberships();
  const handleDecline = async () => {
    const result = await declineMembership(membership.id);
    if (result.success) {
      mutatePendingMemberships();
    } else {
      // Error toast here
    }
  };

  const handleAccept = async () => {
    const result = await acceptMembership(membership.id);
    if (result.success) {
      mutatePendingMemberships();
    } else {
      // Error toast here
    }
  };

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
      <div className='flex flex-col'>
        <p className='select-none'>
          <strong>{membership.member.full_name}</strong> wants to join{' '}
          <strong>{membership.household.title}</strong>
        </p>
        <p className='select-none text-xs text-neutral-400 mt-1'>
          {membership.member.email_address}
        </p>
        <div className='flex items-center gap-2 text-xs mt-4'>
          <button
            onClick={handleDecline}
            className='ring-1 ring-neutral-700 font-medium py-1.5 px-3 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors'
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className='bg-neutral-200 text-neutral-950 font-medium py-1.5 px-3 rounded-md cursor-pointer hover:bg-neutral-300 transition-colors'
          >
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
          <BellIcon className='size-5 text-neutral-500 lg:size-6' />
          {pendingMemberships && pendingMemberships.length > 0 && (
            <PendingMembersPing />
          )}
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
        className='ring-1 ring-neutral-300 text-sm font-medium px-4 py-2 rounded-md cursor-pointer hover:shadow-md'
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default NavControls;
