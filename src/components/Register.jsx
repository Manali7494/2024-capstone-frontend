/* eslint-disable no-console */
import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import {
  Button, TextField, Grid, Paper, Typography,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PasswordInput from './PasswordInput';
import config from '../config';

export const isButtonDisabled = ({
  isPasswordValid, username, name, email, password, phoneNumber,
}) => {
  if (!Object.values(isPasswordValid).every(Boolean)) {
    return true;
  }
  if (!username || !name || !email || !password || !phoneNumber) {
    return true;
  }
  return false;
};

export const getErrorMessage = (err) => {
  let errorMessage = 'Error';
  switch (err.name) {
    case 'UsernameExistsException':
      errorMessage = 'Email already exists';
      break;
    default:
      errorMessage = 'An error occurred during registration';
  }

  return errorMessage;
};

function Register({ setUser, setSnackbar }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [display, setDisplay] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState({
    length: false,
    letter: false,
    specialChar: false,
    number: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setDisplay('Invalid email');
      return;
    }

    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            phone_number: `+1${phoneNumber.replace(/-/g, '')}`,
            preferred_username: username,
            name,
          },

        },
      });

      const { userId = '' } = result || {};
      navigate('/');

      await fetch(`${config.backend_url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          username,
          name,
          phoneNumber,
        }),
      });

      setUser({
        id: userId,
        email,
      });

      setSnackbar({ message: 'Registration successful', open: true });
    } catch (err) {
      setDisplay(getErrorMessage(err));
    }
  };
  return (

    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          {display && <Alert severity="error">{display}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="Username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Name"
              type="text"
              id="name"
              inputProps={{ 'data-testid': 'name' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Email"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              setPassword={setPassword}
              password={password}
              isPasswordValid={isPasswordValid}
              setIsPasswordValid={setIsPasswordValid}
            />
            <TextField
              required
              fullWidth
              margin="normal"
              label="Phone Number"
              type="tel"
              id="phoneNumber"
              placeholder="123-456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '2em' }}
              disabled={isButtonDisabled({
                isPasswordValid, username, name, email, password, phoneNumber,
              })}
            >
              Register
            </Button>

          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

Register.propTypes = {
  setUser: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};

export default Register;
