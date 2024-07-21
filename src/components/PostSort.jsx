import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, InputAdornment,
  IconButton,
  MenuItem,
  Select, FormControl,

} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

function PostSort({
  sortField,
  setSortField,
  setSortDirection,
  sortDirection,
}) {
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => {
    setOpen(!open);
  };
  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Select
            open={open}
            data-testid="sort-select"
            IconComponent={() => null}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            sx={{ color: 'primary.main' }}
            startAdornment={(
              <InputAdornment position="start">
                <Typography variant="body1">Sort by:</Typography>
              </InputAdornment>
              )}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  onClick={handleOpenClose}
                  edge="end"
                  data-testid="toggle-sort-field-dropdown"
                >
                  {
                    !open ? <ExpandMore /> : <ExpandLess />
                  }
                </IconButton>
                <IconButton
                  data-testid={sortDirection === 'asc' ? 'sort-direction-asc' : 'sort-direction-desc'}
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  { sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward /> }
                </IconButton>
              </InputAdornment>
              )}
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="purchase_date">Purchase Date</MenuItem>
            <MenuItem value="expiry_date">Expiry Date</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>

  );
}

PostSort.propTypes = {
  sortField: PropTypes.string.isRequired,
  setSortField: PropTypes.func.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  sortDirection: PropTypes.string.isRequired,
};

export default PostSort;
