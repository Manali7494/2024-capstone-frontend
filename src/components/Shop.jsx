import React, { useState } from 'react';
import {
  Grid, Paper, Typography, Box,
  Card, CardActionArea, CardMedia, CardContent, IconButton, FormControlLabel, Switch,

} from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

function Shop() {
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

  const [filterType, setFilterType] = useState('all');

  const filteredItems = items.filter((item) => item.name.toLowerCase() && (filterType === 'all' || item.interested === (filterType === 'interested')));

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="div" gutterBottom>
          Shop
        </Typography>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={(
              <Switch
                checked={filterType === 'interested'}
                onChange={(event) => setFilterType(event.target.checked ? 'interested' : 'all')}
              />
    )}
            label="User Favourited"
          />
          <IconButton>
            <Favorite />
          </IconButton>
        </Box>
      </Box>
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

Shop.propTypes = {
};

export default Shop;
