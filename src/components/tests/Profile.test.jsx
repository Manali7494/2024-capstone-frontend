import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Profile from '../Profile';

global.fetch = jest.fn();

describe('Profile', () => {
  const user = { id: '123' };

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Profile', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      }),
    });
    render(<Profile user={user} />);

    // Profile
    expect(screen.getByText('Profile')).toBeInTheDocument();
    await expect(screen.findByTestId('name')).resolves.toBeInTheDocument();
    await expect(screen.findByTestId('username')).resolves.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('johndoe')).toBeInTheDocument();
    });

    // Contact Information
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    await expect(screen.findByTestId('contact-email')).resolves.toBeInTheDocument();
    await expect(screen.findByTestId('contact-number')).resolves.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Edit Contact' })).toBeInTheDocument();
  });

  test('verify contact information', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
      }),
    });

    render(<Profile user={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Edit Contact'));

    expect(screen.getByTestId('contact-email')).not.toBeDisabled();
    expect(screen.getByTestId('contact-number')).not.toBeDisabled();

    fireEvent.click(screen.getByText('Cancel'));
  });

  test('displays error messages for invalid email and phone number', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        name: 'Example User',
        username: 'exampleuser',
        email: '',
        phone: '',
      }),
    });
    render(<Profile user={user} />);
    fireEvent.click(screen.getByText('Edit Contact'));
    expect(screen.getByTestId('contact-email')).not.toBeDisabled();
    expect(screen.getByTestId('contact-number')).not.toBeDisabled();

    fireEvent.click(screen.getByTestId('save-button'));
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone number is required.')).toBeInTheDocument();
  });

  test('it saves updated contact information', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        name: 'Example User',
        username: 'exampleuser',
        email: 'test@gmail.com',
        phone: '123-456-7890',
      }),
    });
    render(<Profile user={user} />);
    fireEvent.click(screen.getByText('Edit Contact'));
    expect(screen.getByTestId('contact-email')).not.toBeDisabled();
    expect(screen.getByTestId('contact-number')).not.toBeDisabled();

    const contactNumberElement = screen.getByTestId('contact-number');
    const contactNumberInput = contactNumberElement.querySelector('input');
    fireEvent.change(contactNumberInput, { target: { value: '123-458-8970' } });

    fireEvent.click(screen.getByTestId('save-button'));
  });
});
