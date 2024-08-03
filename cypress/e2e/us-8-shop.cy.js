describe('Shop', () => {
  beforeEach(() => {
    // Login as user and navigate to shop
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/shop');
  });

  it('should display the "Shop" posts', () => {
    cy.contains(/My shop/i).should('be.visible');

    cy.get('[data-testid="user-interested-switch"]').should('exist');
    cy.get('[data-testid="user-interested-switch"]').should('not.be.checked');
    cy.get('[data-testid^="card-item-"]').should('have.length.greaterThan', 0);
  });

  it('should update the list when the "User Interested" button is clicked', () => {
    cy.contains(/My shop/i).should('be.visible');
    cy.get('[data-testid="user-interested-switch"]').should('exist');
    cy.get('[data-testid="user-interested-switch"]').click();
    cy.get('[data-testid="user-interested-switch"]').should('exist');
    cy.get('[data-testid^="card-item-"]').should('have.length.greaterThan', 0);
  });
});
