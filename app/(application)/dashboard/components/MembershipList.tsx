'use client';

import HouseholdCard from './HouseholdCard';
import { useMembershipList } from '@/app/hooks/useMembershipList';

export default function MembershipList() {
  const { memberships, isLoading, isError } = useMembershipList();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something broke here</div>;

  return (
    <ul
      className={`my-4 flex flex-col gap-4  ${
        memberships?.length === 0
          ? 'border border-neutral-800 border-dashed rounded-md p-6'
          : ''
      } sm:grid sm:grid-cols-2 md:grid-cols-3`}
    >
      {memberships?.map(membership => (
        <HouseholdCard key={membership.id} household={membership.household} />
      ))}
    </ul>
  );
}
