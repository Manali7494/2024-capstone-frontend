import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
