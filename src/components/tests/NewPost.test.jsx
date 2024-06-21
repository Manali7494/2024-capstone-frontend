import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewPost from '../NewPost';

describe('NewPost', () => {
  const props = {
    user: {
      id: 'user:1',
    },
  };
  test('renders NewPost with correct title', () => {
    render(<NewPost {...props} />);

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('renders NewPost with price field', () => {
    render(<NewPost {...props} />);
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  test('renders NewPost with quantity field', () => {
    render(<NewPost {...props} />);
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });

  test('renders NewPost with purchase date field', () => {
    render(<NewPost {...props} />);
    expect(screen.getByLabelText('Purchase Date')).toBeInTheDocument();
  });

  test('renders NewPost with expiry date field', () => {
    render(<NewPost {...props} />);
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
  });

  test('renders NewPost with submit button', () => {
    render(<NewPost {...props} />);
    expect(screen.getByRole('button', { name: /Create Post/i })).toBeInTheDocument();
  });

  test('shows an error message when the name field is empty', () => {
    const { getByText } = render(<NewPost {...props} />);
    const submitButton = getByText('Create Post');

    fireEvent.click(submitButton);

    expect(getByText('Name is required')).toBeInTheDocument();
  });

  test('shows an error message when the price field is empty', () => {
    const { getByText } = render(<NewPost {...props} />);
    const submitButton = getByText('Create Post');

    fireEvent.click(submitButton);

    expect(getByText('Unit Price is required. It can be 0 if the item is free')).toBeInTheDocument();
  });
  test('shows an error message when the quantity field is empty', () => {
    const { getByText } = render(<NewPost {...props} />);
    const submitButton = getByText('Create Post');
    fireEvent.click(submitButton);

    expect(getByText('Quantity is required')).toBeInTheDocument();
  });

  test('shows an error message when the purchase date is empty', () => {
    const { getByText } = render(<NewPost {...props} />);
    const submitButton = getByText('Create Post');
    fireEvent.click(submitButton);

    expect(getByText('Purchase Date is required')).toBeInTheDocument();
  });

  test('submits the form when all fields are filled', async () => {
    const mockFetch = jest.fn(() => Promise.resolve());
    global.fetch = mockFetch;

    const { getByText, getByLabelText } = render(<NewPost {...props} />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'Test' } });
    fireEvent.change(getByLabelText(/description/i), { target: { value: 'Test description' } });
    fireEvent.change(getByLabelText(/price/i), { target: { value: '10' } });
    fireEvent.change(getByLabelText(/quantity/i), { target: { value: '1' } });
    fireEvent.change(getByLabelText(/purchase date/i), { target: { value: '2024-01-01' } });
    fireEvent.change(getByLabelText(/expiry date/i), { target: { value: '2024-12-31' } });

    const submitButton = getByText('Create Post');
    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringMatching(/\/posts/), {
      method: 'POST',
      body: expect.any(FormData),
    });
  });
});
