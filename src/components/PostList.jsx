import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Typography, Box,
  Card, CardActions, CardMedia, CardContent,
  Button,
} from '@mui/material';
import config from '../config';
import EditPostLoading from './EditPostLoading';
import PostSort from './PostSort';
import PostSearch from './PostSearch';

const getSortFunction = (sortKey, direction = 'asc') => {
  const sortFunctions = {
    price: {
      asc: (a, b) => a.price - b.price,
      desc: (a, b) => b.price - a.price,
    },
    purchase_date: {
      asc: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
      desc: (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
    },
    expiry_date: {
      asc: (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate),
      desc: (a, b) => new Date(b.expiryDate) - new Date(a.expiryDate),
    },
    quantity: {
      asc: (a, b) => a.quantity - b.quantity,
      desc: (a, b) => b.quantity - a.quantity,
    },
  };

  return sortFunctions[sortKey][direction];
};

export function Post({
  posts, search, setSearch,
}) {
  const [inputValue, setInputValue] = useState('');
  const [sortField, setSortField] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredPosts = posts.filter((post) => post.name
    .toLowerCase()
    .includes(search.toLowerCase()));
  const clearSearch = () => {
    setSearch('');
    setInputValue('');
  };

  const sortedPosts = [...filteredPosts].sort(
    getSortFunction(sortField, sortDirection),
  );

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
        Posts
      </Typography>

      <PostSearch
        inputValue={inputValue}
        setInputValue={setInputValue}
        clearSearch={clearSearch}
        setSearch={setSearch}
      />

      <PostSort
        sortField={sortField}
        setSortField={setSortField}
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
      />

      <Paper elevation={3} style={{ marginTop: '100px' }}>
        <Grid container spacing={4} justifyContent="center">
          {

              sortedPosts.length === 0 ? (
                <Typography color="textSecondary">
                  No posts found.
                </Typography>
              ) : sortedPosts.map((item) => (
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
                      <Button size="small" color="primary" component={Link} to={`/posts/${item.id}`}>
                        Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))

          }

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  if (loading) {
    return <EditPostLoading />;
  }

  return (
    <Post
      posts={posts}
      search={search}
      setSearch={setSearch}
      loading={loading}
    />
  );
}

export default PostList;

PostList.propTypes = {
};
