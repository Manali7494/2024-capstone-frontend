import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostSort from '../PostSort';

describe('PostSort Component', () => {
  const mockSetSortField = jest.fn();
  const mockSetSortDirection = jest.fn();

  const props = {
    sortField: 'price',
    setSortField: mockSetSortField,
    setSortDirection: mockSetSortDirection,
    sortDirection: 'asc',
  };

  it('renders without crashing', () => {
    render(<PostSort {...props} />);
    expect(screen.getByText(/sort by:/i)).toBeInTheDocument();
  });

  it('displays the current sort field', () => {
    render(<PostSort {...props} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
  });
});
