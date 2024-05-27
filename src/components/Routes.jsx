import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Home />)}
      />
      <Route
        path="/login"
        element={<Login onSubmit={() => {}} />}
      />
    </Routes>
  );
}

export default App;
