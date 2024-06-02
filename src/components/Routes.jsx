import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

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
      <Route
        path="/register"
        element={<Register onSubmit={() => {}} />}
      />
    </Routes>
  );
}

export default App;