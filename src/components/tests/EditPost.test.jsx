import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditPost from '../EditPost';

const mockUser = { id: '1', name: 'John Doe' };

describe('EditPost Component', () => {
  test('displays the correct heading', () => {
    render(<EditPost />);
    const heading = screen.getByRole('heading', { name: /edit post/i });
    expect(heading).toBeInTheDocument();
  });

  it('should display the Update Post button', () => {
    render(<EditPost user={mockUser} />);
    expect(screen.getByRole('button', { name: 'Update Post' })).toBeInTheDocument();
  });

  it('should display all input fields', () => {
    render(<EditPost user={mockUser} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Price')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Select Image/i })).toBeInTheDocument();
  });

  it('should allow typing in the Name input field', () => {
    render(<EditPost user={mockUser} />);
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput.value).toBe('Test Name');
  });

  it('should allow typing in the Description input field', () => {
    render(<EditPost user={mockUser} />);
    const descriptionInput = screen.getByLabelText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    expect(descriptionInput.value).toBe('Test Description');
  });

  it('should allow typing in the Price input field', () => {
    render(<EditPost user={mockUser} />);
    const priceInput = screen.getByLabelText('Price');
    fireEvent.change(priceInput, { target: { value: '100' } });
    expect(priceInput.value).toBe('100');
  });

  it('should allow typing in the Quantity input field', () => {
    render(<EditPost user={mockUser} />);
    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '5' } });
    expect(quantityInput.value).toBe('5');
  });

  it('should allow setting the Purchase Date', () => {
    render(<EditPost user={mockUser} />);
    const purchaseDateInput = screen.getByLabelText('Purchase Date');
    fireEvent.change(purchaseDateInput, { target: { value: '2024-01-01' } });
    expect(purchaseDateInput.value).toBe('2024-01-01');
  });

  it('should allow setting the Expiry Date', () => {
    render(<EditPost user={mockUser} />);
    const expiryDateInput = screen.getByLabelText('Expiry Date');
    fireEvent.change(expiryDateInput, { target: { value: '2024-12-31' } });
    expect(expiryDateInput.value).toBe('2024-12-31');
  });
});
