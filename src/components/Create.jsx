import React, { useState } from 'react';
import {
  TextField, Button,
  Grid, Paper, Typography, InputAdornment,
} from '@mui/material';

function CreatePostForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Create Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />
            {/* Add support for custom image using S3 */}
            <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth margin="normal" />
            <TextField label="Date of Purchase" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth margin="normal" />
            <TextField
              label="Price"
              type="number"
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
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreatePostForm;
