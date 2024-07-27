import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Typography, Button, Container, Box,
  Paper,
} from '@mui/material';
import config from '../config';

function Profile({ user }) {
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch(`${config.backend_url}/users/${user.id}/profile`);
      if (!response?.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfileData(data);
    }

    fetchProfile();
  }, [user]);

  return (
    <Container>
      <Typography
        variant="h4"
        component="div"
        sx={{ fontFamily: 'cursive', color: 'primary.main', textAlign: 'center' }}
        gutterBottom
      >
        Profile
      </Typography>
      <Box my={2}>
        <TextField
          label="Name"
          id="name"
          value={profileData.name}
          disabled
          fullWidth
          margin="normal"
          data-testid="name"
        />
      </Box>
      <Box my={2}>
        <TextField
          label="Username"
          id="username"
          value={profileData.username}
          disabled
          fullWidth
          margin="normal"
          data-testid="username"
        />
      </Box>
      <Paper elevation={3} sx={{ padding: 2 }}>

        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: 'center' }}
          gutterBottom
        >
          Contact Information
        </Typography>
        <Box my={2}>
          <TextField
            label="Contact Email"
            id="email"
            value={profileData.email}
            disabled
            fullWidth
            margin="normal"
            data-testid="contact-email"
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Contact Number"
            id="phone"
            value={profileData.phone}
            disabled
            fullWidth
            margin="normal"
            data-testid="contact-number"
          />
        </Box>
        <Button variant="contained" color="primary" type="button">Edit Contact</Button>
      </Paper>
    </Container>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
