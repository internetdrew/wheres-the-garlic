import { PendingMemberships } from '@/utils/supabase/queries';
import useSWR from 'swr';

interface PendingMembershipsResponse {
  pendingMemberships: PendingMemberships;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePendingMemberships() {
  const { data, error, isLoading } = useSWR<PendingMembershipsResponse>(
    '/api/households/memberships/pending',
    fetcher
  );

  return {
    pendingMemberships: data?.pendingMemberships,
    pendingMembershipsLoading: isLoading,
    pendingMembershipsError: error,
  };
}
