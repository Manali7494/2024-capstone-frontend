import React from 'react';
import { render, screen } from '@testing-library/react';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import App from './App';

jest.mock('aws-amplify/auth');

describe('App', () => {
  beforeEach(() => {
    getCurrentUser.mockResolvedValue(null);
    fetchAuthSession.mockResolvedValue(null);
  });

  test('renders Header component', () => {
    render(<App />);

    const textElement = screen.getByText('Healthy Wealthy');
    expect(textElement).toBeInTheDocument();
  });
});
