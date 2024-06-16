import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorPage from '../Error';

describe('ErrorPage', () => {
  test('renders ErrorPage with correct error message', () => {
    const errorMessage = 'Test error message';
    render(<ErrorPage errorMessage={errorMessage} />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
