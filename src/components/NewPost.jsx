import React, { useState } from 'react';
import {
  TextField, Button,
  Box,
  Grid, Paper, Typography, InputAdornment,
  Alert,
  Snackbar,
} from '@mui/material';
import { PhotoCamera, CheckCircle } from '@mui/icons-material';
import PropTypes from 'prop-types';
import config from '../config';

function NewPost({ user }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [displayError, setDisplayErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!price.trim()) newErrors.price = 'Unit Price is required. It can be 0 if the item is free';
    if (!quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!purchaseDate.trim()) newErrors.purchaseDate = 'Purchase Date is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('healthy-wealthy-image', imageUrl);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('purchaseDate', purchaseDate);
    formData.append('expiryDate', expiryDate);
    formData.append('sellerId', user.id);

    try {
      await fetch(`${config.backend_url}/posts`, {
        method: 'POST',
        body: formData,
      });

      setSuccessMessage('Post created successfully');
    } catch (error) {
      setDisplayErrorMessage('Failed to create post');
    }
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Add New Post
          </Typography>
          {displayError && (
          <Alert severity="error" style={{ marginTop: '1em' }}>
            {displayError}
          </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />
            <Box>
              {imageUrl && (
              <Alert severity="success" style={{ marginTop: '1em' }}>
                Selected image:
                {imageUrl.name}
              </Alert>
              )}
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={imageUrl ? <CheckCircle /> : <PhotoCamera />}
                sx={{ backgroundColor: 'steelblue' }}
              >
                {imageUrl ? 'Image Selected' : 'Select Image'}
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
              error={!!errors.price}
              helperText={errors.price}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: {
                  step: 0.01,
                  min: 0,
                  max: 10000,
                },
                startAdornment: <InputAdornment position="start">$</InputAdornment>,

              }}
            />
            <TextField
              label="Quantity"
              type="number"
              error={!!errors.quantity}
              helperText={errors.quantity}
              inputProps={{ min: 0 }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Box display="flex" justifyContent="space-between">
              <TextField
                label="Purchase Date"
                type="date"
                error={!!errors.purchaseDate}
                helperText={errors.purchaseDate}
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>Create Post</Button>
          </form>
        </Paper>
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={5000}
          onClose={() => setSuccessMessage('')}
          message={successMessage}
        />
      </Grid>
    </Grid>
  );
}

NewPost.propTypes = {
  user: PropTypes.object.isRequired,
};
export default NewPost;
