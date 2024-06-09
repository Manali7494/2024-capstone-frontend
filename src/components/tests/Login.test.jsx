import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  signIn,
} from 'aws-amplify/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';

jest.mock('aws-amplify/auth');

jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn().mockResolvedValue({ userId: '123' }),
  fetchAuthSession: jest.fn().mockResolvedValue({ userSub: null }),
  getCurrentUser: jest.fn().mockResolvedValue({ username: 'user' }),
}));

describe('Login', () => {
  const mockProps = {
    setUserDetails: jest.fn(),
    setSnackbar: jest.fn(),
  };

  const setup = (props = {}) => render(<Router><Login {...mockProps} {...props} /></Router>);

  test('renders email and password fields', () => {
    const { getByLabelText } = setup();

    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('calls onSubmit with email and password when clicked', async () => {
    const { getByLabelText, getByRole } = setup();

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        password: 'password123',
        username: 'user@gmail.com',
      });
    });
  });

  test('shows an error message when email is in invalid format', () => {
    const { getByLabelText, getByRole, queryByText } = setup();

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid email.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /login/i }));
    expect(queryByText('Invalid email')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const { getByLabelText, getByRole } = setup();

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'email@email.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({ username: 'email@email.com', password: 'password123' });
      expect(mockProps.setUserDetails).toHaveBeenCalled();
      expect(mockProps.setSnackbar).toHaveBeenCalledWith({ message: 'Login successful', open: true });
    });
  });
});
