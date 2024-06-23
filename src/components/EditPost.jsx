/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  TextField, Button,
  Box,
  Grid, Paper, Typography, InputAdornment, Snackbar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import EditPostLoading from './EditPostLoading';
import config from '../config';

function EditPost({ user }) {
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [post, setPost] = useState({});

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setLoading(true);
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${config.backend_url}/posts/${id}`);
        if (!response.ok) {
          throw new Error('Could not fetch post data');
        }
        const data = await response.json();
        setPost({
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          imageUrl: data.imageUrl,
          quantity: data.quantity.toString(),
          purchaseDate: data.purchaseDate,
          expiryDate: data.expiryDate,
        });
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', post.name);
    formData.append('description', post.description);
    formData.append('healthy-wealthy-image', imageFile);
    formData.append('price', post.price);
    formData.append('quantity', post.quantity);
    formData.append('purchaseDate', post.purchaseDate);
    formData.append('expiryDate', post.expiryDate);
    formData.append('sellerId', user.id);

    await fetch(`${config.backend_url}/posts/${post.id}`, {
      method: 'POST',
      body: formData,
    });

    setSuccessMessage('Post updated successfully');
  };

  if (loading) {
    return <EditPostLoading />;
  }

  const showImage = Boolean(post.imageUrl) || Boolean(imagePreviewUrl);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Edit Post
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={post.name}
              data-testid="name"
              onChange={(e) => setPost((p) => ({ ...p, name: e.target.value }))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={post.description}
              data-testid="description"
              onChange={(e) => setPost((p) => ({ ...p, description: e.target.value }))}
              fullWidth
              margin="normal"
            />
            <Box style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1em',
            }}
            >
              {(showImage) && (
              <Box style={{ marginTop: '1em' }}>
                <img src={imagePreviewUrl || post.imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
              )}
            </Box>
            <Box>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<PhotoCamera />}
                sx={{ backgroundColor: 'steelblue' }}
              >
                Select Image
                <input
                  type="file"
                  data-testid="image"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
            <TextField
              label="Price"
              type="number"
              data-testid="price"
              value={post.price}
              onChange={(e) => setPost((p) => ({ ...p, price: e.target.value }))}
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
              data-testid="quantity"
              value={post.quantity}
              onChange={(e) => setPost((p) => ({ ...p, quantity: e.target.value }))}
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
                value={post.purchaseDate}
                onChange={(e) => setPost((p) => ({ ...p, purchaseDate: e.target.value }))}
                fullWidth
                margin="normal"
                data-testid="purchaseDate"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Expiry Date"
                type="date"
                value={post.expiryDate}
                onChange={(e) => setPost((p) => ({ ...p, expiryDate: e.target.value }))}
                fullWidth
                margin="normal"
                data-testid="expiryDate"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>Update Post</Button>
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

EditPost.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditPost;
