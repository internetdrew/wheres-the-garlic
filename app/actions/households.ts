'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';

export async function createHousehold(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be signed in to create a household');
  }

  const supabaseAdmin = createAdminClient();

  const householdName = formData.get('household-name') as string;
  if (!householdName) {
    throw new Error('Household name is required');
  }

  try {
    const { data: household, error: householdError } = await supabaseAdmin
      .from('households')
      .insert({ title: householdName, creator_id: user.id })
      .select()
      .single();

    if (householdError) throw householdError;

    const { error: memberError } = await supabaseAdmin
      .from('household_members')
      .insert({
        household_id: household.id,
        member_id: user.id,
        member_role: 'CREATOR',
      });

    if (memberError) throw memberError;

    const inviteCode = nanoid(6).toUpperCase();
    const { error: inviteError } = await supabaseAdmin
      .from('household_invites')
      .insert({
        household_id: household.id,
        invite_code: inviteCode,
      });

    if (inviteError) throw inviteError;

    revalidatePath('/dashboard');
    return { message: 'Household created successfully', success: true };
  } catch (error) {
    console.error('Error creating household:', error);
    return { message: 'Failed to create household', success: false };
  }
}

export async function editHousehold(householdId: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be signed in to edit a household');
  }

  const supabaseAdmin = createAdminClient();

  const householdName = formData.get('household-name') as string;
  if (!householdName) {
    throw new Error('Household name is required');
  }

  try {
    const { error } = await supabaseAdmin
      .from('households')
      .update({ title: householdName })
      .eq('id', householdId);

    if (error) throw error;

    revalidatePath(`/households/${householdId}`);
    return { message: 'Household updated successfully', success: true };
  } catch (error) {
    console.error('Error updating household:', error);
    return { message: 'Failed to update household', success: false };
  }
}

export async function updateHouseholdName(
  householdId: string,
  formData: FormData
) {
  const supabase = await createClient();
  const supabaseAdmin = createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be signed in to edit a household');
  }

  const householdName = formData.get('household-name') as string;
  if (!householdName) {
    throw new Error('Household name is required');
  }

  try {
    const { error } = await supabaseAdmin
      .from('households')
      .update({ title: householdName })
      .eq('id', householdId);

    if (error) throw error;

    revalidatePath(`/households/${householdId}`);
    return { message: 'Household updated successfully', success: true };
  } catch (error) {
    console.error('Error updating household:', error);
    return { message: 'Failed to update household', success: false };
  }
}

export async function deleteHousehold(householdId: string, formData: FormData) {
  console.log('deleteHousehold', householdId, formData);
}

export async function requestToJoinHousehold(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to join a household');
  }

  const inviteCode = (formData.get('invite-code') as string).toUpperCase();
  const supabaseAdmin = createAdminClient();

  try {
    // First find the household invite
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('household_invites')
      .select('household_id')
      .eq('invite_code', inviteCode)
      .single();

    if (inviteError || !invite) {
      return { message: 'Invalid invite code', success: false };
    }

    // Check if user is already a member or has a pending request
    const { data: existingMember, error: memberError } = await supabaseAdmin
      .from('household_members')
      .select()
      .eq('household_id', invite.household_id)
      .eq('member_id', user.id)
      .single();

    if (existingMember) {
      return {
        message: 'You are already a member or have a pending request',
        success: false,
      };
    }

    if (memberError) throw memberError;

    // Create pending membership
    const { error: joinError } = await supabaseAdmin
      .from('household_members')
      .insert({
        household_id: invite.household_id,
        member_id: user.id,
        member_role: 'MEMBER',
        status: 'PENDING',
      });

    if (joinError) throw joinError;

    revalidatePath('/dashboard');
    return {
      message: 'Join request submitted successfully. Waiting for approval.',
      success: true,
    };
  } catch (error) {
    console.error('Error joining household:', error);
    return { message: 'Failed to submit join request', success: false };
  }
}
