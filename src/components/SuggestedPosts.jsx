import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid,
  CardMedia, CardActions, Button,
  Link, Divider,
  Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import config from '../config';

const renderPosts = (posts) => posts.map(({ post }) => (
  <Grid item xs={12} sm={6} md={4} key={post.id}>
    <Card style={{ margin: '0 auto', width: '200px' }} data-testid={`card-item-${post.id}`}>
      <CardMedia
        component="img"
        height="100px"
        image={post.imageUrl || 'https://via.placeholder.com/450?text=No+Image+Available'}
        alt={post.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">{post.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity:
          {post.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: $
          {post.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Purchase Date:
          {' '}
          {post.purchaseDate}
        </Typography>
        {
           post.expiryDate && (
           <Typography variant="body2" color="text.secondary">
             Expiry Date:
             {post.expiryDate}
           </Typography>
           )
         }
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/posts/${post.id}`}>
          Detail
        </Button>
      </CardActions>
    </Card>
  </Grid>

));

const renderContent = ({ code, posts }) => {
  if (code === 'USER_NO_PREFERENCE') {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: '10px',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            marginTop: '20px',
          }}
          gutterBottom
        >
          No posts selected. Click on “interested” button on a post to see suggestions
        </Typography>
      </Paper>
    );
  }
  if (code === 'USER_INVALID_PREFERENCE') {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: '10px',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            marginTop: '20px',
          }}
          gutterBottom
        >
          Please select valid posts with nutrition to see suggestions
        </Typography>
      </Paper>

    );
  }
  return (
    <Grid container spacing={6} justifyContent="center">
      {renderPosts(posts)}
    </Grid>
  );
};
export function SuggestedPostsContent({ posts, code = '' }) {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Divider />
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontFamily: 'cursive', color: 'primary.main', textAlign: 'center', marginTop: '20px',
        }}
        gutterBottom
      >
        Suggested Posts
      </Typography>
      {renderContent({ code, posts })}
    </Box>
  );
}
SuggestedPostsContent.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
      expiryDate: PropTypes.string,
    }).isRequired,
  })).isRequired,
  code: PropTypes.string,
};

SuggestedPostsContent.defaultProps = {
  code: '',
};
function SuggestedPosts({ user }) {
  const [posts, setPosts] = useState([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    const fetchSuggestedPosts = async () => {
      const response = await fetch(`${config.backend_url}/posts/suggested/${user.id}`);
      const data = await response.json();
      if (data.code) {
        setCode(data.code);
      } else {
        setPosts(data);
      }
    };

    fetchSuggestedPosts();
  }, [user.id]);

  return (
    <SuggestedPostsContent posts={posts} code={code} />
  );
}

SuggestedPosts.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SuggestedPosts;
