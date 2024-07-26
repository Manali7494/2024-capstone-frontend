import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid,
  CardMedia, CardActions, Button,
  Link, Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import config from '../config';

function SuggestedPosts({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchSuggestedPosts = async () => {
      const response = await fetch(`${config.backend_url}/posts/suggested/${user.id}`);
      const data = await response.json();
      setPosts(data);
    };

    fetchSuggestedPosts();
  }, [user.id]);

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

      <Grid container spacing={6} justifyContent="center">
        {
               posts.map(({ post }) => (
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
               ))

          }

      </Grid>
    </Box>
  );
}

export default SuggestedPosts;

SuggestedPosts.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
