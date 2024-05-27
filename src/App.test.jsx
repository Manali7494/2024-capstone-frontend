import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: () => <div data-testid="router"><h1> Router </h1></div>,
}));

test('renders Router component', () => {
  render(<App />);

  const routerElement = screen.getByTestId('router');
  expect(routerElement).toBeInTheDocument();
});
