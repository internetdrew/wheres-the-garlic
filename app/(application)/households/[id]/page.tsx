import { redirect } from 'next/navigation';
import PageHeader from './components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { getHouseholdByIdQuery } from '@/utils/supabase/queries';
import { formatDistance } from 'date-fns';

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
    .eq('household_id', id);

  if (itemsError) {
    console.error(itemsError);
  }

  console.log(items);

  return (
    <main className='max-w-screen-md mx-4 mt-10 md:mx-auto'>
      <PageHeader household={household} />
      <section className='mt-10'>
        <p className=' text-neutral-500'>
          There are {items?.length} items being tracked in this household.
        </p>
        <ul className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 '>
          {items?.map(item => (
            <li
              key={item.id}
              className='flex flex-col gap-2 bg-neutral-200 p-6 rounded-lg text-neutral-900'
            >
              <span className='text-lg font-medium'>{item.name}</span>
              <span className='text-sm text-neutral-600'>{item.status}</span>
              <div className='flex flex-col mt-2 text-sm text-neutral-600'>
                <span>Last updated by:</span>
                <span>
                  {item.last_updated_by.full_name}{' '}
                  {formatDistance(item.last_updated_at, new Date(), {
                    addSuffix: true,
                    includeSeconds: true,
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default HouseholdPage;
