import React from 'react';
import {
  Card, CardContent, CardMedia, TextField, Paper, Box, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ContactInformation from './ContactInformation';
import NutritionalDetails from './NutritionDetails';

function PostEdit() {
  const post = {
    name: 'Item 1',
    description: 'Description',
    image: 'https://via.placeholder.com/150',
    purchaseDate: '2021-01-01',
    expiryDate: '2022-01-01',
    quantity: 5,
    price: 10,
  };
  const {
    name, description, image, purchaseDate, expiryDate, quantity, price,
  } = post;
  return (
    <Paper sx={{ margin: '20px auto', maxWidth: 500, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton component={Link} to="/edit">
          <EditIcon />
        </IconButton>
        <ContactInformation />
      </Box>
      <Card>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        <CardContent>
          <Box display="flex" justifyContent="flex-end">
            <NutritionalDetails open onClose={() => {}} />
          </Box>
          <Box mb={2}>
            <TextField
              label="Name"
              value={name}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              value={description}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Image URL"
              value={image}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Purchase Date"
              value={purchaseDate}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Expiry Date"
              value={expiryDate}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Quantity"
              value={quantity}
              disabled
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Price"
              value={price}
              disabled
              fullWidth
            />
          </Box>
        </CardContent>
      </Card>

    </Paper>
  );
}

export default PostEdit;
