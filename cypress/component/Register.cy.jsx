import React from 'react';
import { Amplify } from 'aws-amplify';
import Register from '../../src/components/Register';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

describe('Registration', () => {
  beforeEach(() => {
    cy.mount(<Register />);
  });

  it('allows a user to register', () => {
    const username = 'user';
    const email = 'test@gmail.com';
    const password = '!Testpassword100';
    const phoneNumber = '123-456-3435';

    cy.get('#username').type(username);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#phoneNumber').type(phoneNumber);
    cy.get('form').submit();

    cy.contains('Registration Successful').should('exist');
  });
});
