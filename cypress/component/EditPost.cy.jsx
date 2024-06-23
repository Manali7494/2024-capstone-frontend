import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import EditPost from '../../src/components/EditPost';

describe('EditPost', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <EditPost user={{ email: 'user@gmail.com' }} />
      </Router>,
    );
  });

  it('allows a user to edit a post', () => {
    const updatedName = 'Updated Name';
    const updatedDescription = 'Updated Description';
    const updatedPrice = '25';
    const updatedQuantity = '10';
    const updatedPurchaseDate = '2023-01-01';
    const updatedExpiryDate = '2023-12-31';

    cy.get('[data-testid="name"]').type(updatedName);
    cy.get('[data-testid="description"]').type(updatedDescription);
    cy.get('[data-testid="price"]').type(updatedPrice);
    cy.get('[data-testid="quantity"]').type(updatedQuantity);
    cy.get('[data-testid="purchaseDate"]').type(updatedPurchaseDate);
    cy.get('[data-testid="expiryDate"]').type(updatedExpiryDate);
    cy.get('form').submit();

    cy.contains('Post updated successfully').should('be.visible');
  });
});
