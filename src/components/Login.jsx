/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  signIn,
} from 'aws-amplify/auth';
import {
  Button, TextField, Grid, Paper, Typography,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';

export const getErrorMessage = (err) => {
  let errorMessage = 'Error';
  switch (err.name) {
    case 'UserNotFoundException':
      errorMessage = 'User not found';
      break;
    case 'NotAuthorizedException':
      errorMessage = 'Incorrect password';
      break;
    case 'UserNotConfirmedException':
      errorMessage = 'User not confirmed';
      break;
    default:
      errorMessage = 'An error occurred during login';
  }
  return errorMessage;
};

function Login({ setUserDetails, setSnackbar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setDisplay('Invalid email');
      return;
    }

    try {
      await signIn({ username: email, password });
      setUserDetails();
      navigate('/');
      setSnackbar({ message: 'Login successful', open: true });
    } catch (err) {
      setDisplay(getErrorMessage(err));
    }
  };

  return (

    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {display && <Alert severity="error">{display}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="Email"
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput setPassword={setPassword} password={password} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '2em' }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {
  setUserDetails: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

export default Login;
