import React from 'react';
import {
  render, fireEvent, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog';

describe('DeleteConfirmationDialog', () => {
  const props = {
    onDeleteConfirm: jest.fn(),
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

  it('clicking the "Delete" button in the dialog calls onDeleteConfirm and closes the dialog', async () => {
    render(<DeleteConfirmationDialog {...props} />);
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Yes, Delete'));

    expect(props.onDeleteConfirm).toHaveBeenCalled();
    await waitForElementToBeRemoved(() => screen.queryByText('Are you sure you want to delete?'));
  });
});
