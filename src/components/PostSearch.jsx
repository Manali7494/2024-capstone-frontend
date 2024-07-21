import React from 'react';
import {
  TextField, Grid, InputAdornment, IconButton,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

import PropTypes from 'prop-types';

function PostSearch({
  inputValue, setInputValue, clearSearch, setSearch,
}) {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={8}>
        <TextField
          id="search"
          label="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="clearSearch" onClick={clearSearch} data-testid="clear-button">
                  <Clear color="primary" />
                </IconButton>
                <IconButton aria-label="textSearch" data-testid="search-button" onClick={() => setSearch(inputValue)}>
                  <Search color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

PostSearch.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default PostSearch;
