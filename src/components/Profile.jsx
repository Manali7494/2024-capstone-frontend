import React, { useState } from 'react';
import {
  TextField, Button,
  Grid, Paper, Typography,
} from '@mui/material';

function CreatePostForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" disabled value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
            <TextField label="Password" disabled type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
            <TextField label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth margin="normal" />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1em' }}>
              Update
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CreatePostForm;
