import React from 'react';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../../src/components/Register';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

describe('Registration', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <Register />
      </Router>,
    );
  });

  it('allows a user to register', () => {
    const username = 'user';
    const email = 'test@gmail.com';
    const name = 'User';
    const password = '!Testpassword100';
    const phoneNumber = '123-456-3435';

    cy.get('#username').type(username);
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#phoneNumber').type(phoneNumber);
    cy.get('form').submit();

    cy.get('.MuiAlert-message').should('not.exist');
  });

  it('shows error on duplicate email', () => {
    const username = 'user';
    const email = 'test@gmail.com';
    const name = 'User';
    const password = '!Testpassword100';
    const phoneNumber = '123-456-3435';

    cy.get('#username').type(username);
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#phoneNumber').type(phoneNumber);
    cy.get('form').submit();

    cy.contains('Email already exists').should('exist');
  });
});
