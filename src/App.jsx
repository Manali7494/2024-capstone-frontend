/* eslint-disable no-console */
import './App.css';
import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  getCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';
import Snackbar from '@mui/material/Snackbar';
import awsconfig from './aws-exports';
import Routes from './components/Routes';
import Header from './components/Header';

Amplify.configure(awsconfig);
const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3', // blue
    },
    secondary: {
      main: '#4caf50', // green
    },
    background: {
      default: '#ffffff', // white
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [snackBar, setSnackbar] = useState({
    message: '',
    open: false,
  });

  const setUserDetails = async () => {
    const userDetails = await getCurrentUser();
    if (userDetails) {
      setUser({ id: userDetails.userId, email: userDetails.signInDetails.loginId });
    }
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header
          user={user}
          setUser={setUser}
          setUserDetails={setUserDetails}
          setSnackbar={setSnackbar}
        />
        <Routes
          user={user}
          setUser={setUser}
          setUserDetails={setUserDetails}
          setSnackbar={setSnackbar}
        />
        <Snackbar
          open={snackBar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar({ open: false })}
          message={snackBar.message}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
