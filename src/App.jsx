import './App.css';
import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header user={user} setUser={setUser} />
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
