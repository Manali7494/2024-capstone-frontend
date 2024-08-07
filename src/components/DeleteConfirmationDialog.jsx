import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog,
  DialogActions, DialogContent,
  DialogContentText, DialogTitle,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function DeleteConfirmationDialog({
  postId, setSuccessMessage, setDisplayErrorMessage, user,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.backend_url}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (response?.ok) {
        setSuccessMessage('Post successfully deleted');
        setTimeout(() => {
          navigate('/posts');
        }, 3000);
      } else {
        setDisplayErrorMessage('Failed to delete post');
      }
    } catch (error) {
      setDisplayErrorMessage('Failed to delete post');
    } finally {
      setIsLoading(false);
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
          <Button variant="contained" onClick={handleDelete} color="error" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Yes, Delete'}
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
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,

};

export default DeleteConfirmationDialog;
