import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NavControls from '../dashboard/components/NavControls';

vi.mock('@/app/hooks/useUser', () => ({
  useUser: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signOut: vi.fn(),
    },
  }),
}));

vi.mock('@/app/hooks/usePendingMemberships', () => ({
  usePendingMemberships: () => ({
    pendingMemberships: [],
  }),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

import { useUser } from '@/app/hooks/useUser';

type MockedUseUser = typeof useUser & {
  mockReturnValue: (value: {
    user: null | { id: string };
    userLoading: boolean;
  }) => void;
};

describe('NavControls', () => {
  it('should render the sign out button when the user is authenticated', () => {
    (useUser as MockedUseUser).mockReturnValue({
      user: { id: '123' },
      userLoading: false,
    });

    render(<NavControls />);
    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument();
  });
});
