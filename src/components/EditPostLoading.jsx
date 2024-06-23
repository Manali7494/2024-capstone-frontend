import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

function EditPostLoading() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
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

export default EditPostLoading;
