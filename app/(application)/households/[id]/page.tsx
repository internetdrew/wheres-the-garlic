import { redirect } from 'next/navigation';
import PageHeader from './components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { QueryData } from '@supabase/supabase-js';

const HouseholdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const supabase = await createClient();

  console.log(id);

  const householdsQuery = supabase
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

  type Household = QueryData<typeof householdsQuery>;

  const { data, error: householdError } = await householdsQuery;

  if (householdError) {
    console.error(householdError);
  }

  if (!data) {
    redirect('/dashboard');
  }

  const household: Household = data;

  return (
    <main className='max-w-screen-md mx-4 mt-10 lg:mx-auto'>
      <PageHeader household={household} />
      <section className='mt-10'>
        <p className=' text-neutral-500'>
          There are X items being tracked in this household.
        </p>
        <ul></ul>
      </section>
    </main>
  );
};

export default HouseholdPage;
