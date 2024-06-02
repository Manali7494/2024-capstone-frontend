import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, Typography, DialogTitle,
  Card, CardContent,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ContactInformation() {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('primary');

  const handleClickOpen = () => {
    setColor(color === 'primary' ? 'primary' : 'secondary');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color={color} onClick={handleClickOpen} startIcon={<FavoriteIcon />} />
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Contact Information
        </DialogTitle>
        <DialogContent>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div">
                Name: John Doe
              </Typography>
              <Typography variant="body1" component="div">
                Email: john.doe@example.com
              </Typography>
              <Typography variant="body1" component="div">
                Phone: 123-456-7890
              </Typography>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactInformation;
