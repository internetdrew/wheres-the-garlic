import useSWR from 'swr';
import { Household } from '@/utils/supabase/queries';

interface HouseholdResponse {
  household: Household;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHousehold(id: string) {
  const { data, error, isLoading, mutate } = useSWR<HouseholdResponse>(
    `/api/households/${id}`,
    fetcher
  );

  return {
    household: data?.household || null,
    householdLoading: isLoading,
    householdError: error,
    mutateHousehold: mutate,
  };
}
