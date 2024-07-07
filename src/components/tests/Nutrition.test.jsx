import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Nutrition from '../Nutrition';

const mockProps = {
  postId: 'post:1',
};
const mockNutritionData = {
  calories: '200',
  dietLabels: ['Low-Carb'],
  healthLabels: ['Sugar-Conscious'],
  macronutrients: {
    fat: '10g',
    carbohydrate: '20g',
    fiber: '5g',
    sugar: '2g',
    protein: '15g',
  },
};

describe('Nutrition Component Tests', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockNutritionData),
  }));

  it('Nutrition button is displayed', () => {
    render(<Nutrition {...mockProps} />);
    expect(screen.getByRole('button', { name: /nutrition/i })).toBeInTheDocument();
  });

  it('Drawer appears with loading indicator', async () => {
    render(<Nutrition {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Drawer shows content', async () => {
    render(<Nutrition {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
    await waitFor(() => expect(screen.getByTestId('drawer-content')).toBeInTheDocument());
  });

  it('Drawer shows following headings: calories, diet labels, health labels, macronutrients', async () => {
    render(<Nutrition {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
    await waitFor(() => {
      expect(screen.getByText(/calories/i)).toBeInTheDocument();
      expect(screen.getByText(/diet labels/i)).toBeInTheDocument();
      expect(screen.getByText(/health labels/i)).toBeInTheDocument();
      expect(screen.getByText(/macronutrients/i)).toBeInTheDocument();
    });
  });

  it('Drawer contains following subheadings of macronutrients: fat, carbohydrate, fiber, sugar, and protein', async () => {
    render(<Nutrition {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
    await waitFor(() => {
      expect(screen.getByText(/fat/i)).toBeInTheDocument();
      expect(screen.getByText(/carbs/i)).toBeInTheDocument();
      expect(screen.getByText(/fiber/i)).toBeInTheDocument();
      expect(screen.getByText(/sugar/i)).toBeInTheDocument();
      expect(screen.getByText(/protein/i)).toBeInTheDocument();
    });
  });
});
