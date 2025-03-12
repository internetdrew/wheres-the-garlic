import { redirect } from 'next/navigation';
import PageHeader from './components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { getHouseholdByIdQuery } from '@/utils/supabase/queries';

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
