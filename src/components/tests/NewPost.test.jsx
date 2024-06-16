import React from 'react';
import { render, screen } from '@testing-library/react';
import NewPost from '../NewPost';

describe('NewPost', () => {
  test('renders NewPost with correct title', () => {
    render(<NewPost />);

    expect(screen.getByText('Create Post')).toBeInTheDocument();
  });
});
