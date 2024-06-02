import React, { useState, useEffect } from 'react';
import {
  signIn, getCurrentUser,
  signOut,
  fetchAuthSession,
} from 'aws-amplify/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [display, setDisplay] = useState('');
  const [user, setUser] = useState(null);
  const setUserDetails = async () => {
    const userDetails = await getCurrentUser();
    setUser(userDetails);
  };
  const getUser = async () => {
    try {
      const authSession = await fetchAuthSession();
      if (authSession?.userSub) {
        setUserDetails();
      }
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSignOut = async () => {
    await signOut({ global: true });
    setUser(null);
    setDisplay('Signed out successfully');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      setDisplay('Invalid email');
      return;
    }

    try {
      await signIn({ username: email, password });
      setDisplay('Signed in successfully');
      setUserDetails();
    } catch (err) {
      console.log('Error', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
        {display && <div>{display}</div>}
      </form>
      {user ? (
        <button type="button" id="signout" onClick={handleSignOut}>Sign Out</button>
      ) : null}
    </>
  );
}

Login.propTypes = {};

export default Login;
