import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, TextField, Button, Paper, Box,
} from '@mui/material';
import Delete from './Delete';

function PostEdit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Paper sx={{ margin: '20px auto', maxWidth: 500, flexGrow: 1 }}>

      <Card>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        <CardContent>
          <Box mb={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Purchase Date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
          </Box>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Delete />
        </CardContent>
      </Card>
    </Paper>
  );
}

export default PostEdit;
