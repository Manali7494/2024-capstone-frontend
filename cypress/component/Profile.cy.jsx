import React from 'react';
import Profile from '../../src/components/Profile';
import config from '../../src/config';

const user = {
  id: 'user:1',
  name: 'User 1',
  username: 'user1',
  email: 'user1@gmail.com',
  phone: '1234567890',

};
describe('Profile Component', () => {
  beforeEach(() => {
    cy.intercept('GET', `${config.backend_url}/users/${user.id}/profile`, {
      statusCode: 200,
      body: user,
    }).as('getPost');

    cy.mount(<Profile user={{ id: 'user:1' }} />);
  });

  it('checks that contact email and number fields are disabled initially', () => {
    cy.get('[data-testid="contact-email"]').should('exist');
    cy.get('[data-testid="contact-email"] input').should('be.disabled');

    cy.get('[data-testid="contact-number"]').should('exist');
    cy.get('[data-testid="contact-number"] input').should('be.disabled');
  });

  it('checks that the edit button is present and clickable', () => {
    cy.get('[data-testid="edit-button"]').should('exist').and('be.visible').click();

    cy.get('[data-testid="contact-email"] input').should('not.be.disabled');
    cy.get('[data-testid="contact-number"] input').should('not.be.disabled');
  });

  it('changes value of contact number input field', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-number"]').type('{selectall}{backspace}');
    cy.get('[data-testid="contact-number"]').type('123');

    cy.get('[data-testid="contact-email"]').type('{selectall}{backspace}');
    cy.get('[data-testid="contact-email"]').type('newEmail@gmail.com');
    cy.get('[data-testid="save-button').click();
  });

  it('disables contact email and number fields after clicking cancel', () => {
    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="cancel-button"]').click();
    cy.get('[data-testid="contact-email"] input').should('be.disabled');
    cy.get('[data-testid="contact-number"] input').should('be.disabled');
  });

  it('shows error message when email and password is invalid', () => {
    cy.get('[data-testid="contact-email"]').should('exist');
    cy.get('[data-testid="contact-email"] input').should('be.disabled');

    cy.get('[data-testid="contact-number"]').should('exist');
    cy.get('[data-testid="contact-number"] input').should('be.disabled');

    cy.get('[data-testid="edit-button"]').click();
    cy.get('[data-testid="contact-email"]').type('{selectall}{backspace}');
    cy.get('[data-testid="contact-number"]').type('{selectall}{backspace}');

    cy.get('[data-testid="save-button').click();
    cy.contains('Email is required.').should('be.visible');
    cy.contains('Phone number is required.').should('be.visible');
  });
});
