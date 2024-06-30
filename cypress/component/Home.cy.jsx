/* eslint-disable no-undef */
import React from 'react';
import Home from '../../src/components/Home';

describe('App', () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });

  it('renders the Home Page', () => {
    cy.contains('Welcome');
  });
});
