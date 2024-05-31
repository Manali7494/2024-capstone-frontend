/* eslint-disable no-console */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { signIn, signUp } from 'aws-amplify/auth';
import Title from './Title';

const testSignUp = async () => {
  try {
    const { userId } = await signUp({
      username: 'test123@gmail.com',
      password: 'testPassword',
    });
    console.log('userId', userId);
  } catch (err) {
    console.log('error signing up:', err);
  }
};

function Home() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <Title />
          <button type="button" onClick={testSignUp}>Sign Up</button>

        </header>
      </div>
    </div>
  );
}

export default Home;
