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

  it('without user at /new, it renders Error page with proper error message', () => {
    setup('/new', { user: null });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot visit page to create new post. Please login or register')).toBeInTheDocument();
  });

  it('with user renders NewPost with /new', () => {
    setup('/new', { user: { email: 'email@email.com' } });
    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });
});
