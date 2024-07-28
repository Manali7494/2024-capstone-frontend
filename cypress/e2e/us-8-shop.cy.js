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
    cy.get('h4').contains('Shop').should('have.css', 'text-align', 'center');

    cy.get('input[type="checkbox"]').parent().should('have.css', 'justify-content', 'flex-end');

    cy.get('input[type="checkbox"]').should('exist');

    cy.get('[data-testid^="card-item-"]').should('have.length.greaterThan', 0);
  });

  it('should update the list when the toggle button is clicked', () => {
    cy.get('input[type="checkbox"]').click();

    cy.get('[data-testid^="card-item-"]').should('have.length.greaterThan', 0);
  });
});
