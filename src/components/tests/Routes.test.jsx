import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../Routes';

describe('Routes', () => {
  const mockProps = {
    setUserDetails: jest.fn(),
    setUser: jest.fn(),
    setSnackbar: jest.fn(),
    user: null,
  };
  const setup = (path, props = {}) => render(
    <MemoryRouter initialEntries={[path]}>
      <Routes {...mockProps} {...props} />
    </MemoryRouter>,
  );

  it('renders Home component when at /', () => {
    setup('/');
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Login component when at /login', () => {
    setup('/login');
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders Register component when at /register', () => {
    setup('/register');
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('with user redirects to / in /Login', () => {
    setup('/login', { user: { email: 'email@email.com' } });
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
  });

  it('with user redirects to / in /Register', () => {
    setup('/register', { user: { email: 'email@email.com' } });
    expect(screen.queryByRole('button', { name: /register/i })).not.toBeInTheDocument();
  });
});
