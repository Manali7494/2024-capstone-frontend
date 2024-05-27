import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Register({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      email, password, username, phoneNumber,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="phoneNumber">
        Phone Number:
        <input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Register;
