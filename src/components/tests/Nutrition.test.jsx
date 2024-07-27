import React from 'react';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Nutrition, { NutritionDrawer } from '../Nutrition';

const mockNutritionData = {
  calories: '200',
  diet_labels: ['Low-Carb'],
  health_labels: ['Sugar-Conscious'],
  macronutrients: {
    fat: '10g',
    carbohydrate: '20g',
    fiber: '5g',
    sugar: '2g',
    protein: '15g',
  },
};

describe('Nutrition', () => {
  describe('Nutrition Drawer', () => {
    const mockNutritionDrawerProps = {
      isDrawerOpen: true,
      toggleDrawer: jest.fn(),
      isLoading: false,
      nutritionDetails: mockNutritionData,
    };

    it('Nutrition button is displayed', () => {
      const props = {
        ...mockNutritionDrawerProps,
        isDrawerOpen: false,
      };
      render(<NutritionDrawer {...props} />);
      expect(screen.getByRole('button', { name: /nutrition/i })).toBeInTheDocument();
    });

    it('Drawer appears with loading indicator', async () => {
      const props = { ...mockNutritionDrawerProps, isLoading: true };
      render(<NutritionDrawer {...props} />);
      expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
    });

    it('Drawer shows content', async () => {
      render(<NutritionDrawer {...mockNutritionDrawerProps} />);
      await waitFor(() => expect(screen.getByTestId('drawer-content')).toBeInTheDocument());
    });

    it('Drawer shows following accordion headings: calories, diet labels, health labels, macronutrients', async () => {
      render(<NutritionDrawer {...mockNutritionDrawerProps} />);
      await waitFor(() => {
        expect(screen.getByText(/calories/i)).toBeInTheDocument();
        expect(screen.getByText(/diet labels/i)).toBeInTheDocument();
        expect(screen.getByText(/health labels/i)).toBeInTheDocument();
        expect(screen.getByText(/macronutrients/i)).toBeInTheDocument();
      });
    });

    it('Drawer expands with its data', async () => {
      render(<NutritionDrawer {...mockNutritionDrawerProps} />);

      await waitFor(() => expect(screen.getByText(/macronutrients/i)).toBeInTheDocument());
      screen.getByText(/macronutrients/i).click();
      await waitFor(() => expect(screen.getByText(/calories/i)).toBeInTheDocument());
    });

    it('should render No valid nutrition details if no valid nutritional data', () => {
      const props = {
        ...mockNutritionDrawerProps,
        nutritionDetails: {
          calories: 0,
        },
      };
      render(<NutritionDrawer {...props} />);
      expect(screen.getByText(/No valid nutrition details/i)).toBeInTheDocument();
    });
  });

  describe('Nutrition Component', () => {
    const mockPostId = '123';
    const mockUser = { id: 'user1' };
    it('renders Nutrition', () => {
      const { getByText } = render(<Nutrition postId={mockPostId} user={mockUser} />);
      expect(getByText(/Nutrition/i)).toBeInTheDocument();
    });

    it('renders drawer', async () => {
      render(<Nutrition postId={mockPostId} user={mockUser} />);
      fireEvent.click(screen.getByRole('button', { name: /nutrition/i }));
      expect(screen.getByTestId(/loading/i)).toBeInTheDocument();

      await waitFor(() => expect(screen.getByTestId('drawer-content')).toBeInTheDocument());
    });
  });
});
