/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

function EditPost({ user }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('user', user);
  };

  return (
    <>
      <h1> Edit Post </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" />
        </div>
        <div>
          <label htmlFor="purchaseDate">Purchase Date:</label>
          <input type="date" id="purchaseDate" name="purchaseDate" />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input type="date" id="expiryDate" name="expiryDate" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

EditPost.propTypes = {
  user: PropTypes.object.isRequired,
};

export default EditPost;
