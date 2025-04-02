import HouseholdContent from './components/HouseholdContent';

const HouseholdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <main className='max-w-screen-md px-4 mt-10 mx-auto md:px-0'>
      <HouseholdContent householdId={id} />
    </main>
  );
};

export default HouseholdPage;
