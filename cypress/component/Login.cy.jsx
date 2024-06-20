import React from 'react';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../src/components/Login';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

describe('Login', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Login />
      </Router>,
    );
  });

  it('allows a user to login and sign out', () => {
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.get('.MuiAlert-message').should('not.exist');
  });
});
