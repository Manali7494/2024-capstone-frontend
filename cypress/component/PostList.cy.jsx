import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostList } from '../../src/components/PostList';

describe('PostList', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <PostList />
      </Router>,
    );
  });

  it('displays a list of posts', () => {
    cy.contains('Posts').should('be.visible');
    cy.get('#search').should('exist');
    cy.get('[data-testid="card-item-1"]').should('exist');
  });

  it('filters to a single post when matching post name', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('#search').type('apple');
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid^="card-item"]').should('have.length', 1);
    cy.contains(/apple/i).should('be.visible');
  });

  it('displays message when no matching post name', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
    cy.get('#search').type('orange');
    cy.get('[data-testid="search-button"]').click();

    cy.contains('No posts found.').should('be.visible');
    cy.get('[data-testid^="card-item"]').should('have.length', 0);
  });

  it('handles clear functionality correctly', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1).then((length) => {
      cy.log(`Number of items: ${length}`);

      const initialPostCount = length;
      cy.get('#search').type('apple');
      cy.get('[data-testid^="card-item"]').its('length').should('eq', initialPostCount);

      cy.get('#search').clear();
      cy.get('#search').type('apple');
      cy.get('[data-testid="search-button"]').click();

      cy.get('[data-testid^="card-item"]').should('have.length', 1);
      cy.contains(/apple/i).should('be.visible');

      cy.get('[data-testid="clear-button"]').click();
      cy.get('[data-testid^="card-item"]').its('length').should('eq', initialPostCount);
    });
  });
});
