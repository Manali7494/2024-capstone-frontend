import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { signUp } from 'aws-amplify/auth';
import Register from '../Register';

jest.mock('aws-amplify/auth');

jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn().mockResolvedValue({ userId: '123' }),
}));

describe('Register', () => {
  const props = {
    onSubmit: jest.fn(),
  };
  test('renders the input fields in the document', () => {
    const { getByLabelText } = render(<Register onSubmit={props.onSubmit} />);

    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  test('calls onSubmit with the register form state on submission', async () => {
    const { getByText, getByLabelText } = render(<Register onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText(/register/i));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        options: {
          userAttributes: {
            email: 'user@gmail.com',
            phone_number: '+1123456',
            preferred_username: 'user',
          },
        },
        password: 'password',
        username: 'user@gmail.com',
      });
    });
  });

  test('shows an error message when email is in invalid format', () => {
    const {
      getByText,
      getByLabelText,
      queryByText,
    } = render(<Register onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'not valid email' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: '123456' },
    });

    fireEvent.click(getByText(/register/i));

    expect(queryByText('Invalid email')).toBeInTheDocument();
    expect(props.onSubmit).not.toHaveBeenCalled();
  });
});
