import React from 'react';
import {
  render, screen, waitFor, fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ViewPost from '../ViewPost';

const mockPost = {
  id: 1,
  name: 'Test Post',
  description: 'This is a test post',
  price: 100,
  quantity: 10,
  purchaseDate: '2024-01-01',
  expiryDate: '2024-12-31',
  seller_id: 1,
};

const user = {
  id: 1,
};

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve(mockPost),
}));

describe('ViewPost', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders post details correctly', async () => {
    render(
      <ViewPost user={user} />,
      { wrapper: BrowserRouter },
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/posts\/(postId:1)?/));
    await screen.findByTestId('name');
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('purchaseDate')).toBeInTheDocument();
    expect(screen.getByTestId('expiryDate')).toBeInTheDocument();
  });

  it('shows edit button for post owner', async () => {
    render(
      <ViewPost user={user} />,
      { wrapper: BrowserRouter },
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const editButton = screen.queryByTestId('edit-button');
    expect(editButton).not.toBeInTheDocument();
  });

  it('supports "Interested" functionality', async () => {
    render(
      <ViewPost user={user} />,
      { wrapper: BrowserRouter },
    );
    await screen.findByRole('button', { name: /interested/i });
    const button = screen.getByRole('button', { name: /interested/i });
    fireEvent.click(button);

    const loadingIndicator = screen.getByTestId('loading');

    expect(loadingIndicator).toBeInTheDocument();

    await screen.findByRole('button', { name: /interested/i });

    expect(await screen.findByRole('button', { name: /Contact Information/i })).toBeInTheDocument();
  });

  it('Shows contact information', async () => {
    render(
      <ViewPost user={user} />,
      { wrapper: BrowserRouter },
    );
    await screen.findByRole('button', { name: /interested/i });
    fireEvent.click(screen.getByRole('button', { name: /interested/i }));

    expect(await screen.findByRole('button', { name: /Contact Information/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Contact Information/i }));

    await screen.getByTestId(/contact-email/i);
    expect(screen.getByTestId(/contact-email/i)).toBeInTheDocument();
    expect(screen.getByTestId(/contact-number/i)).toBeInTheDocument();
  });

  it('Unselect favourite and hide contact information', async () => {
    render(
      <ViewPost user={user} />,
      { wrapper: BrowserRouter },
    );
    await screen.findByRole('button', { name: /interested/i });
    fireEvent.click(screen.getByRole('button', { name: /interested/i }));

    await screen.findByRole('button', { name: /Contact Information/i });

    expect(await screen.findByRole('button', { name: /Contact Information/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /interested/i }));

    await waitForElementToBeRemoved(() => screen.queryByText(/Contact Information/i));

    expect(screen.queryByRole('button', { name: /Contact Information/i })).not.toBeInTheDocument();
  });
});
