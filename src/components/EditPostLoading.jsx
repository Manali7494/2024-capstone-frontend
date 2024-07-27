import React from 'react';
import {
  Skeleton, Box, Grid, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

function EditPostLoading({ title }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontFamily: 'cursive', color: 'primary.main', textAlign: 'center' }}
          gutterBottom
        >
          {title}
        </Typography>
        <form>
          <Skeleton variant="text" width="100%" height={56} style={{ marginBottom: 8 }} />
          <Skeleton variant="text" width="100%" height={56} style={{ marginBottom: 8 }} />
          <Skeleton variant="rect" width="100%" height={56} style={{ marginBottom: 8 }} />
          <Skeleton variant="text" width="100%" height={56} style={{ marginBottom: 8 }} />
          <Skeleton variant="text" width="100%" height={56} style={{ marginBottom: 8 }} />
          <Box display="flex" justifyContent="space-between">
            <Skeleton variant="text" width="48%" height={56} style={{ marginBottom: 8 }} />
            <Skeleton variant="text" width="48%" height={56} style={{ marginBottom: 8 }} />
          </Box>
          <Skeleton variant="rect" width="100%" height={56} />
        </form>
      </Grid>
    </Grid>
  );
}

EditPostLoading.propTypes = {
  title: PropTypes.string.isRequired,
};
export default EditPostLoading;
