import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NewPost from '../NewPost';

describe('NewPost', () => {
  const props = {
    user: {
      id: 'user:1',
    },
  };
  test('renders NewPost with correct title', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('renders NewPost with price field', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
  });

  test('renders NewPost with quantity field', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
  });

  test('renders NewPost with purchase date field', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText('Purchase Date')).toBeInTheDocument();
  });

  test('renders NewPost with expiry date field', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
  });

  test('renders NewPost with submit button', () => {
    render(<NewPost {...props} />, { wrapper: BrowserRouter });
    expect(screen.getByRole('button', { name: /Create Post/i })).toBeInTheDocument();
  });

  test('shows an error message when the name field is empty', () => {
    const { getByText } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    const submitButton = getByText('Create Post');

    fireEvent.click(submitButton);

    expect(getByText('Name is required')).toBeInTheDocument();
  });

  test('shows an error message when the price field is empty', () => {
    const { getByText } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    const submitButton = getByText('Create Post');

    fireEvent.click(submitButton);

    expect(getByText('Unit Price is required. It can be 0 if the item is free')).toBeInTheDocument();
  });
  test('shows an error message when the quantity field is empty', () => {
    const { getByText } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    const submitButton = getByText('Create Post');
    fireEvent.click(submitButton);

    expect(getByText('Quantity is required')).toBeInTheDocument();
  });

  test('shows an error message when the purchase date is empty', () => {
    const { getByText } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    const submitButton = getByText('Create Post');
    fireEvent.click(submitButton);

    expect(getByText('Purchase Date is required')).toBeInTheDocument();
  });

  test('submits the form when all fields are filled', async () => {
    const mockFetch = jest.fn(() => Promise.resolve());
    global.fetch = mockFetch;

    const { getByText, getByLabelText } = render(
      <NewPost {...props} />,
      { wrapper: BrowserRouter },
    );

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

  test('checks handleImage change', () => {
    const readAsDataURLMock = jest.fn();
    window.FileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: readAsDataURLMock,
      onloadend: jest.fn(),
    }));

    const { getByTestId } = render(<NewPost {...props} />, { wrapper: BrowserRouter });
    const fileInput = getByTestId('image');
    const file = new Blob(['image'], { type: 'image/png' });
    file.name = 'test.png';

    fireEvent.change(fileInput, { target: { files: [file] } });

    const readerInstance = new FileReader();
    readerInstance.onloadend = jest.fn();
    readerInstance.result = 'data:image/png;base64,test';
    readerInstance.onloadend();

    expect(readAsDataURLMock).toHaveBeenCalledWith(file);
  });
});
