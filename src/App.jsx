import './App.css';
import React from 'react';
import Title from './components';

function App() {
  return (
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
  );
}

export default App;
