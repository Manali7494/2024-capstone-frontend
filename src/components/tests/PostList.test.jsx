import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders only posts matching the search term', async () => {
    const searchText = 'Test';
    render(
      <Post posts={posts} search={searchText} setSearch={setSearch} />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.queryByText('Test Post 2')).toBeNull();
  });

  it('displays a message when no posts match the search term', async () => {
    const searchText = 'Nonexistent Post';
    render(
      <Post posts={[]} search={searchText} setSearch={setSearch} />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText('No posts found.')).toBeInTheDocument();
  });

  it('clears the search term when the clear search button is clicked', async () => {
    const searchText = 'Test200';
    const clearSearchText = '';
    render(
      <Post posts={posts} search={searchText} setSearch={setSearch} />,
      { wrapper: BrowserRouter },
    );

    expect(screen.queryByText('Test Post')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /clearSearch/i }));
    expect(setSearch).toHaveBeenCalledWith(clearSearchText);
  });
});

describe('PostList Component', () => {
  it('calls global fetch properly', async () => {
    render(<PostList />, { wrapper: BrowserRouter });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
