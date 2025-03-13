import { redirect } from 'next/navigation';
import PageHeader from './components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { getHouseholdByIdQuery } from '@/utils/supabase/queries';
import ItemList from './components/ItemList';

const HouseholdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();

  const householdsQuery = getHouseholdByIdQuery(supabase, id);
  const { data: household, error: householdError } = await householdsQuery;

  if (householdError) {
    console.error(householdError);
  }

  if (!household) {
    redirect('/dashboard');
  }

  const { data: items, error: itemsError } = await supabase
    .from('household_items')
    .select(
      `
      id,
      name,
      status,
      notes,
      last_updated_at,
      last_updated_by(
        full_name,
        avatar_url
      )
      `
    )
    .eq('household_id', id)
    .order('last_updated_at', { ascending: false });

  if (itemsError) {
    console.error(itemsError);
  }

  return (
    <main className='max-w-screen-md px-4 mt-10 mx-auto md:px-0'>
      <PageHeader household={household} />
      <ItemList items={items ?? []} householdId={id} />
    </main>
  );
};

export default HouseholdPage;
