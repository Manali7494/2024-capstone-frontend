import React from 'react';
import SuggestedPosts from '../../src/components/SuggestedPosts';
import ViewPost from '../../src/components/ViewPost';

import config from '../../src/config';

describe('SuggestedPosts with interested post', () => {
  describe('select post', () => {
    const mockUser = { id: 1 };

    const bananaPost = {
      id: 1,
      name: 'Banana',
      quantity: 10,
      price: 100,
      purchaseDate: '2024-01-01',
      expiryDate: '2024-12-31',
      imageUrl: 'https://via.placeholder.com/450?text=Post+1',
    };
    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/${bananaPost.uri}?userId=${mockUser.id}`, {
        statusCode: 200,
        body: bananaPost,
      }).as('getPost');

      cy.mount(<ViewPost id={bananaPost.id} user={mockUser} />);
    });

    it('displays the banana post correctly', () => {
      cy.wait('@getPost');

      cy.contains('View Post').should('exist');
      cy.contains(/Interested/i).click();
      cy.contains(/Interested/).should('exist');
    });
  });

  describe('view suggested posts', () => {
    const mockUser = { id: 1 };
    const mockPosts = [
      {
        id: 1,
        name: 'Banana',
        quantity: 10,
        price: 100,
        purchaseDate: '2024-01-01',
        expiryDate: '2024-12-31',
        imageUrl: 'https://via.placeholder.com/450?text=Post+1',
      },
      {
        id: 2,
        name: 'Post 2',
        quantity: 5,
        price: 50,
        purchaseDate: '2024-02-01',
        imageUrl: '',
      },
    ];

    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/suggested/${mockUser.id}`, {
        statusCode: 200,
        body: mockPosts,
      }).as('getSuggestedPosts');

      cy.mount(<SuggestedPosts user={mockUser} />);
    });

    it('fetches and displays suggested posts', () => {
      cy.wait('@getSuggestedPosts');

      cy.contains('Suggested Posts').should('exist');

      cy.get('[data-testid="card-item-1"]').within(() => {
        cy.contains('Banana').should('exist');
        cy.contains('Quantity:10').should('exist');
        cy.contains('Price: $100').should('exist');
        cy.contains('Purchase Date: 2024-01-01').should('exist');
        cy.contains('Expiry Date:2024-12-31').should('exist');
      });

      cy.get('[data-testid="card-item-2"]').within(() => {
        cy.contains('Post 2').should('exist');
        cy.contains('Quantity:5').should('exist');
        cy.contains('Price: $50').should('exist');
        cy.contains('Purchase Date: 2024-02-01').should('exist');
        cy.contains('Expiry Date').should('not.exist');
      });
    });
  });
});

describe('SuggestedPosts with no interested post', () => {
  describe('check post status', () => {
    const mockUser = { id: 1 };

    const bananaPost = {
      id: 1,
      name: 'Banana',
      quantity: 10,
      price: 100,
      purchaseDate: '2024-01-01',
      expiryDate: '2024-12-31',
      imageUrl: 'https://via.placeholder.com/450?text=Post+1',
    };
    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/${bananaPost.uri}?userId=${mockUser.id}`, {
        statusCode: 200,
        body: bananaPost,
      }).as('getPost');

      cy.mount(<ViewPost id={bananaPost.id} user={mockUser} />);
    });

    it('displays the banana post correctly', () => {
      cy.wait('@getPost');

      cy.contains('View Post').should('exist');
      cy.contains(/Interested/).should('exist');
    });
  });
  describe('view suggested posts', () => {
    const mockUser = { id: 1 };
    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/suggested/${mockUser.id}`, {
        statusCode: 200,
        body: {
          code: 'USER_NO_PREFERENCE',
        },
      }).as('getSuggestedPosts');

      cy.mount(<SuggestedPosts user={mockUser} />);
    });

    it(' displays the relevant message when code = USER_NO_PREFERENCE ', () => {
      cy.wait('@getSuggestedPosts');

      cy.contains('Suggested Posts').should('exist');

      cy.contains(/No posts selected. Click on “interested” button on a post to see suggestions/i).should('exist');
    });
  });
});

describe('SuggestedPosts with invalid interested post', () => {
  describe('check post status', () => {
    const mockUser = { id: 1 };

    const abcdPost = {
      id: 1,
      name: 'abcd',
      quantity: 10,
      price: 100,
      purchaseDate: '2024-01-01',
      expiryDate: '2024-12-31',
      imageUrl: 'https://via.placeholder.com/450?text=Post+1',
    };
    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/${abcdPost.uri}?userId=${mockUser.id}`, {
        statusCode: 200,
        body: abcdPost,
      }).as('getPost');

      cy.mount(<ViewPost id={abcdPost.id} user={mockUser} />);
    });

    it('displays the banana post correctly', () => {
      cy.wait('@getPost');

      cy.contains('View Post').should('exist');
      cy.contains(/Interested/i).click();
      cy.contains(/Interested/).should('exist');
    });
  });
  describe('view suggested posts', () => {
    const mockUser = { id: 1 };
    beforeEach(() => {
      cy.intercept('GET', `${config.backend_url}/posts/suggested/${mockUser.id}`, {
        statusCode: 200,
        body: {
          code: 'USER_INVALID_PREFERENCE',
        },
      }).as('getSuggestedPosts');

      cy.mount(<SuggestedPosts user={mockUser} />);
    });

    it(' displays the relevant message when code = USER_INVALID_PREFERENCE ', () => {
      cy.wait('@getSuggestedPosts');

      cy.contains('Suggested Posts').should('exist');

      cy.contains(/Please select valid posts with nutrition to see suggestions/i).should('exist');
    });
  });
});
