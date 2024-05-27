import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../Routes';

describe('Routes', () => {
  it('renders Home component when at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(screen.getByText('Healthy Wealthy')).toBeInTheDocument();
  });

  it('renders Login component when at /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
