import React from 'react';
import {
  render, screen, within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import SuggestedPosts, { SuggestedPostsContent } from '../SuggestedPosts';
import config from '../../config';

describe('SuggestedPostsContent', () => {
  const mockPosts = [
    {
      id: 1,
      name: 'Post 1',
      quantity: 10,
      price: 100,
      purchaseDate: '2024-01-01',
      expiryDate: '2024-12-31',
      imageUrl: 'https://via.placeholder.com/450?text=Post+1',

    },
    {
      id: 2,
      name: 'Post 2',
      quantity: 5,
      price: 50,
      purchaseDate: '2024-02-01',
      imageUrl: '',

    },
  ];

  it('renders Suggested Posts title', () => {
    render(
      <SuggestedPostsContent posts={mockPosts} />,
      { wrapper: BrowserRouter },
    );
    expect(screen.getByText('Suggested Posts')).toBeInTheDocument();
  });

  it('displays posts with correct data', () => {
    render(
      <SuggestedPostsContent posts={mockPosts} />,
      { wrapper: BrowserRouter },
    );

    const postList = screen.getAllByTestId(/card-item-/i);
    const firstPost = postList[0];
    expect(within(firstPost).getByText(/Quantity:\s*10/)).toBeInTheDocument();
    expect(within(firstPost).getByText(/Price:\s*\$100/)).toBeInTheDocument();
    expect(within(firstPost).getByText(/Purchase Date:\s*2024-01-01/)).toBeInTheDocument();
    expect(within(firstPost).getByText(/Expiry Date:\s*2024-12-31/)).toBeInTheDocument();

    const secondPost = postList[1];
    expect(within(secondPost).getByText(/Quantity:\s*5/)).toBeInTheDocument();
    expect(within(secondPost).getByText(/Price:\s*\$50/)).toBeInTheDocument();
    expect(within(secondPost).getByText(/Purchase Date:\s*2024-02-01/)).toBeInTheDocument();
    expect(within(secondPost).queryByText(/Expiry Date:/)).not.toBeInTheDocument();
  });

  it('uses fallback image when imageUrl is not provided', () => {
    render(
      <SuggestedPostsContent posts={mockPosts} />,
      { wrapper: BrowserRouter },
    );

    const fallbackImage = 'https://via.placeholder.com/450?text=No+Image+Available';
    mockPosts.forEach((post) => {
      const image = screen.getByAltText(post.name);
      if (post.imageUrl) {
        expect(image).toHaveAttribute('src', post.imageUrl);
      } else {
        expect(image).toHaveAttribute('src', fallbackImage);
      }
    });
  });

  it('does not display expiry date when not provided', () => {
    render(
      <SuggestedPostsContent posts={mockPosts} />,
      { wrapper: BrowserRouter },
    );

    const postWithoutExpiryDate = mockPosts.find((post) => !post.expiryDate);
    if (postWithoutExpiryDate) {
      expect(screen.queryByText(`Expiry Date: ${postWithoutExpiryDate.expiryDate}`)).not.toBeInTheDocument();
    }
  });

  it('displays the error text if code is USER_NO_PREFERENCE', () => {
    render(
      <SuggestedPostsContent code="USER_NO_PREFERENCE" />,
      { wrapper: BrowserRouter },
    );
    const errorMessage = screen.getByText(/No posts selected. Click on “interested” button on a post to see suggestions/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays the message text if code is USER_INVALID_PREFERENCE', () => {
    render(
      <SuggestedPostsContent code="USER_INVALID_PREFERENCE" />,
      { wrapper: BrowserRouter },
    );
    const errorMessage = screen.getByText(/Please select valid posts with nutrition to see suggestions/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('SuggestedPosts', () => {
  const mockUser = { id: 1 };
  const mockPosts = [];

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockPosts),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays suggested posts', async () => {
    render(<SuggestedPosts user={mockUser} />);

    expect(global.fetch).toHaveBeenCalledWith(`${config.backend_url}/posts/suggested/${mockUser.id}`);
    expect(screen.getByText('Suggested Posts')).toBeInTheDocument();
  });
});
