import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ user, onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'cursive' }}>
            App
          </Typography>
        </IconButton>
        {!user && (
          <>
            <Button color="inherit" component={Link} to="/register" sx={{ ml: 'auto' }}>
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
        {user && (
          <>
            <Button color="inherit" component={Link} to="/new">
              Create Post
            </Button>
            <Typography variant="subtitle1" style={{ marginRight: '1em' }} sx={{ ml: 'auto' }}>
              Logged in as
              {' '}
              {user.username}
            </Typography>

            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

Header.defaultProps = {
  user: null,
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};
