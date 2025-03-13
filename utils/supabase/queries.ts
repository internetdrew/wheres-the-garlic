import { createClient } from '@/utils/supabase/server';
import { QueryData } from '@supabase/supabase-js';

type SupabaseServerClientType = Awaited<ReturnType<typeof createClient>>;

export const getHouseholdByIdQuery = (
  supabaseClient: SupabaseServerClientType,
  id: string
) => {
  return supabaseClient
    .from('households')
    .select(
      `
          id,
          title,
          creator:creator_id(
            full_name,
            avatar_url
          ),
          created_at,
          updated_at
          `
    )
    .eq('id', id)
    .single();
};

export type Household = QueryData<ReturnType<typeof getHouseholdByIdQuery>>;
