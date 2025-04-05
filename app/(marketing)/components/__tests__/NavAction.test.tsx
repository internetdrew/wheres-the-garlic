import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NavAction from '../NavAction';

// Mock the useUser hook
vi.mock('@/app/hooks/useUser', () => ({
  useUser: vi.fn(),
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock SignInButton component
vi.mock('../SignInButton', () => ({
  default: () => <button>Sign In</button>,
}));

// Import the mocked useUser to manipulate its return value
import { useUser } from '@/app/hooks/useUser';

type MockedUseUser = typeof useUser & {
  mockReturnValue: (value: {
    user: null | { id: string };
    userLoading: boolean;
  }) => void;
};

describe('NavAction', () => {
  it('shows loading state', () => {
    (useUser as MockedUseUser).mockReturnValue({
      user: null,
      userLoading: true,
    });

    const { container } = render(<NavAction />);
    const loadingElement = container.querySelector('.animate-pulse');
    expect(loadingElement).toBeInTheDocument();
  });

  it('shows sign in button when user is not authenticated', () => {
    (useUser as MockedUseUser).mockReturnValue({
      user: null,
      userLoading: false,
    });

    render(<NavAction />);
    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('shows dashboard link when user is authenticated', () => {
    (useUser as MockedUseUser).mockReturnValue({
      user: { id: '123' },
      userLoading: false,
    });

    render(<NavAction />);
    const link = screen.getByRole('link', { name: /go to dashboard/i });
    expect(link).toHaveTextContent('Go to dashboard');
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
