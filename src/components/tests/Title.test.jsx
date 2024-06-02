import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from '../Title';

test('Add title link', () => {
  render(<Title />);
  const title = screen.getByText(/Healthy Wealthy/i);
  expect(title).toBeInTheDocument();
});