import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Shop, { sortPosts } from '../Shop';

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

  it('displays "no posts" message if no posts after fetching', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });
    render(<Shop user={user} />, { wrapper: BrowserRouter });

    await waitFor(() => screen.getByText(/No posts/i));
    expect(screen.getByText(/Shop/i)).toBeInTheDocument();
    expect(screen.getByText(/User Interested/i)).toBeInTheDocument();
    expect(screen.getByText(/No posts added. Create a post to see it in the list./i)).toBeInTheDocument();
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
    expect(screen.queryByText(/card-item-1/i)).not.toBeInTheDocument();
  });

  it('tests "user interested" functionality with data', async () => {
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
          interested_count: 2,
        },
        {
          id: 2,
          name: 'Item 2',
          quantity: 10,
          price: 100,
          purchaseDate: '2024-01-01',
          expiryDate: '2024-12-31',
          imageUrl: 'https://via.placeholder.com/450?text=Item+2',
          interested_count: 0,
        },
      ]),
    });
    render(<Shop user={user} />, { wrapper: BrowserRouter });

    await waitFor(() => screen.getByTestId('card-item-1'));
    const cardItems = await screen.findAllByTestId(/card-item-/i);
    expect(cardItems).toHaveLength(2);

    const switchElement = screen.getByTestId('user-interested-switch');
    const switchInput = switchElement.querySelector('input');

    switchInput.click();
    expect(switchInput).toBeChecked();

    expect(screen.getByText(/Item 1/)).toBeInTheDocument();
  });

  describe('sortPosts', () => {
    it('should filter and sort posts by interested_count when filterInterested is true', () => {
      const posts = [
        { id: 1, interested_count: 5 },
        { id: 2, interested_count: 0 },
        { id: 3, interested_count: 10 },
      ];
      const filterInterested = true;

      const result = sortPosts({ posts, filterInterested });

      expect(result).toEqual([
        { id: 3, interested_count: 10 },
        { id: 1, interested_count: 5 },
      ]);
    });

    it('should return only posts with interested_count > 0 when filterInterested is true', () => {
      const posts = [
        { id: 1, interested_count: 0 },
        { id: 2, interested_count: 0 },
      ];
      const filterInterested = true;

      const result = sortPosts({ posts, filterInterested });

      expect(result).toEqual([]);
    });

    it('should return all posts unchanged when filterInterested is false', () => {
      const posts = [
        { id: 1, interested_count: 5 },
        { id: 2, interested_count: 0 },
        { id: 3, interested_count: 10 },
      ];
      const filterInterested = false;

      const result = sortPosts({ posts, filterInterested });

      expect(result).toEqual(posts);
    });
  });
});
