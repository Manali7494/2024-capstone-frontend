/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Drawer,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import {
  ExpandMore,
  Menu as MenuIcon,
} from '@mui/icons-material';
import config from '../config';
// Helpers
function NutritionAccordion({ title, children }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

NutritionAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Drawer
export function NutritionDrawer({
  isDrawerOpen, toggleDrawer, isLoading, nutritionDetails,
}) {
  return (
    <div>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" onClick={toggleDrawer} startIcon={<MenuIcon />}>Nutrition</Button>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>

          {isLoading ? (
            <Container sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
            }}
            >

              <CircularProgress data-testId="Loading" />
            </Container>
          ) : (
            <Box data-testid="drawer-content">

              <Box textAlign="center">

                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: 'cursive', color: 'primary.main', textAlign: 'center' }}
                  gutterBottom
                >
                  Nutrition
                </Typography>
              </Box>
              { !parseInt(nutritionDetails.calories, 10) ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="h6" style={{ color: 'red', fontStyle: 'italic' }}>
                    No valid nutrition details
                  </Typography>
                </Box>
              ) : (
                <>
                  <NutritionAccordion title="Calories">
                    <Chip label={nutritionDetails.calories} color="primary" />
                  </NutritionAccordion>

                  <NutritionAccordion title="Macronutrients">
                    <List>
                      {Object.entries(nutritionDetails)
                        .filter(([key]) => ['fat', 'carbohydrate', 'fiber', 'sugar', 'protein']
                          .includes(key))
                        .map(([key, value]) => (
                          <ListItem key={key}>
                            <ListItemText primary={(
                              <Chip
                                label={`${key.toUpperCase()}: ${parseFloat(value).toFixed(2)}`}
                              />
                            )}
                            />
                          </ListItem>
                        ))}
                    </List>
                  </NutritionAccordion>

                  <NutritionAccordion title="Diet Labels">
                    <List data-testid="macronutrients">
                      {nutritionDetails.diet_labels.map((label) => (
                        <ListItem key={label}>
                          <ListItemText data-testid={label} primary={label} />
                        </ListItem>
                      ))}
                    </List>
                  </NutritionAccordion>

                  <NutritionAccordion title="Health Labels">
                    <List>
                      {nutritionDetails.health_labels.map((label) => (
                        <ListItem key={label}>
                          <ListItemText primary={label} />
                        </ListItem>
                      ))}
                    </List>
                  </NutritionAccordion>
                </>
              )}
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
}

NutritionDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  nutritionDetails: PropTypes.shape({
    calories: PropTypes.number,
    diet_labels: PropTypes.arrayOf(PropTypes.string),
    health_labels: PropTypes.arrayOf(PropTypes.string),
    macronutrients: PropTypes.shape({
      fat: PropTypes.number,
      carbs: PropTypes.number,
      fiber: PropTypes.number,
      sugar: PropTypes.number,
      protein: PropTypes.number,
    }),
  }).isRequired,
};

function Nutrition({ postId, user }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
      const response = await fetch(`${config.backend_url}/posts/${postId}/nutrition?userId=${user.id}`);
      if (!response?.ok) {
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
    <NutritionDrawer
      toggleDrawer={toggleDrawer}
      isLoading={isLoading}
      nutritionDetails={nutritionDetails}
      isDrawerOpen={isDrawerOpen}
    />
  );
}

Nutrition.propTypes = {
  postId: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default Nutrition;
