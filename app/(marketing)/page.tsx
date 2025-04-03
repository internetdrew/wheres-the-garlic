const howItWorks = [
  {
    title: 'Create a household',
    description: 'Create a household to start tracking your inventory.',
  },
  {
    title: 'Add your items',
    description:
      'Add items with ease. You can add items by their status or quantity.',
  },
  {
    title: 'Update item statuses',
    description: 'Update item statuses as you use them.',
  },
  {
    title: 'Invite others to your household',
    description: 'Invite others and keep everyone in the loop.',
  },
];

export default async function Home() {
  return (
    <div className='max-w-screen-lg mx-4 lg:mx-auto'>
      <main className='mt-20'>
        <header className='flex flex-col gap-4 max-w-lg mx-auto text-center'>
          <h1 className='text-3xl font-medium lg:text-4xl'>
            A Status-Based Home Grocery Inventory App
          </h1>
          <p className='text-lg text-neutral-500 lg:text-xl'>
            See what’s in your kitchen at a glance—full, halfway, almost done,
            or out.
          </p>
        </header>
        <section className='mt-24 mb-12 flex flex-col items-center text-center max-w-screen-md mx-auto'>
          <h2 className='text-xl font-medium lg:text-2xl'>How it works</h2>
          <p className='text-neutral-500 text-lg max-w-lg'>
            Manage your home grocery inventory with ease.
          </p>
          <ul className='my-8 grid grid-cols-1 gap-6 text-left md:grid-cols-2'>
            {howItWorks.map(item => (
              <li
                key={item.title}
                className='ring-1 ring-neutral-300 rounded-md p-4 text-neutral-900'
              >
                <h3 className='text-lg font-semibold'>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
