import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

describe('Login', () => {
  const props = {
    onSubmit: jest.fn(),
  };
  test('renders email and password fields', () => {
    const { getByLabelText } = render(<Login onSubmit={props.onSubmit} />);

    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('calls onSubmit with email and password when clicked', () => {
    const { getByLabelText, getByText } = render(<Login onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'user@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/log in/i));

    expect(props.onSubmit).toHaveBeenCalledWith({
      email: 'user@gmail.com',
      password: 'password123',
    });
  });
});
