/* eslint-disable no-console */
import React, { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [display, setDisplay] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setDisplay('Invalid email');
      return;
    }

    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            phone_number: `+1${phoneNumber.replace(/-/g, '')}`,
            preferred_username: username,
            name,
          },

        },
      });

      const { userId = '' } = result || {};
      setDisplay('Registration Successful');
      console.log('userId', userId);
    } catch (err) {
      console.log('error', err);
      let errorMessage = 'Error';
      switch (err.name) {
        case 'UsernameExistsException':
          errorMessage = 'Email already exists';
          break;
        default:
          errorMessage = 'An error occurred during registration';
      }

      setDisplay(errorMessage);
    }
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
      <label htmlFor="name">
        Name:
        <input
          id="name"
          data-testid="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          placeholder="test@gmail.com"
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
          placeholder="123-456-7890"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
      {display && <div>{display}</div>}
    </form>
  );
}

Register.propTypes = {};

export default Register;
