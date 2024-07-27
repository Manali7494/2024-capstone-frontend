import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditPost from '../EditPost';

const mockUser = { id: '1', name: 'John Doe' };
const mockPostData = {
  id: 'postId:1',
  name: 'Test Post',
  description: 'Test Description',
  price: '100',
  imageUrl: 'test-image-url.jpg',
  quantity: '5',
  purchaseDate: '2024-01-01',
  expiryDate: '2024-12-31',
};

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockPostData),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'postId:1',
  }),
}));

describe('EditPost Component', () => {
  test('displays the correct heading', async () => {
    render(<EditPost />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
  });

  it('should display the Update Post button', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Update Post' })).toBeInTheDocument();
  });

  it('should display all input fields', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Image/i })).toBeInTheDocument();
  });

  it('should allow typing in the Name input field', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput.value).toBe('Test Name');
  });

  it('should allow typing in the Description input field', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    expect(descriptionInput.value).toBe('Test Description');
  });

  it('should allow typing in the Price input field', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const priceInput = screen.getByLabelText('Price');
    fireEvent.change(priceInput, { target: { value: '100' } });
    expect(priceInput.value).toBe('100');
  });

  it('should allow typing in the Quantity input field', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '5' } });
    expect(quantityInput.value).toBe('5');
  });

  it('should allow setting the Purchase Date', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const purchaseDateInput = screen.getByLabelText('Purchase Date');
    fireEvent.change(purchaseDateInput, { target: { value: '2024-01-01' } });
    expect(purchaseDateInput.value).toBe('2024-01-01');
  });

  it('should allow setting the Expiry Date', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const expiryDateInput = screen.getByLabelText('Expiry Date');
    fireEvent.change(expiryDateInput, { target: { value: '2024-12-31' } });
    expect(expiryDateInput.value).toBe('2024-12-31');
  });
  it('should submit form data correctly and display success message', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });

    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Purchase Date'), { target: { value: '2023-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /update post/i }));

    expect(global.fetch).toHaveBeenCalledWith(expect.stringMatching(/\/posts\/(postId:1)?/), {
      method: 'POST',
      body: expect.any(FormData),
    });

    global.fetch.mockRestore();
  });

  it('shows an error message when the name field is empty', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const submitButton = screen.getByRole('button', { name: /update post/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('shows an error message when the price field is empty', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const submitButton = screen.getByRole('button', { name: /update post/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Unit Price is required. It can be 0 if the item is free')).toBeInTheDocument();
  });

  it('shows an error message when the quantity field is empty', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const submitButton = screen.getByRole('button', { name: /update post/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Quantity is required')).toBeInTheDocument();
  });

  it('shows an error message when the purchase date is empty', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    const submitButton = screen.getByRole('button', { name: /update post/i });

    fireEvent.click(submitButton);

    expect(screen.getByText('Purchase Date is required')).toBeInTheDocument();
  });

  it('shows a button called delete', async () => {
    render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());

    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(deleteButton).toBeInTheDocument();
  });

  it('tests handleImage change', async () => {
    const readAsDataURLMock = jest.fn();
    window.FileReader = jest.fn().mockImplementation(() => ({
      readAsDataURL: readAsDataURLMock,
      onloadend: jest.fn(),
    }));

    const { getByTestId } = render(<EditPost user={mockUser} />, { wrapper: BrowserRouter });
    await waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());

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
