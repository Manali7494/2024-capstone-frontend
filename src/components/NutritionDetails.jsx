import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';

function NutritionDetails() {
  const [open, setOpen] = useState(false);

  const nutritionalDetails = {
    calories: 200,
    fat: 10,
    carbs: 30,
    protein: 5,
    // Add more nutritional details as needed
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button startIcon={<MenuIcon />} onClick={toggleDrawer}>
        Nutrition
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Typography variant="h6" style={{ margin: '1em' }}>
          Nutritional Details
        </Typography>
        <List>
          {Object.entries(nutritionalDetails).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={`${value}g`} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NutritionDetails;
