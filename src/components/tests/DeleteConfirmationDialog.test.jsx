import React from 'react';
import {
  render, fireEvent, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  const props = {
    setDisplayErrorMessage: jest.fn(),
    setSuccessMessage: jest.fn(),
    postId: 'post:1',
  };
  it('dialog is initially not visible', () => {
    render(<DeleteConfirmationDialog {...props} />);
    expect(screen.queryByText('Are you sure you want to delete?')).not.toBeInTheDocument();
  });

  it('clicking the "Delete" button opens the dialog', () => {
    render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
  });

  it('clicking the "Cancel" button closes the dialog', async () => {
    render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Cancel'));
    await waitForElementToBeRemoved(() => screen.queryByText('Are you sure you want to delete?'));
  });

  it('handles successful deletion', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Post successfully deleted' }),
    }));
    const { getByText } = render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes, Delete'));

    await waitForElementToBeRemoved(() => screen.queryByText('Are you sure you want to delete?'));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`/posts/${props.postId}`), {
      method: 'DELETE',
    });
    expect(props.setSuccessMessage).toHaveBeenCalledWith('Post successfully deleted');
  });

  it('handles failed deletion due to server error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      status: 400,
    }));
    const { getByText } = render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes, Delete'));

    await waitForElementToBeRemoved(() => screen.queryByText('Are you sure you want to delete?'));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`/posts/${props.postId}`), {
      method: 'DELETE',
    });
    expect(props.setDisplayErrorMessage).toHaveBeenCalledWith('Failed to delete post');
  });

  it('handles exception thrown during deletion', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
    const { getByText } = render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes, Delete'));

    await waitForElementToBeRemoved(() => screen.queryByText('Are you sure you want to delete?'));
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`/posts/${props.postId}`), {
      method: 'DELETE',
    });
    expect(props.setDisplayErrorMessage).toHaveBeenCalledWith('Failed to delete post');
  });
});
