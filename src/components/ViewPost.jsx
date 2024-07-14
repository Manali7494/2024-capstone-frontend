/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditPostLoading from './EditPostLoading';
import config from '../config';
import Nutrition from './Nutrition';
import ContactInformationDialog from './ContactInformationDialog';

function ViewPost({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [interestedLoading, setInterestedLoading] = useState(false);
  const [isUserInterested, setIsUserInterested] = useState(false);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${config.backend_url}/posts/${id}?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Could not fetch post data');
        }
        const data = await response.json();
        setPost(data);
        setIsUserInterested(data.isUserInterested);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, user]);

  if (loading) {
    return <EditPostLoading />;
  }

  const handleInterestClick = async () => {
    setInterestedLoading(true);
    try {
      await fetch(`${config.backend_url}/posts/${id}/interested`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),

      });
      setIsUserInterested(!isUserInterested ? !isUserInterested : isUserInterested);
      console.log('Interested status updated:');
    } catch (error) {
      console.error('Error updating interested status:', error);
    } finally {
      setInterestedLoading(false);
    }
  };

  const interestedButton = (
    <button
      onClick={handleInterestClick}
      type="button"
      style={{
        backgroundColor: isUserInterested ? 'green' : 'grey',
        color: isUserInterested ? 'white' : 'black',
      }}
    >
      {' '}
      Interested
    </button>
  );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            View Post
          </Typography>
          {
            interestedLoading ? (
              <div data-testid="loading">
                <CircularProgress />
              </div>
            ) : (
              interestedButton
            )
          }
          {isUserInterested && (
          <ContactInformationDialog userId={user.id} />
          )}
          <Nutrition postId={id} user={user} />
          <TextField
            label="Name"
            value={post.name || ''}
            fullWidth
            data-testid="name"
            margin="normal"
            disabled
          />
          <TextField
            label="Description"
            value={post.description || ''}
            fullWidth
            data-testid="description"
            margin="normal"
            disabled
          />
          {post.imageUrl && (
            <Box style={{ marginTop: '1em', textAlign: 'center' }}>
              <img src={post.imageUrl} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
          )}
          <TextField
            label="Price"
            value={post.price || ''}
            fullWidth
            data-testid="price"
            margin="normal"
            disabled
          />
          <TextField
            label="Quantity"
            value={post.quantity || ''}
            fullWidth
            data-testid="quantity"
            margin="normal"
            disabled
          />
          <TextField
            label="Purchase Date"
            value={post.purchaseDate || ''}
            fullWidth
            data-testid="purchaseDate"
            margin="normal"
            disabled
          />
          <TextField
            label="Expiry Date"
            value={post.expiryDate || ''}
            fullWidth
            data-testid="expiryDate"
            margin="normal"
            disabled
          />
          {post.seller_id === user.id && (
          <Button
            component={Link}
            to={`/posts/${post.id}/edit`}
            variant="contained"
            color="primary"
            data-testid="edit-button"
            style={{ marginTop: '20px' }}
          >
            Edit
          </Button>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

ViewPost.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default ViewPost;
