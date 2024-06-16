import React from 'react';

function NewPost() {
  return (
    <>
      <h1> Create Post </h1>
      <form>
        <label htmlFor="name">
          Name
          <input id="name" type="text" />
        </label>
        <label htmlFor="description">
          Description
          <input id="description" type="text" />
        </label>
        <label htmlFor="imageUrl">
          Image URL
          <input id="imageUrl" type="file" />
        </label>
        <label htmlFor="price">
          Price
          <input id="price" type="number" />
        </label>
        <label htmlFor="quantity">
          Quantity
          <input id="quantity" type="number" />
        </label>
        <label htmlFor="purchaseDate">
          Purchase Date
          <input id="purchaseDate" type="date" />
        </label>
        <label htmlFor="expiryDate">
          Expiry Date
          <input id="expiryDate" type="date" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default NewPost;
