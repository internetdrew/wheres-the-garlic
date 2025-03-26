'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';

export async function declineMembership(membershipId: string) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to decline a membership');
  }
  try {
    const { error } = await supabaseAdmin
      .from('household_members')
      .delete()
      .eq('id', membershipId);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Membership declined successfully', success: true };
  } catch (error) {
    console.error('Error declining membership:', error);
    return { message: 'Failed to decline membership', success: false };
  }
}

export async function acceptMembership(membershipId: string) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to update a membership');
  }
  try {
    const { error } = await supabaseAdmin
      .from('household_members')
      .update({ status: 'APPROVED' })
      .eq('id', membershipId);

    if (error) throw error;

    return { message: 'Membership accepted successfully', success: true };
  } catch (error) {
    console.error('Error accepting membership:', error);
    return { message: 'Failed to accept membership', success: false };
  }
}
