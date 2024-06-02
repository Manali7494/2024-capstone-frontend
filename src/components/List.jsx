/* eslint-disable max-len */
import React, { useState } from 'react';
import {
//   List, ListItem, ListItemText, ListItemAvatar, Avatar,
  TextField,
  Select, MenuItem, Grid, Paper, Typography, Box, InputAdornment,
  Card, CardActionArea, CardMedia, CardContent, FormControl, IconButton,

} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  ArrowDownward, ArrowUpward, ExpandMore, Search, Clear,
} from '@mui/icons-material';

// import PropTypes from 'prop-types';

function ItemList() {
  const items = [{
    id: '123',
    price: 10,
    name: 'Item 1',
    image: 'https://via.placeholder.com/150',
    quantity: 5,
  }, {
    id: 'abc',
    price: 20,
    name: 'Item 2',
    image: 'https://via.placeholder.com/150',
    quantity: 10,

  }];
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('price');
  const [sortDirection, setSortDirection] = useState('asc');
  const [open, setOpen] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortField === 'price') {
      return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return sortDirection === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
  });
  const filteredItems = sortedItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
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
                  <IconButton onClick={() => setSearch('')}>
                    <Clear color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setSearch(search)}>
                    <Search color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              IconComponent={() => null}
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              sx={{ color: 'primary.main' }}
              startAdornment={(
                <InputAdornment position="start">
                  <Typography variant="body1">Sort by:</Typography>
                </InputAdornment>
              )}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setOpen(!open)}
                  >
                    <ExpandMore />
                  </IconButton>
                  <IconButton onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}>
                    {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                  </IconButton>
                </InputAdornment>
              )}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="quantity">Quantity</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paper elevation={3} style={{ marginTop: '100px' }}>
        <Grid container spacing={4} justifyContent="center">
          {filteredItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card style={{ margin: '0 auto', width: '50vw' }}>
                <CardActionArea component={Link} to={`/item/${item.id}`}>
                  <CardMedia
                    component="img"
                    height="250px"
                    image={item.image}
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
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

ItemList.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     quantity: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     image: PropTypes.string,
//   })).isRequired,
};

export default ItemList;
