import useSWR from 'swr';
import { User } from '@supabase/supabase-js';

interface UserResponse {
  user: User;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useUser() {
  const { data, error, isLoading } = useSWR<UserResponse>('/api/user', fetcher);

  return {
    user: data?.user,
    userLoading: isLoading,
    userError: error,
  };
}
