'use server';

import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Enums } from '@/database.types';
import { TrackBy } from '@/utils/supabase/queries';

type ItemStatus = Enums<'ITEM_STATUS'>;

interface UpdateItemStatusParams {
  itemId: number;
  status: ItemStatus;
  householdId: string;
}

export async function addItem(householdId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const notes = formData.get('notes') as string;
  const status = formData.get('status') as ItemStatus;
  const quantity = formData.get('quantity') as string;
  const trackBy = formData.get('trackBy') as TrackBy;

  console.log('quantity', quantity);
  console.log('trackBy', trackBy);
  console.log('status', status);

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
      status: trackBy === 'status' ? status : null,
      quantity: trackBy === 'quantity' ? parseInt(quantity) : null,
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

export async function editItem(itemId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const notes = formData.get('notes') as string;
  const status = formData.get('status') as ItemStatus;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to edit an item');
  }

  try {
    const supabaseAdmin = createAdminClient();

    const { data: item, error: fetchError } = await supabaseAdmin
      .from('household_items')
      .select('household_id')
      .eq('id', parseInt(itemId, 10))
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabaseAdmin
      .from('household_items')
      .update({
        name,
        notes,
        status,
        last_updated_by: user.id,
        last_updated_at: new Date().toISOString(),
      })
      .eq('id', parseInt(itemId, 10));

    if (error) throw error;

    revalidatePath(`/households/${item.household_id}`);
    return { message: 'Item updated successfully', success: true };
  } catch (error) {
    console.error('Error updating item:', error);
    return { message: 'Failed to update item', success: false };
  }
}

export async function updateItemStatus({
  itemId,
  status,
  householdId,
}: UpdateItemStatusParams) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to update an item');
  }

  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin
      .from('household_items')
      .update({
        status,
        last_updated_at: new Date().toISOString(),
        last_updated_by: user.id,
      })
      .eq('id', itemId);

    if (error) throw error;

    revalidatePath(`/households/${householdId}`);
    revalidatePath('/dashboard');

    return { message: 'Item status updated successfully', success: true };
  } catch (error) {
    console.error('Error updating item status:', error);
    return { message: 'Failed to update item status', success: false };
  }
}

export async function updateItemName(itemId: number, formData: FormData) {
  const name = formData.get('name') as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be signed in to update an item');
  }

  try {
    const supabaseAdmin = createAdminClient();

    const { data: item, error } = await supabaseAdmin
      .from('household_items')
      .update({
        name,
        last_updated_at: new Date().toISOString(),
        last_updated_by: user.id,
      })
      .eq('id', itemId)
      .select('household_id')
      .single();

    if (error) throw error;

    revalidatePath(`/households/${item?.household_id}`);
    revalidatePath('/dashboard');

    return { message: 'Item name updated successfully', success: true };
  } catch (error) {
    console.error('Error updating item name:', error);
    return { message: 'Failed to update item name', success: false };
  }
}

export async function deleteItem(itemId: number) {
  console.log('deleteItem', itemId);

  try {
    const supabaseAdmin = createAdminClient();

    const { data: item, error } = await supabaseAdmin
      .from('household_items')
      .delete()
      .eq('id', itemId)
      .select('household_id')
      .single();

    if (error) throw error;

    revalidatePath(`/households/${item?.household_id}`);
    revalidatePath('/dashboard');

    return { message: 'Item deleted successfully', success: true };
  } catch (error) {
    console.error('Error deleting item:', error);
    return { message: 'Failed to delete item', success: false };
  }
}
