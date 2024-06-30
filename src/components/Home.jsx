import React from 'react';
import {
  Typography, Button, Container, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Home({ user }) {
  if (!user) {
    return (
      <Container>
        <Typography variant="h5" component="h2">
          Please login or register
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h4" gutterBottom align="center">
        Welcome
        {' '}
        {user.email}
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h6">
          Explore features of Healthy Wealthy App.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          data-testId="view-posts"
          to="/posts"
        >
          View Posts
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          data-testId="add-post"
          to="/new"
        >
          Create New Post
        </Button>
      </Box>
    </Container>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
};

Home.defaultProps = {
  user: null,
};

export default Home;
