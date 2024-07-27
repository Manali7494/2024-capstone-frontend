import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactInformationDialog from '../ContactInformationDialog';

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ contact_email: 'test@example.com', contact_number: '123-456-7890' }),
}));

describe('ContactInformationDialog', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('opens the dialog and displays contact information', async () => {
    render(<ContactInformationDialog userId={1} />);

    fireEvent.click(screen.getByRole('button', { name: /contact information/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    await waitFor(() => screen.getByTestId('contact-email'));

    expect(screen.getByTestId('contact-email')).toBeInTheDocument();
    expect(screen.getByTestId('contact-number')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /ok/i }));
  });

  it('displays an error message when the fetch fails', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));
    render(<ContactInformationDialog userId={1} />);
    fireEvent.click(screen.getByRole('button', { name: /contact information/i }));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/users/1/contactInformation'));
  });
});
