import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavAction from '../components/NavAction';
import { useUser } from '@/app/hooks/useUser';
import { User } from '@supabase/supabase-js';

// Mock the useUser hook
vi.mock('@/app/hooks/useUser', () => ({
  useUser: vi.fn(),
}));

type MockUseUserReturn = {
  user: User | null;
  userLoading: boolean;
  userError: Error | null;
};

// Create a minimal User object that satisfies the type
const mockUser = {
  id: '123',
  email: 'test@test.com',
  name: 'Test User',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  updated_at: new Date().toISOString(),
} as User;

describe('Landing page navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    // Mock loading state
    (useUser as Mock).mockReturnValue({
      user: null,
      userLoading: true,
      userError: null,
    } as MockUseUserReturn);

    render(<NavAction />);
    const loadingElement = screen.getByRole('status', { name: /loading/i });
    expect(loadingElement).toBeInTheDocument();
  });

  it('shows sign in button when not authenticated', () => {
    (useUser as Mock).mockReturnValue({
      user: null,
      userLoading: false,
      userError: null,
    } as MockUseUserReturn);

    render(<NavAction />);
    const button = screen.getByRole('button', {
      name: /sign in with google/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('shows dashboard link when authenticated', () => {
    // Mock authenticated state
    (useUser as Mock).mockReturnValue({
      user: mockUser,
      userLoading: false,
      userError: null,
    } as MockUseUserReturn);

    render(<NavAction />);
    const link = screen.getByRole('link', { name: /go to dashboard/i });
    expect(link).toHaveTextContent('Go to dashboard');
    expect(link).toHaveAttribute('href', '/dashboard');
  });
});
