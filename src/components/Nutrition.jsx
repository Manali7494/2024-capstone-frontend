/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import config from '../config';

function Nutrition({ postId }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nutritionDetails, setNutritionDetails] = useState({
    calories: 0,
    diet_labels: [],
    health_labels: [],
    macronutrients: {
      fat: 0,
      carbs: 0,
      fiber: 0,
      sugar: 0,
      protein: 0,
    },
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.backend_url}/posts/${postId}/nutrition`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNutritionDetails(data);
    } catch (error) {
      console.error('There was an error fetching the nutrition details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (!isDrawerOpen) fetchData();
  };

  return (
    <div>
      <button type="submit" onClick={toggleDrawer}>Nutrition</button>
      {isDrawerOpen && (
        <div
          style={{
            overflowY: 'auto',
            position: 'fixed',
            top: 0,
            right: 0,
            width: '300px',
            height: '100%',
            background: 'white',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div data-testid="drawer-content">
              <h2>Nutrition</h2>

              <h4>Calories</h4>
              <p>{nutritionDetails.calories}</p>
              <h4>Macronutrients</h4>
              <ul>
                <li>
                  Fat:
                  {nutritionDetails.fat}
                </li>
                <li>
                  Carbs:
                  {nutritionDetails.carbs}
                </li>
                <li>
                  Fiber:
                  {nutritionDetails.fiber}
                </li>
                <li>
                  Sugar:
                  {nutritionDetails.sugar}
                </li>
                <li>
                  Protein:
                  {nutritionDetails.protein}
                </li>
              </ul>
              <h4>Diet Labels</h4>
              <ul>{nutritionDetails.diet_labels.map((label) => <li key={label}>{label}</li>)}</ul>
              <h4>Health Labels</h4>
              <ul>{nutritionDetails.health_labels.map((label) => <li key={label}>{label}</li>)}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Nutrition.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Nutrition;
