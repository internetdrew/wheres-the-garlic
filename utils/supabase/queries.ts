import { createClient } from '@/utils/supabase/server';
import { QueryData } from '@supabase/supabase-js';

type SupabaseServerClientType = Awaited<ReturnType<typeof createClient>>;
export type TrackBy = 'status' | 'quantity';

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
        updated_at,
        items:household_items(
          id,
          name,
          status,
          notes,
          quantity,
          household_id,
          last_updated_at,
          last_updated_by(
            full_name,
            avatar_url
          )
        )
      `
    )
    .eq('id', id)
    .order('id', { referencedTable: 'items', ascending: true })
    .maybeSingle();
};

export type Household = QueryData<ReturnType<typeof getHouseholdByIdQuery>>;

export const getHouseholdMembershipsQuery = (
  supabaseClient: SupabaseServerClientType,
  userId: string
) => {
  return supabaseClient
    .from('household_members')
    .select(
      `
      id,
      household:household_id(
        id,
        title,
        creator:creator_id(
          full_name,
          avatar_url
        ),
        created_at,
        latest_item:household_items(
          last_updated_at
        ),
        invite:household_invites(
          invite_code
        )
      ),
      member_role
      `
    )
    .eq('member_id', userId)
    .eq('status', 'APPROVED')
    .order('last_updated_at', {
      referencedTable: 'household.household_items',
      ascending: false,
    })
    .limit(1, { referencedTable: 'household.household_items' });
};

export type HouseholdsByUserId = QueryData<
  ReturnType<typeof getHouseholdMembershipsQuery>
>;

export const getPendingMembershipsQuery = (
  supabaseClient: SupabaseServerClientType,
  userId: string
) => {
  return supabaseClient
    .from('household_members')
    .select(
      `
      id,
      status,
      member:member_id(
        id,
        full_name,
        avatar_url,
        email_address
      ),
      household:household_id(
        id,
        title,
        creator_id
      )
    `
    )
    .eq('status', 'PENDING')
    .eq('household.creator_id', userId);
};

export type PendingMemberships = QueryData<
  ReturnType<typeof getPendingMembershipsQuery>
>;
