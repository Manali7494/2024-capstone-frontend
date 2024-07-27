import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import NewPost from './NewPost';
import ErrorPage from './Error';
import EditPost from './EditPost';
import ViewPost from './ViewPost';
import { PostList } from './PostList';
import Profile from './Profile';

function AppRoutes({
  setUserDetails, setUser, setSnackbar, user,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Home user={user} />)}
      />

      <Route
        path="/login"
        element={user ? <Navigate to="/" />
          : <Login setUserDetails={setUserDetails} setSnackbar={setSnackbar} />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" />
          : <Register setUser={setUser} setSnackbar={setSnackbar} />}
      />
      <Route
        path="/new"
        element={user ? <NewPost user={user} /> : <ErrorPage errorMessage="Cannot visit page to create new post. Please login or register " />}
      />
      <Route
        path="/posts/:id/edit"
        element={user ? <EditPost user={user} /> : <ErrorPage errorMessage="Cannot edit post" />}
      />
      <Route
        path="/posts/:id"
        element={user ? <ViewPost user={user} /> : <ErrorPage errorMessage="Cannot view post" />}
      />
      <Route
        path="/posts"
        element={(user
          ? <PostList /> : <ErrorPage errorMessage="Cannot view posts. Please login" />)}
      />
      <Route
        path="/profile"
        element={(user
          ? <Profile user={user} /> : <ErrorPage errorMessage="Cannot edit profile. Please login" />)}
      />

    </Routes>
  );
}

AppRoutes.defaultProps = {
  setUserDetails: () => {},
  user: null,
};

AppRoutes.propTypes = {
  setUserDetails: PropTypes.func,
  setUser: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

export default AppRoutes;
