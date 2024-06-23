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
    const newPrice = '25';
    const newQuantity = '15';
    const newPurchaseDate = '2025-01-01';
    const newExpiryDate = '2025-12-31';

    cy.get('[data-testid=name]').type('{selectall}{backspace}').type(newName);
    cy.get('[data-testid=description]').type('{selectall}{backspace}').type(newDescription);
    cy.get('[data-testid=price]').type('{selectall}{backspace}').type(newPrice);
    cy.get('[data-testid=quantity]').type('{selectall}{backspace}').type(newQuantity);
    cy.get('[data-testid=purchaseDate]').type(newPurchaseDate);
    cy.get('[data-testid=expiryDate]').type(newExpiryDate);

    cy.get('button[type=submit]').click();

    cy.contains('Post updated successfully').should('exist');
  });
});
