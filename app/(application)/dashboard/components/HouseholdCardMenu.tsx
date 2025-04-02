import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import EllipsesIcon from '@/app/icons/EllipsesIcon';
import React from 'react';

interface HouseholdCardMenuProps {
  onInviteClick: () => void;
  onDeleteClick: () => void;
}

const HouseholdCardMenu = ({
  onInviteClick,
  onDeleteClick,
}: HouseholdCardMenuProps) => {
  return (
    <Menu as='div' className='relative'>
      <MenuButton className='inline-flex items-center gap-2 p-1.5 text-sm font-medium ring-1 ring-neutral-300 rounded-md cursor-pointer transition-colors'>
        <EllipsesIcon className='size-5' />
      </MenuButton>

      <MenuItems
        transition
        anchor='bottom end'
        className='rounded-md ring-1 p-1 text-neutral-900 w-28 bg-neutral-100 ring-neutral-300 mt-2 transition duration-100 ease-out shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        <MenuItem>
          <button
            onClick={onInviteClick}
            className='flex items-center gap-1.5 ring-neutral-300 p-1.5 cursor-pointer hover:ring-neutral-400 transition-colors text-sm hover:bg-neutral-200 w-full rounded-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
              />
            </svg>
            Invite
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={onDeleteClick}
            className='flex items-center gap-1.5 ring-neutral-300 p-1.5 cursor-pointer hover:ring-neutral-400 transition-colors text-sm hover:bg-neutral-200 w-full rounded-sm'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default HouseholdCardMenu;
