import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../Profile';

global.fetch = jest.fn();

describe('Profile', () => {
  const user = { id: '123' };

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Profile', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      }),
    });
    render(<Profile user={user} />);

    // Profile
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Username:')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('johndoe')).toBeInTheDocument();
    });

    // Contact Information
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Contact Email:')).toBeInTheDocument();
    expect(screen.getByText('Contact Number:')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Edit Contact' })).toBeInTheDocument();
  });
});
