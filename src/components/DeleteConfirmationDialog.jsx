/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
      <button type="button" onClick={openDialog}>Delete</button>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog">
            <p>Are you sure you want to delete?</p>
            <button type="button" onClick={closeDialog}>Cancel</button>
            <button type="button" onClick={handleDelete}>Yes, Delete</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmationDialog;

DeleteConfirmationDialog.propTypes = {
  onDeleteConfirm: PropTypes.func.isRequired,
};
