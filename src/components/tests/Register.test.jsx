import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../Register';

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

  test('calls onSubmit with the register form state on submission', () => {
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

    expect(props.onSubmit).toHaveBeenCalledWith({
      email: 'user@gmail.com',
      username: 'user',
      password: 'password',
      phoneNumber: '123456',
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
