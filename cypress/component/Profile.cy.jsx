import React from 'react';
import Profile from '../../src/components/Profile';

describe('Profile Component', () => {
  beforeEach(() => {
    cy.mount(<Profile user={{ id: 'user:1' }} />);
  });

  it('checks that contact email and number fields are disabled initially', () => {
    cy.get('[data-testid="contact-email"]').should('be.disabled');
    cy.get('[data-testid="contact-number"]').should('be.disabled');
  });

  it('checks that the edit button is present and clickable', () => {
    cy.get('[data-testid="edit-button"]').should('exist').and('be.visible').click();
    cy.get('[data-testid="contact-email"]').should('not.be.disabled');
    cy.get('[data-testid="contact-number"]').should('not.be.disabled');
  });

  it('enables contact email and number fields after clicking edit', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-email"]').should('not.be.disabled');
    cy.get('[data-testid="contact-number"]').should('not.be.disabled');
  });

  it('changes value of contact number input field', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-number"]').clear().type('1234567890');
    cy.get('[data-testid="contact-number"]').should('have.value', '1234567890');
  });

  it('disables contact email and number fields after clicking cancel', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="cancel-button"]').click();
    cy.get('[data-testid="contact-email"]').should('be.disabled');
    cy.get('[data-testid="contact-number"]').should('be.disabled');
  });
});
