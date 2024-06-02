import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Create from './Create';
import List from './List';
import View from './View';
import Edit from './Edit';
import Shop from './Shop';
import Profile from './Profile';

function App() {
  const [user, setUser] = useState({
    username: 'test@gmail.com',
  });

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      {' '}
      {/* include the Header component */}

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
        <Route
          path="/new"
          element={<Create onSubmit={() => {}} />}
        />
        <Route
          path="/list"
          element={<List />}
        />
        <Route
          path="/view"
          element={<View />}
        />
        <Route
          path="/edit"
          element={<Edit />}
        />
        <Route
          path="/shop"
          element={<Shop />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </>
  );
}

export default App;
