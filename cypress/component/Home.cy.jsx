/* eslint-disable no-undef */
import React from 'react';
import Home from '../../src/components/Home';

describe('App', () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });

  it('renders the text healthy wealthy', () => {
    cy.contains('Healthy Wealthy');
  });
});
