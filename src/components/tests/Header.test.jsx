import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

import Header from '../Header';

const { getByRole, getByText } = screen;
const mockProps = {
  user: null,
};

jest.mock('aws-amplify/auth', () => ({
  signOut: jest.fn(),
}));
const setup = (
  props = mockProps,
) => render(<Router><Header {...props} /></Router>);

describe('Header', () => {
  test('renders Healthy Wealthy title', () => {
    setup();
    const title = getByText(/Healthy Wealthy/i);
    expect(title).toBeInTheDocument();
  });

  test('renders Register and Login buttons when user is not logged in', () => {
    setup();
    const registerButton = getByRole('link', { name: /Register/i });
    const loginButton = getByRole('link', { name: /Login/i });
    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test('renders user email when user is logged in', () => {
    const user = {
      username: 'user',
      email: 'user@gmail.com',
    };
    setup({ user });
    const email = getByText(/user@gmail.com/i);
    expect(email).toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    const user = {
      username: 'user',
      email: 'user@gmail.com',
    };
    setup({ user });
    const logoutText = getByText(/Logout/i);
    expect(logoutText).toBeInTheDocument();
  });

  test('signs out user when logout button is clicked', async () => {
    const user = {
      username: 'user',
      email: 'user@gmail.com',
    };
    const setUser = jest.fn();
    const setSnackbar = jest.fn();
    setup({ user, setUser, setSnackbar });
    fireEvent.click(getByText('Logout'));
    await waitFor(() => expect(signOut).toHaveBeenCalledWith({ global: true }));
    expect(setUser).toHaveBeenCalledWith(null);
    expect(setSnackbar).toHaveBeenCalledWith({ open: true, message: 'Signed out successfully' });
  });
});
