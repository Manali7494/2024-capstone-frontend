import './App.css';
import React from 'react';
import { Amplify } from 'aws-amplify';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import awsconfig from './aws-exports';
import Routes from './components/Routes';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
