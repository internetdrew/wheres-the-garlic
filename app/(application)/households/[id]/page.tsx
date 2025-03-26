import PageHeader from './components/PageHeader';
import ItemList from './components/ItemList';

const HouseholdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main className='max-w-screen-md px-4 mt-10 mx-auto md:px-0'>
      <PageHeader householdId={id} />
      <ItemList householdId={id} />
    </main>
  );
};

export default HouseholdPage;
