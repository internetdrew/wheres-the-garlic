import { redirect } from 'next/navigation';
import PageHeader from './components/PageHeader';
import { createClient } from '@/utils/supabase/server';
import { getHouseholdByIdQuery } from '@/utils/supabase/queries';
import { formatDistance } from 'date-fns';
import { Enums } from '@/database.types';

type ItemStatus = Enums<'ITEM_STATUS'>;

const statusDisplay: Record<ItemStatus, string> = {
  FULL: 'Full',
  HALFWAY: 'Halfway',
  LOW: 'Low',
  OUT: 'Out',
};

const statusColors: Record<ItemStatus, string> = {
  FULL: 'bg-emerald-500',
  HALFWAY: 'bg-amber-500',
  LOW: 'bg-orange-500',
  OUT: 'bg-rose-500',
};

const statusAnimations: Record<ItemStatus, string> = {
  FULL: '',
  HALFWAY: '',
  LOW: 'pulse-low',
  OUT: 'pulse-out',
};

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

  return (
    <main className='max-w-screen-md px-4 mt-10 md:mx-auto lg:px-0'>
      <PageHeader household={household} />
      <section className='mt-10'>
        <p className=' text-neutral-500'>
          There are {items?.length} items being tracked in this household.
        </p>
        <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 '>
          {items?.map(item => (
            <li
              key={item.id}
              className='flex flex-col gap-2 bg-neutral-200 p-6 rounded-lg text-neutral-900'
            >
              <div className='flex items-center justify-between'>
                <span className='text-lg font-medium'>{item.name}</span>
                <button className='text-sm text-neutral-600 ring-1 ring-neutral-300 rounded-md py-2 px-4 cursor-pointer hover:ring-neutral-400 transition-colors'>
                  Update
                </button>
              </div>
              <span className=' text-neutral-600 flex items-center gap-2'>
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    statusColors[item.status]
                  } ${statusAnimations[item.status]}`}
                />
                {statusDisplay[item.status]}
              </span>
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
