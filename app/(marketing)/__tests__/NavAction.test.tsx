import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import NavAction from '../components/NavAction';
import { useUser } from '@/app/hooks/useUser';
import { User } from '@supabase/supabase-js';

// Mock the useUser hook with a default return value
vi.mock('@/app/hooks/useUser', () => ({
  useUser: vi.fn().mockReturnValue({
    user: null,
    userLoading: false,
    userError: null,
  }),
}));

describe('NavAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state when user is loading', () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      userLoading: true,
      userError: null,
    });

    render(<NavAction />);
    expect(
      screen.getByRole('status', { name: /loading/i })
    ).toBeInTheDocument();
  });

  it('shows sign in button when user is not authenticated', () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      userLoading: false,
      userError: null,
    });

    render(<NavAction />);
    expect(
      screen.getByRole('button', { name: /sign in with google/i })
    ).toBeInTheDocument();
  });

  it('shows dashboard link when user is authenticated', () => {
    (useUser as Mock).mockReturnValue({
      user: { id: '123' } as User,
      userLoading: false,
      userError: null,
    });

    render(<NavAction />);
    const link = screen.getByRole('link', { name: /go to dashboard/i });
    expect(link).toHaveTextContent('Go to dashboard');
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
