import React from 'react';
import {
  Box, Paper, Grid, Typography,
  Card, CardMedia,
  CardContent, CardActions, Button,
  Toolbar,
  Switch,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Shop() {
  const item = {
    id: 1,
    name: 'Item 1',
    quantity: 10,
    price: 100,
    purchaseDate: '2024-01-01',
    expiryDate: '2024-12-01',
    imageUrl: 'https://via.placeholder.com/450?text=Item+1',

  };
  return (
    <Box>

      <Toolbar>
        <Box sx={{
          flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontFamily: 'cursive', color: 'primary.main', textAlign: 'center', flexGrow: 1,
            }}
            gutterBottom
          >
            Shop
          </Typography>
          <div>
            <Switch />
            User Interested
          </div>
        </Box>
      </Toolbar>

      <Paper elevation={3} style={{ marginTop: '100px' }}>
        <Grid container spacing={4} justifyContent="center">

          <Grid item xs={12} key={item.id}>
            <Card style={{ margin: '0 auto', width: '50vw' }} data-testid={`card-item-${item.id}`}>
              <CardMedia
                component="img"
                height="250px"
                image={item.imageUrl || 'https://via.placeholder.com/450?text=No+Image+Available'}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity:
                  {' '}
                  {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: $
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Purchase Date:
                  {' '}
                  {item.purchaseDate}
                </Typography>
                {
                      item.expiryDate && (
                        <Typography variant="body2" color="text.secondary">
                          Expiry Date:
                          {' '}
                          {item.expiryDate}
                        </Typography>
                      )
                    }
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" component={Link} to={`/posts/${item.id}`}>
                  Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>

        </Grid>
      </Paper>
    </Box>
  );
}

export default Shop;
