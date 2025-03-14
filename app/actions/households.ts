'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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
