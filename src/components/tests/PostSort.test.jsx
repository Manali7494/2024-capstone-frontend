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

  it('toggles sort direction', () => {
    render(<PostSort {...props} />);
    const sortDirectionButton = screen.getByTestId('sort-direction-asc');
    fireEvent.click(sortDirectionButton);
    expect(mockSetSortDirection).toHaveBeenCalledTimes(1);
  });

  it('opens the sort field menu', () => {
    render(<PostSort {...props} />);
    expect(screen.getByText('Price')).toBeInTheDocument();
    const toggleButton = screen.getByTestId('toggle-sort-field-dropdown');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByText('Expiry Date')).toBeInTheDocument();
  });

  it('calls setSortField on select of a field', () => {
    render(<PostSort {...props} />);
    const toggleButton = screen.getByTestId('toggle-sort-field-dropdown');
    fireEvent.click(toggleButton);
    const purchaseDate = screen.getByText('Purchase Date');
    fireEvent.click(purchaseDate);
    expect(mockSetSortField).toHaveBeenCalledWith('purchase_date');
  });
});
