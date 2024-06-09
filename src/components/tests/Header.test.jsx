import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

const { getByRole, getByText } = screen;
const mockProps = {
  user: null,
};
const setup = (
  props = mockProps,
) => render(<Router><Header {...props} /></Router>);

describe('Header', () => {
  test('renders Healthy Wealthy title', () => {
    setup();
    const title = getByText(/Healthy Wealthy/i);
    expect(title).toBeInTheDocument();
  });

  test('renders Register and Login buttons when user is not logged in', () => {
    setup();
    const registerButton = getByRole('link', { name: /Register/i });
    const loginButton = getByRole('link', { name: /Login/i });
    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
