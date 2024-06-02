import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  signIn,
} from 'aws-amplify/auth';
import Login from '../Login';

jest.mock('aws-amplify/auth');

jest.mock('aws-amplify/auth', () => ({
  signIn: jest.fn().mockResolvedValue({ userId: '123' }),
  fetchAuthSession: jest.fn().mockResolvedValue({ userSub: null }),
  getCurrentUser: jest.fn().mockResolvedValue({ username: 'user' }),
}));

describe('Login', () => {
  const props = {
  };

  test('renders email and password fields', () => {
    const { getByLabelText } = render(<Login onSubmit={props.onSubmit} />);

    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('calls onSubmit with email and password when clicked', async () => {
    const { getByLabelText, getByText } = render(<Login onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/log in/i));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        "password": "password123",
        "username": "user@gmail.com",
      });
    });
  });

  test('shows an error message when email is in invalid format', () => {
    const {
      getByText,
      getByLabelText,
      queryByText,
    } = render(<Login onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'invalid email.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/log in/i));

    expect(queryByText('Invalid email')).toBeInTheDocument();
  });
});
