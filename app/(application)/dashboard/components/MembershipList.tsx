'use client';

import { useRef, useState } from 'react';
import HouseholdCard from './HouseholdCard';
import { useHouseholdMemberships } from '@/app/hooks/useHouseholdMemberships';
import { HouseholdsByUserId } from '@/utils/supabase/queries';
import HouseholdInviteDialog from './HouseholdInviteDialog';
import DeleteHouseholdDialog from './DeleteHouseholdDialog';

export default function MembershipList() {
  const [chosenForInvite, setChosenForInvite] = useState<
    HouseholdsByUserId[number]['household'] | null
  >(null);
  const [chosenForDelete, setChosenForDelete] = useState<
    HouseholdsByUserId[number]['household'] | null
  >(null);
  const { memberships, membershipsLoading, membershipsError } =
    useHouseholdMemberships();
  const inviteDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  if (membershipsLoading) {
    return (
      <ul className='flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className='my-4 w-full h-36 bg-neutral-500 animate-pulse rounded-md'
          ></li>
        ))}
      </ul>
    );
  }
  if (membershipsError) {
    return <div>Error loading households. Please try again.</div>;
  }

  const handleInviteClick = (
    household: HouseholdsByUserId[number]['household']
  ) => {
    setChosenForInvite(household);
    inviteDialogRef.current?.showModal();
  };

  const handleDeleteClick = (
    household: HouseholdsByUserId[number]['household']
  ) => {
    setChosenForDelete(household);
    deleteDialogRef.current?.showModal();
  };

  return (
    <>
      <ul
        className={`my-4 flex flex-col gap-4  ${
          memberships?.length === 0
            ? 'border border-neutral-800 border-dashed rounded-md p-6'
            : ''
        } sm:grid sm:grid-cols-2 md:grid-cols-3`}
      >
        {memberships?.map(membership => (
          <HouseholdCard
            key={membership.id}
            household={membership.household}
            onInviteClick={() => handleInviteClick(membership.household)}
            onDeleteClick={() => handleDeleteClick(membership.household)}
          />
        ))}
      </ul>

      <HouseholdInviteDialog
        dialogRef={inviteDialogRef}
        chosenHousehold={chosenForInvite}
      />

      <DeleteHouseholdDialog
        dialogRef={deleteDialogRef}
        chosenHousehold={chosenForDelete}
      />
    </>
  );
}
