import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Post, PostList } from '../PostList';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{
    id: 1, name: 'Test Post', description: 'Test Description', imageUrl: 'test.jpg', price: '10', quantity: '1', purchaseDate: '2023-01-01', expiryDate: '2023-12-31',
  }]),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Post Component', () => {
  const posts = [{
    id: 1, name: 'Test Post', description: 'Test Description', imageUrl: 'test.jpg', price: '10', quantity: '1', purchaseDate: '2023-01-01', expiryDate: '2023-12-31',
  }];

  it('renders post details correctly', () => {
    render(<Post posts={posts} />, { wrapper: BrowserRouter });
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Price: $10 - Quantity:1')).toBeInTheDocument();
    expect(screen.getByText('Purchase Date:2023-01-01 - Expiry Date:2023-12-31')).toBeInTheDocument();
  });
});

describe('PostList Component', () => {
  it('calls global fetch properly', async () => {
    render(<PostList />, { wrapper: BrowserRouter });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
