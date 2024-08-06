/* eslint-disable no-console */
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
  const [editMode, setEditMode] = useState(false);
  const [contactInformation, setContactInformation] = useState(profileData);
  const [errors, setErrors] = useState({ email: null, phone: null });

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch(`${config.backend_url}/users/${user.id}/profile`);
      const data = await response.json();
      setProfileData(data);
      setContactInformation(data);
    }

    fetchProfile();
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = { email: null, phone: null };
    let valid = true;
    if (!contactInformation.email) {
      newErrors.email = 'Email is required.';
      valid = false;
    }

    if (!contactInformation.phone) {
      newErrors.phone = 'Phone number is required.';
      valid = false;
    }

    if (valid) {
      await fetch(`${config.backend_url}/users/${user.id}/contactInformation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: contactInformation.email,
          phone: contactInformation.phone,
        }),
      });

      setProfileData(contactInformation);
      setEditMode(false);
      setErrors({ phone: null, email: null });
    } else {
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setContactInformation(profileData);
    setEditMode(false);
    setErrors({ email: null, phone: null });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContactInformation((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

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
            value={contactInformation.email}
            onChange={handleChange}
            disabled={!editMode}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            data-testid="contact-email"
          />
        </Box>
        <Box my={2}>
          <TextField
            label="Contact Number"
            id="phone"
            value={contactInformation.phone}
            onChange={handleChange}
            disabled={!editMode}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
            margin="normal"
            data-testid="contact-number"
          />
        </Box>
        {editMode ? (
          <>
            <Button variant="contained" color="primary" type="button" data-testid="save-button" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="secondary" type="button" data-testid="cancel-button" onClick={handleCancel} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" color="primary" type="button" data-testid="edit-button" onClick={handleEdit}>
            Edit Contact
          </Button>
        )}
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
