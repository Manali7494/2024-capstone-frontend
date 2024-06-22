import React, { useState } from 'react';
import {
  TextField, Button,
  Box,
  Grid, Paper, Typography, InputAdornment,
  Alert,
} from '@mui/material';
import { PhotoCamera, CheckCircle } from '@mui/icons-material';
import PropTypes from 'prop-types';

const post = {
  name: 'Apple',
  description: 'Fresh apple',
  price: 1.99,
  quantity: 10,
  purchaseDate: '2024-10-01',
  expiryDate: '2024-10-31',
};
function EditPost({ user }) {
  const [name, setName] = useState(post.name);
  const [description, setDescription] = useState(post.description);
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(post.price.toString());
  const [quantity, setQuantity] = useState(post.quantity.toString());
  const [purchaseDate, setPurchaseDate] = useState(post.purchaseDate);
  const [expiryDate, setExpiryDate] = useState(post.expiryDate);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('user', user);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Edit Post for
            {' '}
            {post.name}

          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box>
              {imageUrl && (
              <Alert severity="success" style={{ marginTop: '1em' }}>
                Image selected
              </Alert>
              )}
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={imageUrl ? <CheckCircle /> : <PhotoCamera />}
                sx={{ backgroundColor: 'steelblue' }}
              >
                {imageUrl ? 'Change Image' : 'Select Image'}
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
              </Button>
            </Box>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0 },
              }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { min: 0 },
              }}
            />
            <Box display="flex" justifyContent="space-between">
              <TextField
                label="Purchase Date"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>Update Post</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

EditPost.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditPost;
