import React from 'react';
import {
  Typography, Button, Container, Box,
  Card, CardContent, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SuggestedPosts from './SuggestedPosts';

function Home({ user }) {
  return (
    <Container>
      <Box display="flex">
        <Box
          width="30vw"
          height="90vh"
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Box flex="1" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <Typography variant="h3" component="h1" sx={{ fontFamily: 'cursive', color: 'primary.main' }} gutterBottom>
            Healthy Wealthy
          </Typography>
          {!user ? (
            <Card>
              <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ color: 'red' }}>
                  Please login or register
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <>
              <Typography variant="h4" component="h4" gutterBottom align="center">
                Welcome
                {' '}
                {user.email}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Typography variant="h6">
                  Explore features of Healthy Wealthy App.
                </Typography>
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      data-testId="profile"
                      to="/profile"
                      fullWidth
                    >
                      Profile
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      data-testId="shop"
                      to="/shop"
                      fullWidth
                    >
                      Your Shop
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      data-testId="view-posts"
                      to="/posts"
                      fullWidth
                    >
                      View Posts
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      data-testId="add-post"
                      to="/new"
                      fullWidth
                    >
                      Create Post
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <div>
                <SuggestedPosts user={user} />
              </div>
            </>
          )}
        </Box>
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
