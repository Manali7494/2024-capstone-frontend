import React from 'react';
import { render, screen } from '@testing-library/react';
import EditPost from '../EditPost';

describe('EditPost Component', () => {
  test('displays the correct heading', () => {
    render(<EditPost />);
    const heading = screen.getByRole('heading', { name: /edit post/i });
    expect(heading).toBeInTheDocument();
  });
});
