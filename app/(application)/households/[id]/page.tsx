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

  const { data: household, error: householdError } =
    await getHouseholdByIdQuery(supabase, id);

  if (householdError) {
    console.error(householdError);
  }

  if (!household) {
    redirect('/dashboard');
  }

  return (
    <main className='max-w-screen-md px-4 mt-10 mx-auto md:px-0'>
      <PageHeader
        household={household}
        itemsCount={household.items.length ?? 0}
      />
      <ItemList items={household.items ?? []} householdId={id} />
    </main>
  );
};

export default HouseholdPage;
