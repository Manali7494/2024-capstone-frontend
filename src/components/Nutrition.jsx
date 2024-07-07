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
} from '@mui/icons-material';
import config from '../config';

function Nutrition({ postId }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nutritionDetails, setNutritionDetails] = useState(null);

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
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={toggleDrawer}>Nutrition</Button>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 300, padding: 2 }}>

          {isLoading ? (
            <Container sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',
            }}
            >

              <CircularProgress />
            </Container>
          ) : (
            <Box>

              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>Nutrition</Typography>
              </Box>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Calories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Chip label={nutritionDetails.calories} color="primary" />
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Macronutrients</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {Object.entries(nutritionDetails).filter(([key]) => ['fat', 'carbohydrate', 'fiber', 'sugar', 'protein'].includes(key)).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText primary={<Chip label={`${key.toUpperCase()}: ${parseFloat(value).toFixed(2)}`} />} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Diet Labels</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {nutritionDetails.diet_labels.map((label) => (
                      <ListItem key={label}>
                        <ListItemText primary={label} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Health Labels</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {nutritionDetails.health_labels.map((label) => (
                      <ListItem key={label}>
                        <ListItemText primary={label} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Box>
      </Drawer>
    </div>
  );
}

Nutrition.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default Nutrition;
