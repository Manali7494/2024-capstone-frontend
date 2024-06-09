import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  signOut,
} from 'aws-amplify/auth';

function Header({
  user, setUser, setSnackbar,
}) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut({ global: true });
    setUser(null);
    setSnackbar({ open: true, message: 'Signed out successfully' });
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'cursive' }}>
            Healthy Wealthy
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
          <Typography variant="subtitle1" style={{ marginRight: '1em' }} sx={{ ml: 'auto' }}>
            Logged in as:
            {user.email}
          </Typography>

          <Button color="inherit" id="signout" onClick={handleSignOut}>
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
    email: PropTypes.string.isRequired,
  }),
  setUser: PropTypes.func.isRequired,
  setSnackbar: PropTypes.func.isRequired,
};
