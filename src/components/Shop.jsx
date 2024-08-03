import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Grid, Typography,
  Card, CardMedia,
  CardContent, CardActions, Button,
  Toolbar,
  Switch,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../config';
import EditPostLoading from './EditPostLoading';

export const sortPosts = ({ posts, filterInterested }) => {
  if (filterInterested) {
    return posts.filter((post) => post.interested_count > 0)
      .sort((a, b) => b.interested_count - a.interested_count);
  }
  return posts;
};
function Shop({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterInterested, setFilterInterested] = useState(false);
  const handleToggle = () => {
    setFilterInterested((prevState) => !prevState);
  };
  useEffect(() => {
    setLoading(true);
    const fetchItems = async () => {
      const response = await fetch(`${config.backend_url}/users/${user.id}/shop`);
      if (!response?.ok) {
        throw new Error('Could not fetch data');
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchItems();
  }, [user.id]);

  if (loading) {
    return <EditPostLoading title="Shop" />;
  }
  return (
    <Box>
      <Toolbar>
        <Box sx={{
          flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: 'cursive', color: 'primary.main', textAlign: 'center', flexGrow: 1,
            }}
            gutterBottom
          >
            My Shop
          </Typography>
          <div>
            <Switch data-testid="user-interested-switch" checked={filterInterested} onChange={handleToggle} />
            User Interested
          </div>
        </Box>
      </Toolbar>

      <Paper elevation={3} style={{ marginTop: '100px' }}>
        <Grid container spacing={4} justifyContent="center">
          { posts.length === 0
            ? (
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="20vh">
                <Typography variant="h6" color="textSecondary" sx={{ color: 'red', marginBottom: 2 }}>
                  No posts added. Create a post to see it in the list.
                </Typography>
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
              </Box>
            )
            : sortPosts({ posts, filterInterested }).map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card style={{ margin: '0 auto', width: '50vw' }} data-testid={`card-item-${item.id}`}>
                  <CardMedia
                    component="img"
                    height="250px"
                    image={item.imageUrl || 'https://via.placeholder.com/450?text=No+Image+Available'}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity:
                      {' '}
                      {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: $
                      {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Purchase Date:
                      {' '}
                      {item.purchaseDate}
                    </Typography>
                    {
              item.expiryDate && (
                <Typography variant="body2" color="text.secondary">
                  Expiry Date:
                  {' '}
                  {item.expiryDate}
                </Typography>
              )
            }
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" component={Link} to={`/posts/${item.id}`}>
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

        </Grid>
      </Paper>
    </Box>
  );
}

Shop.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
export default Shop;
