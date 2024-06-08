/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  signIn, getCurrentUser,
  signOut,
  fetchAuthSession,
} from 'aws-amplify/auth';
import {
  Button, TextField, Grid, Paper, Typography,
} from '@mui/material';
import { Alert } from '@mui/lab';
import PasswordInput from './PasswordInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('');
  const [user, setUser] = useState(null);
  const setUserDetails = async () => {
    const userDetails = await getCurrentUser();
    setUser(userDetails);
  };
  const getUser = async () => {
    try {
      const authSession = await fetchAuthSession();
      if (authSession?.userSub) {
        setUserDetails();
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await signOut({ global: true });
    setUser(null);
    setDisplay('Signed out successfully');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setDisplay('Invalid email');
      return;
    }

    try {
      await signIn({ username: email, password });
      setDisplay('Signed in successfully');
      setUserDetails();
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (

    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {display && <Alert severity="info">{display}</Alert>}

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
            {user ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: '2em' }}
                id="signout"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : null}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {};

export default Login;
