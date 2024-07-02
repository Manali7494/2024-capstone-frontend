describe('Change Post', () => {
  beforeEach(() => {
    cy.visit('/login');
    const email = 'test@gmail.com';
    const password = '!Testpassword100';

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('form').submit();

    cy.contains('Login successful').should('exist');
    cy.visit('/posts/1/edit');
  });

  it('updates the fields', () => {
    const newName = 'Updated Test Name';
    const newDescription = 'Updated Test Description';
    const newPurchaseDate = '2025-01-01';
    const newExpiryDate = '2025-12-31';
    cy.get('[data-testid=name]').should('not.be.disabled');
    cy.get('[data-testid=name]').type(newName);
    cy.get('[data-testid=description]').type(newDescription);
    cy.get('[data-testid=purchaseDate]').type(newPurchaseDate);
    cy.get('[data-testid=expiryDate]').type(newExpiryDate);

    cy.get('button[type=submit]').click();

    cy.contains('Post updated successfully').should('exist');
  });
});
