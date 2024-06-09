import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import { signUp } from 'aws-amplify/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import Register, { isButtonDisabled } from '../Register';

jest.mock('aws-amplify/auth', () => ({
  signUp: jest.fn(),
}));

signUp.mockResolvedValue({ userId: '123' });
describe('Register', () => {
  const mockProps = {
    setUser: jest.fn(),
    setSnackbar: jest.fn(),
  };

  const setup = (props = {}) => render(<Router><Register {...mockProps} {...props} /></Router>);

  test('renders the input fields in the document', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  test('calls signUp with the register form state on submission', async () => {
    const { getByLabelText, getByTestId, getByRole } = setup();
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(getByTestId('name'), {
      target: { value: 'User ABC' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: '!Password100' },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: '123456' },
    });

    fireEvent.click(getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        options: {
          userAttributes: {
            email: 'user@gmail.com',
            name: 'User ABC',
            phone_number: '+1123456',
            preferred_username: 'user',
          },
        },
        password: '!Password100',
        username: 'user@gmail.com',
      });

      expect(mockProps.setUser).toHaveBeenCalledWith(expect.objectContaining({ email: 'user@gmail.com' }));

      expect(mockProps.setSnackbar).toHaveBeenCalledWith(expect.objectContaining({ message: 'Registration successful', open: true }));
    });
  });

  test('shows an error message when email is in invalid format', async () => {
    const {
      getByRole, getByLabelText, getByTestId, queryByText,
    } = setup();
    fireEvent.change(getByLabelText(/username/i), {
      target: { value: 'user' },
    });
    fireEvent.change(getByTestId('name'), {
      target: { value: 'User ABC' },
    });
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'not valid email' },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: '!Password100' },
    });
    fireEvent.change(getByLabelText(/phone number/i), {
      target: { value: '123456' },
    });

    fireEvent.click(getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(queryByText('Invalid email')).toBeInTheDocument();
    });
  });

  describe('isButtonDisabled', () => {
    test('returns true if any value in isPasswordValid is false', () => {
      const isPasswordValid = { hasUpperCase: true, hasLowerCase: false };
      const result = isButtonDisabled({
        isPasswordValid, username: 'test', name: 'test', email: 'test@test.com', password: 'Test123', phoneNumber: '1234567890',
      });
      expect(result).toBe(true);
    });

    test('returns true if any required field is missing', () => {
      const isPasswordValid = { hasUpperCase: true, hasLowerCase: true };
      const result = isButtonDisabled({
        isPasswordValid, username: '', name: 'test', email: 'test@test.com', password: 'Test123', phoneNumber: '1234567890',
      });
      expect(result).toBe(true);
    });

    test('returns false if all conditions are met', () => {
      const isPasswordValid = { hasUpperCase: true, hasLowerCase: true };
      const result = isButtonDisabled({
        isPasswordValid, username: 'test', name: 'test', email: 'test@test.com', password: 'Test123', phoneNumber: '1234567890',
      });
      expect(result).toBe(false);
    });

    // test('handles errors during registration', async () => {
    //   const error = new Error();
    //   error.code = 'UsernameExistsException';

    //   signUp.mockResolvedValue(
    //     error,
    //   );
    //   const { getByRole, getByLabelText, getByTestId } = setup();

    //   fireEvent.change(getByLabelText(/username/i), {
    //     target: { value: 'user' },
    //   });
    //   fireEvent.change(getByTestId('name'), {
    //     target: { value: 'User ABC' },
    //   });
    //   fireEvent.change(getByLabelText(/email/i), {
    //     target: { value: 'email@email.com' },
    //   });
    //   fireEvent.change(getByLabelText(/password/i), {
    //     target: { value: '!Password100' },
    //   });
    //   fireEvent.change(getByLabelText(/phone number/i), {
    //     target: { value: '123456' },
    //   });

    //   fireEvent.click(getByRole('button', { name: /register/i }));

    //   await screen.findByText('Email already exists');
    // });
  });
});
