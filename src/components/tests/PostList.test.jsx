import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Post, PostList } from '../PostList';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{
    id: 1, name: 'Test Post', description: 'Test Description', imageUrl: 'test.jpg', price: '10', quantity: '1', purchaseDate: '2024-01-01', expiryDate: '2024-12-31',
  }]),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Post Component', () => {
  const posts = [{
    id: 1, name: 'Test Post', description: 'Test Description', imageUrl: 'test.jpg', price: '10', quantity: '1', purchaseDate: '2024-01-01', expiryDate: '2024-12-31',
  }];
  const search = '';
  const setSearch = jest.fn();

  it('renders post details correctly', async () => {
    render(
      <Post posts={posts} search={search} setSearch={setSearch} />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/Quantity:\s*1/)).toBeInTheDocument();
    expect(screen.getByText(/Price:\s*\$10/)).toBeInTheDocument();
    expect(screen.getByText(/Purchase Date:\s*2024-01-01/)).toBeInTheDocument();
    expect(screen.getByText(/Expiry Date:\s*2024-12-31/)).toBeInTheDocument();
    expect(screen.getByText('Detail')).toBeInTheDocument();
  });

  it('renders search field correctly', () => {
    render(
      <Post posts={posts} search={search} setSearch={setSearch} />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });
});

describe('PostList Component', () => {
  it('calls global fetch properly', async () => {
    render(<PostList />, { wrapper: BrowserRouter });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
