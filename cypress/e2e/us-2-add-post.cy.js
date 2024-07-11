describe('Add Post', () => {
  beforeEach(() => {
    // Login as user
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    // Navigate to /new
    cy.visit('/new');
  });

  it('fills in the fields', () => {
    const name = 'Banana';
    const description = 'Box of bananas';
    const price = '20';
    const quantity = '10';
    const purchaseDate = '2024-01-01';
    const expiryDate = '2024-12-31';

    cy.get('[data-testid=name]').type(name);
    cy.get('[data-testid=description]').type(description);
    cy.get('[data-testid=price]').type(price);
    cy.get('[data-testid=quantity]').type(quantity);
    cy.get('[data-testid=purchase-date]').type(purchaseDate);
    cy.get('[data-testid=expiry-date]').type(expiryDate);

    cy.get('button[type=submit]').click();

    cy.contains('Post created successfully').should('exist');
  });
});
