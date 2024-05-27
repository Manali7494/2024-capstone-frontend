import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from '../Login';

describe('Login', () => {
  const props = {
    onSubmit: jest.fn(),
  };
  test('renders username and password fields', () => {
    const { getByLabelText } = render(<Login onSubmit={props.onSubmit} />);

    expect(getByLabelText(/Username/i)).toBeInTheDocument();
    expect(getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test('calls onSubmit with username and password when clicked', () => {
    const { getByLabelText, getByText } = render(<Login onSubmit={props.onSubmit} />);

    fireEvent.change(getByLabelText(/Username/i), { target: { value: 'user' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    fireEvent.click(getByText(/log in/i));

    expect(props.onSubmit).toHaveBeenCalledWith({
      username: 'user',
      password: 'password123',
    });
  });
});
