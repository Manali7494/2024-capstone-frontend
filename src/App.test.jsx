import React from 'react';
import { render, screen } from '@testing-library/react';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import App from './App';

jest.mock('aws-amplify/auth');

describe('App', () => {
  test('renders Header component', () => {
    getCurrentUser.mockResolvedValue(null);
    fetchAuthSession.mockResolvedValue(null);
    render(<App />);

    const textElements = screen.getAllByText('Healthy Wealthy');
    expect(textElements[0]).toBeInTheDocument();
  });

  test('fetch user details', () => {
    getCurrentUser.mockResolvedValue({
      userId: 'user:1',
      signInDetails: {
        loginId: 'email@email.com',
      },
    });
    fetchAuthSession.mockResolvedValue({
      userSub: 'user:Sub',
    });
    render(<App />);

    const textElements = screen.getAllByText('Healthy Wealthy');
    expect(textElements[0]).toBeInTheDocument();
  });
});
