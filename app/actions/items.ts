'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Enums } from '@/database.types';

type ItemStatus = Enums<'ITEM_STATUS'>;

export async function addItem(householdId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const notes = formData.get('notes') as string;
  const status = formData.get('status') as ItemStatus;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to add an item');
  }

  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin.from('household_items').insert({
      household_id: householdId,
      name,
      notes,
      status,
      last_updated_by: user.id,
    });

    if (error) throw error;

    revalidatePath(`/households/${householdId}`);

    return { message: 'Item created successfully', success: true };
  } catch (error) {
    console.error('Error creating household:', error);
    return { message: 'Failed to create household', success: false };
  }
}
