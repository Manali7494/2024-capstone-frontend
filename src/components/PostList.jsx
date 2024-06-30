import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TextField,
  Grid, Paper, Typography, Box, InputAdornment,
  Card, CardActions, CardMedia, CardContent, IconButton,
  Button,

} from '@mui/material';
import {
  Search, Clear,
} from '@mui/icons-material';
import config from '../config';

export function Post({ posts, search, setSearch }) {
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Posts
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="clearSearch" onClick={() => setSearch('')}>
                    <Clear color="primary" />
                  </IconButton>
                  <IconButton aria-label="textSearch" onClick={() => setSearch(search)}>
                    <Search color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ marginTop: '100px' }}>
        <Grid container spacing={4} justifyContent="center">
          {posts.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card style={{ margin: '0 auto', width: '50vw' }}>
                <CardMedia
                  component="img"
                  height="250px"
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity:
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
                        {item.expiryDate}
                      </Typography>
                      )
                    }
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} to={`/posts/${item.id}/edit`}>
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

Post.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${config.backend_url}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return <Post posts={posts} search={search} setSearch={setSearch} />;
}

export default PostList;

PostList.propTypes = {
};
