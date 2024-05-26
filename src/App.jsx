import './App.css';
import React from 'react';
import { Amplify } from 'aws-amplify';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import awsconfig from './aws-exports';
import Routes from './components/Routes';
import Title from './components';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <Title />
        </header>
      </div>
      <Routes />
    </Router>
  );
}

export default App;
