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

  it('without user renders Home component when at /', () => {
    setup('/', { user: null });
    expect(screen.getByText('Please login or register')).toBeInTheDocument();
  });

  it('with user renders Home component when at /', () => {
    setup('/', { user: { email: 'email@email.com' } });
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
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

  it('without user at /edit, it renders Error page with proper error message', () => {
    setup('/posts/1/edit', { user: null });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot edit post')).toBeInTheDocument();
  });

  it('with user at /edit, it renders Edit Post page', async () => {
    setup('/posts/1/edit', { user: { email: 'email@email.com' } });
    expect(screen.getByText(/edit post/i)).toBeInTheDocument();
  });

  it('with user at /posts, it renders PostList component', () => {
    setup('/posts', { user: { email: 'user@example.com' } });
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });

  it('without user at /posts, it renders ErrorPage with proper message', () => {
    setup('/posts', { user: null });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot view posts. Please login')).toBeInTheDocument();
    expect(screen.queryByLabelText('Search')).not.toBeInTheDocument();
  });

  it('with user at /posts/:id, it renders ViewPost component', async () => {
    setup('/posts/1', { user: { email: 'user@example.com' } });
    expect(screen.getByText(/view post/i)).toBeInTheDocument();
  });

  it('without user at /posts/:id, it renders ErrorPage with proper message', () => {
    setup('/posts/1', { user: null });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot view post')).toBeInTheDocument();
  });

  it('without user at /profile, it renders ErrorPage with proper message', () => {
    setup('/profile', { user: null });
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Cannot edit profile. Please login')).toBeInTheDocument();
  });

  it('with user at /profile, it renders ProfilePage', () => {
    const user = { id: '123' };
    setup('/profile', { user });
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
