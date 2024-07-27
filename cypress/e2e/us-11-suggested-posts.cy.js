describe('Suggested Posts', () => {
  beforeEach(() => {
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';
    cy.contains('Login').should('exist');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts');
  });

  it('views suggested posts', () => {
    cy.get('#search').type('banana');
    cy.get('[data-testid="search-button"]').click();

    cy.contains('a', 'Detail').click();

    cy.contains('View Post').should('be.visible');

    cy.contains('button', /Interested/i).click();
    cy.get('[data-testid="interested"]').should('exist');

    cy.visit('/');
    cy.contains('Suggested Posts').should('exist');
    cy.get('[data-testid^="card-item"]').its('length').should('be.gt', 0);
  });
});
