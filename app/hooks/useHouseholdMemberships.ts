import useSWR from 'swr';
import { HouseholdsByUserId } from '@/utils/supabase/queries';

interface MembershipsResponse {
  memberships: HouseholdsByUserId;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHouseholdMemberships() {
  const { data, error, isLoading, mutate } = useSWR<MembershipsResponse>(
    '/api/households/memberships',
    fetcher
  );

  return {
    memberships: data?.memberships || [],
    membershipsLoading: isLoading,
    membershipsError: error,
    mutateMemberships: mutate,
  };
}
