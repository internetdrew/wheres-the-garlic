import UserGroupIcon from '@/app/icons/UserGroupIcon';
import XMarkIcon from '@/app/icons/XMarkIcon';
import { HouseholdsByUserId } from '@/utils/supabase/queries';

const HouseholdInviteDialog = ({
  dialogRef,
  chosenHousehold,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  chosenHousehold: HouseholdsByUserId[number]['household'] | null;
}) => {
  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className='mx-auto my-auto max-w-md rounded-xl p-6 backdrop:bg-black/50 backdrop:opacity-50'
    >
      <header className='flex justify-between items-center'>
        <UserGroupIcon className='size-6' />

        <button
          type='button'
          className='text-sm text-neutral-700 cursor-pointer'
          onClick={handleClose}
        >
          <XMarkIcon className='size-6' />
        </button>
      </header>
      <div className='flex justify-between items-center mt-6'>
        <h2 className='text-lg font-semibold'>
          Invite others to {chosenHousehold?.title}
        </h2>
      </div>
      <p className='text-neutral-700'>
        Copy the instructions below and send them to your friends and family so
        they can help you manage <strong>{chosenHousehold?.title}</strong>.
      </p>
      <div className='flex flex-col my-7 gap-2'>
        <p>
          Here&apos;s how to join <strong>{chosenHousehold?.title}</strong> on
          Where&apos;s the Garlic?!:
        </p>
        <ol className='list-decimal list-inside space-y-2'>
          <li>
            Click this link:{' '}
            <a
              href='https://www.wheresthegarlic.com/'
              className='text-pink-600 underline-offset-2 hover:underline'
              target='_blank'
              rel='noopener noreferrer'
            >
              wheresthegarlic.com
            </a>
          </li>
          <li>Sign in with Google</li>
          <li>Tap the &quot;Join a household&quot; button</li>
          <li>
            Enter this invite code:{' '}
            <span className='font-mono bg-neutral-100 px-2 py-1 rounded'>
              {chosenHousehold?.invite?.invite_code}
            </span>
          </li>
        </ol>
        <button
          className='bg-neutral-950 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors mt-4'
          onClick={() => {
            const instructions = `Join ${chosenHousehold?.title} on Where's the Garlic?!

1. Click this link: https://www.wheresthegarlic.com/
2. Sign in with Google
3. Tap the "Join a household" button
4. Enter this invite code: ${chosenHousehold?.invite?.invite_code}

See you there! 🧄`;
            navigator.clipboard.writeText(instructions);
          }}
        >
          Copy instructions
        </button>
      </div>
    </dialog>
  );
};

export default HouseholdInviteDialog;
