import React, { useState } from 'react';

function NewPost() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('healthy-wealthy-image', imageUrl);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('purchaseDate', purchaseDate);
    formData.append('expiryDate', expiryDate);

    try {
      await fetch('/posts', {
        method: 'POST',
        body: formData,
      });

      setMessage('Post created successfully');
    } catch (error) {
      setMessage('Failed to create post');
    }
  };

  return (
    <>
      <h1> Create Post </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              e.target.setCustomValidity('');
              setName(e.target.value);
            }}
            onInvalid={(e) => e.target.setCustomValidity('Name is required')}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label htmlFor="imageUrl">
          Image URL

          <input id="imageUrl" type="file" onChange={(e) => setImageUrl(e.target.files[0])} />
        </label>
        <label htmlFor="price">
          Price
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => {
              e.target.setCustomValidity('');
              setPrice(e.target.value);
            }}
            onInvalid={(e) => e.target.setCustomValidity('Unit Price is required. It can be 0 if the item is free')}
            required
          />
        </label>
        <label htmlFor="quantity">
          Quantity
          <input
            id="quantity"
            type="number"
            value={quantity}
            onInvalid={(e) => e.target.setCustomValidity('Quantity is required')}
            onChange={(e) => {
              e.target.setCustomValidity('');
              setQuantity(e.target.value);
            }}
            required
          />
        </label>
        <label htmlFor="purchaseDate">
          Purchase Date
          <input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            onInvalid={(e) => e.target.setCustomValidity('Purchase Date is required')}
            onChange={(e) => {
              e.target.setCustomValidity('');
              setPurchaseDate(e.target.value);
            }}
            required
          />
        </label>
        <label htmlFor="expiryDate">
          Expiry Date
          <input id="expiryDate" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <p>{message && message }</p>
      </div>
    </>
  );
}

export default NewPost;
