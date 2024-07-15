/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
import PropTypes from 'prop-types';

import {
  ContactPage,
} from '@mui/icons-material';

function ContactInformationDialog({ userId }) {
  const [open, setOpen] = useState(false);
  const [contactInformation, setContactInformation] = useState({});

  const handleClickOpen = () => {
    const fetchContactInformation = async () => {
      try {
        const response = await fetch(`/users/${userId}/contactInformation`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContactInformation({
          email: data.contact_email,
          phoneNumber: data.contact_number,
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchContactInformation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} startIcon={<ContactPage />}>
        Contact Information
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            data-testid="contact-email"
            type="email"
            fullWidth
            value={contactInformation.email}
            disabled
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone Number"
            data-testid="contact-number"
            type="tel"
            fullWidth
            value={contactInformation.phoneNumber}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ContactInformationDialog.propTypes = {
  userId: PropTypes.number.isRequired,
};
export default ContactInformationDialog;
