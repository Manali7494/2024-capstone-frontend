describe('Search Post', () => {
  beforeEach(() => {
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts');
  });

  it('searches for existing post names', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);

    cy.get('#search').type('apple');
    cy.get('[data-testid="search-button"]').click();

    cy.get('[data-testid^="card-item"]').should('have.length', 1);
    cy.contains(/apple/i).should('be.visible');

    cy.get('[data-testid="clear-button"]').click();
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);
  });

  it('searches for non existing post names', () => {
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 1);

    cy.get('#search').type('orange');
    cy.get('[data-testid="search-button"]').click();

    cy.contains('No posts found.').should('be.visible');

    cy.get('[data-testid="clear-button"]').click();

    cy.contains(/apple/i).should('be.visible');
  });
});
