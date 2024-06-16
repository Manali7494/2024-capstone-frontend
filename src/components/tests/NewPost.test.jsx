import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewPost from '../NewPost';

describe('NewPost', () => {
  test('renders NewPost with correct title', () => {
    render(<NewPost />);

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('renders NewPost with correct title', () => {
    render(<NewPost />);
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });

  test('renders NewPost with price field', () => {
    render(<NewPost />);
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  test('renders NewPost with quantity field', () => {
    render(<NewPost />);
    expect(screen.getByText('Quantity')).toBeInTheDocument();
  });

  test('renders NewPost with purchase date field', () => {
    render(<NewPost />);
    expect(screen.getByText('Purchase Date')).toBeInTheDocument();
  });

  test('renders NewPost with expiry date field', () => {
    render(<NewPost />);
    expect(screen.getByText('Expiry Date')).toBeInTheDocument();
  });

  test('renders NewPost with submit button', () => {
    render(<NewPost />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('shows an error message when the name field is empty', () => {
    const { getByLabelText, getByText, container } = render(<NewPost />);
    const nameInput = getByLabelText('Name');
    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    const form = container.querySelector('form');
    form.reportValidity();

    expect(nameInput.validationMessage).toBe('Name is required');
  });

  test('shows an error message when the price field is empty', () => {
    const { getByLabelText, getByText, container } = render(<NewPost />);
    const priceInput = getByLabelText('Price');
    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    const form = container.querySelector('form');
    form.reportValidity();

    expect(priceInput.validationMessage).toBe('Unit Price is required. It can be 0 if the item is free');
  });

  test('shows an error message when the quantity field is empty', () => {
    const { getByLabelText, getByText, container } = render(<NewPost />);
    const quantityInput = getByLabelText('Quantity');
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    const form = container.querySelector('form');
    form.reportValidity();

    expect(quantityInput.validationMessage).toBe('Quantity is required');
  });

  test('shows an error message when the purchase date field is empty', () => {
    const { getByLabelText, getByText, container } = render(<NewPost />);
    const purchaseDateInput = getByLabelText('Purchase Date');
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    const form = container.querySelector('form');
    form.reportValidity();
    expect(purchaseDateInput.validationMessage).toBe('Purchase Date is required');
  });
});
