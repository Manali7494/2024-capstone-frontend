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
    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
