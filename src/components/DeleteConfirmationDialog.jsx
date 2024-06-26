import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';

function DeleteConfirmationDialog({ onDeleteConfirm }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDelete = () => {
    onDeleteConfirm();
    closeDialog();
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={openDialog}>
        Delete
      </Button>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" onClick={handleDelete} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteConfirmationDialog.propTypes = {
  onDeleteConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationDialog;
