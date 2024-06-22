import React from 'react';
import {
  Grid, Paper, Typography,
} from '@mui/material';

function EditPost() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '2em', marginTop: '2em' }}>
          <Typography variant="h5" gutterBottom>
            Edit Post
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

EditPost.propTypes = {};

export default EditPost;
