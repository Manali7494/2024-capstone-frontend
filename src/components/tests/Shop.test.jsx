import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Shop from '../Shop';

global.fetch = jest.fn();
describe('Shop', () => {
  const user = { id: 1 };

  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders Shop', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });
    render(<Shop user={user} />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
  });

  it('displays shop content with items after fetching', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Item 1',
          quantity: 10,
          price: 100,
          purchaseDate: '2024-01-01',
          expiryDate: '2024-12-31',
          imageUrl: 'https://via.placeholder.com/450?text=Item+1',
        },
      ]),
    });
    render(<Shop user={user} />, { wrapper: BrowserRouter });

    await waitFor(() => screen.getByTestId('card-item-1'));
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/User Interested/i)).toBeInTheDocument();

    expect(screen.getByTestId('card-item-1')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByAltText('Item 1')).toHaveAttribute('src', 'https://via.placeholder.com/450?text=Item+1');
    expect(screen.getByText(/Quantity:\s*10/)).toBeInTheDocument();
    expect(screen.getByText(/Price:\s*\$100/)).toBeInTheDocument();
    expect(screen.getByText(/Purchase Date:\s*2024-01-01/)).toBeInTheDocument();
    expect(screen.getByText(/Expiry Date:\s*2024-12-31/)).toBeInTheDocument();
  });
});
