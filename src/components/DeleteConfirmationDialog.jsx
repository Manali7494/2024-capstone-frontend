import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
} from '@mui/material';
import config from '../config';

function DeleteConfirmationDialog({ postId, setSuccessMessage, setDisplayErrorMessage }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${config.backend_url}/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccessMessage('Post successfully deleted');
      } else {
        setDisplayErrorMessage('Failed to delete post');
      }
    } catch (error) {
      setDisplayErrorMessage('Failed to delete post');
    } finally {
      closeDialog();
    }
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
          <Button variant="contained" onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleDelete} color="error">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteConfirmationDialog.propTypes = {
  postId: PropTypes.string.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setDisplayErrorMessage: PropTypes.func.isRequired,

};

export default DeleteConfirmationDialog;
