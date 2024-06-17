import React from 'react';
import { Amplify } from 'aws-amplify';
import CreatePost from '../../src/components/NewPost';
import awsconfig from '../../src/aws-exports';

Amplify.configure(awsconfig);

describe('Create Post', () => {
  beforeEach(() => {
    cy.mount(<CreatePost />);
  });

  it('allows a user to create a post', () => {
    const name = 'Test Post';
    const description = 'This is a test post';
    const price = '10';
    const quantity = '1';
    const purchaseDate = '2024-01-01';
    const expiryDate = '2024-12-31';

    cy.get('#name').type(name);
    cy.get('#description').type(description);
    cy.get('#price').type(price);
    cy.get('#quantity').type(quantity);
    cy.get('#purchaseDate').type(purchaseDate);
    cy.get('#expiryDate').type(expiryDate);
    cy.get('form').submit();

    cy.contains('Post created successfully').should('exist');
  });
});
